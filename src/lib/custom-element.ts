import { addCss, removeCss, setPropsFromAttributes, resetHTML } from './util';
import { ICustomElementOptions } from './types';

export function customElement(arg1: string | ICustomElementOptions, arg2?: ICustomElementOptions): any {
  const [tagName, options] = 
    typeof arg1 === 'string' ? [arg1, arg2] :
    typeof arg1 === 'object' ? [undefined, arg1] : [];

  function debug(...params) {
    options.debug && console.log(...params); 
  }

  class CustomElement extends HTMLElement {
    _props: {[key: string]: any} = {}; // properties including attribute values
    _timer: any; // timer not to render too many times
    _connected: boolean; // true after connectedCallback()

    // connectedCallback if options.html ... once
    // attributeChangedCallback       ... many times
    // set()                          ... many times
    async render() {
      return new Promise((resolve) => {
        const render = () => {
          try {
            if (options.html) {
              debug(this.tagName, 'rendering html', {html: options.html});
              resetHTML(this, options.html);
            }
            if (options.render) {
              options.render.bind(this)();
            }
            resolve(true);
          } catch (e) {
            this.innerHTML = e;
            throw e;
          }
        }

        clearTimeout(this._timer); // the same as debounce eems. Only the last one runs
        this._timer = setTimeout(render, 50);
      })
    }

    static get observedAttributes() {
      return Object.keys(options.attrs || {}); 
    }

    constructor() {
      super();
      debug(this.tagName, 'Running options.constructorCallback()');
      options.constructorCallback?.bind(this)();
    }

    async connectedCallback() {
      debug(this.tagName, 'Running connectedCallback()');

      this._props.orgInnerHTML = this.innerHTML;

      if (options.await) {
        debug(this.tagName, 'await options.await()');
        await options.await();
      }

      if (options.css) {
        debug(this.tagName, 'addCss(this, args.css)');
        addCss(this, options.css);
      }

      if (options.attrs) {
        debug('CustomElement.observedAttributes', CustomElement.observedAttributes);
        debug(this.tagName, 'setAttributes(this, args.attrs)');
        setPropsFromAttributes(this, options.attrs);
      }

      if (options.props) {
        debug(this.tagName, 'setting options.props');
        for (let key in options.props) {
          const prop = options.props[key]; // e.g., 123, or {get: Function, set: Function}
          if (prop && prop.get && prop.set) {
            Object.defineProperty(this, key, {
              get() { return prop.get.bind(this)(); },
              set(value) {
                if (prop.get.bind(this)() !== value) {
                  debug(this.tagName, 'running prop.set function', key, value);
                  prop.set.bind(this)(value);
                  if (options.propsChangedCallback && this._connected) {
                    debug(this.tagName, 'running options.propsChangedCallback');
                    options.propsChangedCallback.bind(this)(key, value);
                  }
                }
              }
            });
            this['_props'][key] = this._props[key] || prop.default;
          } else if (prop && prop.get) {
            Object.defineProperty(this, key, {
              get() { return prop.get.bind(this)(); },
            });
            try {
              this._props[key] = prop.get.bind(this)();
            } catch(e) {
              // it's possible to throw an error because HTML is not fully rendered
            }
          } else { 
            Object.defineProperty(this, key, {
              get() { return this._props[key]; },
              set(value) {
                if (this._props[key] !== value) {
                  debug(this.tagName, 'setting prop', key, value);
                  this._props[key] = value;
                  if (options.propsChangedCallback && this._connected) {
                    debug(this.tagName, 'running options.propsChangedCallback');
                    options.propsChangedCallback.bind(this)(key, value);
                  }
                }
              }
            });
            if (typeof prop === 'function') {
              try {
                this[key] = await prop.bind(this)(this);
              } catch(e) {
                // it's possible to throw an error because HTML is not fully rendered
              }
            } else {
              this[key] = prop;
            }
          }
        } 
      }

      await this.render();

      if (options.events) {
        for(let key in options.events) {
          const [eventName, selector] = key.split(':');
          const eventHandler = options.events[key];
          const eventSrc = selector ? this.querySelector(selector) : this;
          if (eventSrc) {
            eventSrc?.addEventListener(eventName, eventHandler.bind(this));
          }
        }
      }

      if (options.connectedCallback) {
        debug(this.tagName, 'executing connectedCallback function', this, options.connectedCallback);
        options.connectedCallback?.bind(this)();
      }

      this._connected = true;
      this.setAttribute('x-init', '');
    }

    disconnectedCallback() {
      debug(this.tagName, 'Running disconnectedCallback()');
      removeCss(this);
      options.disconnectedCallback?.bind(this)();
    }

    adoptedCallback() {
      debug(this.tagName, 'Running adoptedCallback()');
      options.adoptedCallback?.bind(this)();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const propName = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
      this._props[propName] = newValue;
      if (this._connected && (oldValue !== newValue)) {
        if (options.attributeChangedCallback) {
          debug(this.tagName, 'options.attributeChangedCallback', `${name} ${oldValue} -> ${newValue}`);
          options.attributeChangedCallback.bind(this)(name, oldValue, newValue);
        }
      }
    }
  };

  // css-only custom element. e.g. button styling
  if (['debug,css', 'css'].includes(Object.keys(options).join(','))) {
    debug(tagName, `addCss('${tagName}', options.css)`);
    addCss(tagName, <string>options.css, true);
  } else if (tagName && !customElements.get(tagName)) {
    // debug('customElements.define(', tagName, CustomElement, ')');
    customElements.define(tagName, CustomElement);
  }

  return CustomElement;
}