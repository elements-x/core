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

    async _render(args, runRenderCallback=false) {
      if (args.preCondition) {
        debug(this.tagName, 'await args.preCondition()');
        await args.preCondition();
      }

      const render = () => {
        try {
          if (args.html) {
            debug(this.tagName, 'rendering html', {html: args.html});
            renderHTML(this, args.html);
          }
          if (args.render && runRenderCallback) {
            debug(this.tagName, 'executing render function', args.render);
            args.render.bind(this)(args);
          }
        } catch (e) {
          this.innerHTML = e;
        }
      }

      clearTimeout(this._timer); // the same as debounce 10ms. Only the last one runs
      this._timer = setTimeout(render, 10);
    }

    static get observedAttributes() {
      return Object.keys(args.attrs || {}); 
    }

    constructor() {
      super();
      debug(this.tagName, 'Running constructor()');
      args.constructor?.bind(this)();
    }

    connectedCallback() {
      debug(this.tagName, 'Running connectedCallback()');

      this._props.orgInnerHTML = this.innerHTML;

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
          Object.defineProperty(this, key, {
            get() {
              return this._props[key];
            },
            set(value) {
              debug(this.tagName, 'setting prop', key, value);
              this._props[key] = value;
              this._render(args, false);
            }
          });
          this[key] = args.props[key];
        } 
      }

      if (args.html) {
        this._render(args, true);
      }

      args.connectedCallback?.bind(this)();
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
      this._render(args, false);
      debug(this.tagName, 'attributeChangedCallback', `${name} ${oldValue} -> ${newValue}`);
      args.attributeChangedCallback?.bind(this)(name, oldValue, newValue);
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