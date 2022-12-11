import { setStyle, setAttributes, removeCss, renderHTML } from './util';

type AttrValue = string | {
  type: 'number' | 'string' | 'boolean' | 'function', 
  value: number | boolean | string | Function
};

type ICustomElement = {
  tagName?: string; // custom element tag name
  attrs?: { [key: string]: AttrValue}; // reactive attrs change 
  props?: { [key: string]: any }; // reactive props change
  html?: string;
  css?: string;
  constructor? : Function;
  connectedCallback?: Function; // element is added to the document
  disconnectedCallback?: Function; // element is removed to the document
  adoptedCallback?: Function; // element is transferred to a new document
  attributeChangedCallback?: Function; // (name: string, oldValue: string, newValue: string); // Invoked when attribute is changed
  render?: Function; // Invoked after each rendering
  debug?: boolean;
}


export function customElement(args: ICustomElement): any {
  function debug(...params) {
    args.debug && console.log(...params); 
  }

  function render(args) {
    try {
      if (args.html) {
        debug(this, 'rendering html', {html: args.html});
        renderHTML(this, args.html, this.props.orgInnerHTML);
      }
      if (args.render) {
        debug(this, 'executing render function', args.render);
        args.render.bind(this)(args);
      }
    } catch (e) {
      this.innerHTML = e;
    }
  }

  const CustomElement = class extends HTMLElement {
    private props: {[key: string]: any} = {};

    static get observedAttributes() {
      return Object.keys(args.attrs || {}); 
    }

    constructor() {
      super();
      args.constructor?.bind(this)();
    }

    connectedCallback() {
      debug(this, 'Running connectedCallback');

      this.props.orgInnerHTML = this.innerHTML;
      if (args.css) {
        debug(this, 'setStyle(this, args.css)');
        setStyle(this, args.css);
      }
      if (args.attrs) {
        debug(this, 'setAttributes(this, args.attrs)');
        setAttributes(this, args.attrs);
      }
      if (args.html) {
        render.bind(this)(args);
      }

      args.connectedCallback?.bind(this)();
    }

    disconnectedCallback() {
      debug(this, 'Running disconnectedCallback');
      removeCss(this);
      args.disconnectedCallback?.bind(this)();
    }

    adoptedCallback() {
      debug(this, 'Running adoptedCallback');
      args.adoptedCallback?.bind(this)();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== null) { // not for initial, e.g., null -> xxx
        debug(this, 'attributeChangedCallback 2', name, oldValue, newValue);
        render.bind(this)(args);
        args.attributeChangedCallback?.bind(this)(name, oldValue, newValue);
      }
    }
  }

  if (Object.keys(args).join(',') === 'tagName,css') { // css only. e.g. button styling
    debug(args.tagName, `setStyle('${args.tagName}', args.css)`);
    setStyle(<string>args.tagName, <string>args.css);
  } else {
    debug('CustomElement.observedAttributes', CustomElement.observedAttributes);

    // reactive props by using getters and setters
    console.log('....................', args.props)
    for (let key in args.props) {
      debug('setting getter setters of ', key);
      Object.defineProperty(CustomElement, key, {
        get() {
          console.log('getter called', key);
          return this.props[key];
        },
        set(value) {
          console.log('setter called', key, value);
          this.props[key] = value;
          render.bind(this)(args);
        }
      });
    } 

    if (args.tagName && !customElements.get(args.tagName)) {
      debug('customElements.define(', args.tagName, CustomElement, ')');
      customElements.define(args.tagName, CustomElement);
    }
  }

  return CustomElement;
}