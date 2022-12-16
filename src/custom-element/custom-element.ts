import { addCss, removeCss, setPropsFromAttributes, resetHTML } from './util';
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

    // connectedCallback if args.html ... once
    // attributeChangedCallback       ... many times
    // set()                          ... many times
    async render(runUserRenderFunc = false) {
      return new Promise((resolve) => {
        const render = () => {
          try {
            if (args.html) {
              debug(this.tagName, 'rendering html', {html: args.html});
              resetHTML(this, args.html);
            }
            if (args.render && runUserRenderFunc) {
              args.render.bind(this)(args);
            }
            resolve(true);
          } catch (e) {
            this.innerHTML = e;
            throw e;
          }
        }

        clearTimeout(this._timer); // the same as debounce 10ms. Only the last one runs
        this._timer = setTimeout(render, 50);
      })
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
        debug(this.tagName, 'setting props ------------------------------------------');
        for (let key in args.props) {
          const prop = args.props[key]; // e.g., 123, or {get: Function, set: Function}
          if (prop && prop.get && prop.set) {
            Object.defineProperty(this, key, {
              get() { return prop.get.bind(this)(); },
              set(value) {
                debug(this.tagName, 'setting prop set function', key, value, prop.set);
                prop.set.bind(this)(value);
                if (args.propsChangedCallback && this._connected) {
                  debug(this.tagName, 'running args.propsChangedCallback');
                  args.propsChangedCallback.bind(this)(key, value);
                }
              }
            });
          } else if (prop && prop.get) {
            Object.defineProperty(this, key, {
              get() { return prop.get.bind(this)(); },
            });
          } else { 
            Object.defineProperty(this, key, {
              get() { return this._props[key]; },
              set(value) {
                debug(this.tagName, 'setting prop', key, value, {key, value, connected: this._connected});
                this._props[key] = value;
                if (args.propsChangedCallback && this._connected) {
                  debug(this.tagName, 'running args.propsChangedCallback');
                  args.propsChangedCallback.bind(this)(key, value);
                }
              }
            });
            this[key] = (typeof prop === 'function') ? await prop.bind(this)(this) : prop;
          }
        } 
      }

      await this.render(true);

      if (args.events) {
        for(let key in args.events) {
          const [eventName, selector] = key.split(':');
          const eventHandler = args.events[key];
          const eventSrc = selector ? this.querySelector(selector) : this;
          if (eventSrc) {
            eventSrc?.addEventListener(eventName, eventHandler.bind(this));
          }
        }
      }

      if (args.connectedCallback) {
        debug(this.tagName, 'executing connectedCallback function', this, args.connectedCallback);
        args.connectedCallback?.bind(this)();
      }

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
      const propName = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
      this._props[propName] = newValue;
      if (this._connected && (oldValue !== newValue)) {
        if (args.attributeChangedCallback) {
          debug(this.tagName, 'attributeChangedCallback', `${name} ${oldValue} -> ${newValue}`);
          args.attributeChangedCallback.bind(this)(name, oldValue, newValue);
        }
      }
    }
  };

  if (['debug,tagName,css', 'tagName,css'].includes(Object.keys(args).join(','))) {
    // css only. e.g. button styling
    debug(args.tagName, `addCss('${args.tagName}', args.css)`);
    addCss(<string>args.tagName, <string>args.css);
  } else if (args.tagName && !customElements.get(args.tagName)) {
    debug('customElements.define(', args.tagName, CustomElement, ')');
    customElements.define(args.tagName, CustomElement);
  }

  return CustomElement;
}