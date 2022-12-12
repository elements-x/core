import { addCss, removeCss, setAttributes, setProps, renderHTML } from './util';
import { ICustomElement, ICustomElementProps } from './types';

export function customElement(args: ICustomElementProps): any {
  function debug(...params) {
    args.debug && console.log(...params); 
  }

  class CustomElement extends HTMLElement implements ICustomElement {
    _props: {[key: string]: any} = {}; // properties including attribute values

    async _render(args) {
      if (args.preCondition) {
        debug(this.tagName, 'await args.preCondition()');
        await args.preCondition();
      }

      try {
        if (args.html) {
          debug(this.tagName, 'rendering html', {html: args.html});
          renderHTML(this, args.html);
        }
        if (args.render) {
          debug(this.tagName, 'executing render function', args.render);
          args.render.bind(this)(args);
        }
      } catch (e) {
        this.innerHTML = e;
      }
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
        setAttributes(this, args.attrs);
      }

      if (args.props) {
        debug(this.tagName, 'setProps(this, args.props');
        setProps(this, args.props);
      }

      if (args.html) {
        this._render(args);
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
      if (oldValue !== null) { // not for initial, e.g., null -> xxx
        debug(this.tagName, 'attributeChangedCallback 2', name, oldValue, newValue);
        this._render(args);
        args.attributeChangedCallback?.bind(this)(name, oldValue, newValue);
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