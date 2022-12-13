import { addCss, removeCss, setPropsFromAttributes, renderHTML } from './util';
import { ICustomElement, ICustomElementProps } from './types';

export { waitForScriptLoad } from './util';

export function customElement(args: ICustomElementProps): any {
  function debug(...params) {
    args.debug && console.log(...params); 
  }

  class CustomElement extends HTMLElement implements ICustomElement {
    _props: {[key: string]: any} = {}; // properties including attribute values
    _timer: any; // timer not to render too many times
    _connected: boolean; // true after connectedCallback()

    // connectedCallback if args.html ... once       .. renderHTML / args.render()
    // attributeChangedCallback       ... many times .. renderHTML
    // set()                          ... many times .. renderHTML
    async render(args, runArgsRender?) {
      const render = () => {
        try {
          if (args.html) {
            debug(this.tagName, 'rendering html', {html: args.html});
            renderHTML(this, args.html);
          }
          /**
           * when args.render function sets property of this object
           * e.g. this.myProp = 'blah', and property set also calls this.render()
           * which makes loop condition. args.render() -> set() -> render() -> args.render()
           * thus, check if render() is called from set(), do not run args.render()
           */
          if (args.render && runArgsRender) {
            debug(this.tagName, 'executing render function', args.render);
            args.render.bind(this)(args);
          }
        } catch (e) {
          throw e;
          this.innerHTML = e;
        }
      }

      clearTimeout(this._timer); // the same as debounce 10ms. Only the last one runs
      this._timer = setTimeout(render, 50);
    }

    static get observedAttributes() {
      return Object.keys(args.attrs || {}); 
    }

    constructor() {
      super();
      debug(this.tagName, 'Running constructor()');
      args.constructor?.bind(this)();
    }

    async connectedCallback() {
      debug(this.tagName, 'Running connectedCallback()');

      this._props.orgInnerHTML = this.innerHTML;

      if (args.preCondition) {
        debug(this.tagName, 'await args.preCondition()');
        await args.preCondition();
      }

      if (args.css) {
        debug(this.tagName, 'addCss(this, args.css)');
        addCss(this, args.css);
      }

      if (args.attrs) {
        debug('CustomElement.observedAttributes', CustomElement.observedAttributes);
        debug(this.tagName, 'setAttributes(this, args.attrs)');
        setPropsFromAttributes(this, args.attrs);
      }

      if (args.props) {
        debug(this.tagName, 'setting props');
        for (let key in args.props) {
          const prop = args.props[key]; // e.g., 123, or {get: Function, set: Function}
          Object.defineProperty(this, key, {
            get() {
              if (prop?.get) {
                // todo, return get function();
              } else {
                return this._props[key];
              }
            },
            set(value) {
              debug(this.tagName, 'setting prop', key, value);
              if (prop?.set) {
                // todo, set from funcion return
              } else {
                this._props[key] = value;
                this.render(args);            }
              }
          });
          this[key] = args.props[key];
        } 
      }

      if (args.html) {
        this.render(args, true);
      }

      args.connectedCallback?.bind(this)();
      this._connected = true;
    }

    disconnectedCallback() {
      debug(this.tagName, 'Running disconnectedCallback()');
      removeCss(this);
      args.disconnectedCallback?.bind(this)();
    }

    adoptedCallback() {
      debug(this.tagName, 'Running adoptedCallback()');
      args.adoptedCallback?.bind(this)();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this._props[name] = newValue;
      if (this._connected && (oldValue !== newValue)) {
        debug(this.tagName, 'attributeChangedCallback', `${name} ${oldValue} -> ${newValue}`);
        args.attributeChangedCallback?.bind(this)(name, oldValue, newValue);
        this.render(args);
      }
    }
  };

  if (Object.keys(args).join(',') === 'tagName,css') { // css only. e.g. button styling
    debug(args.tagName, `addCss('${args.tagName}', args.css)`);
    addCss(<string>args.tagName, <string>args.css);
  } else if (args.tagName && !customElements.get(args.tagName)) {
    debug('customElements.define(', args.tagName, CustomElement, ')');
    customElements.define(args.tagName, CustomElement);
  }

  return CustomElement;
}