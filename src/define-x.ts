import { addSCSS, removeCss, setHTML } from './util';

interface IDefineX {
  tagName: string; // custom element tag name
  attrs?: { [key: string]: string }; // reactive attrs change 
  props?: { [key: string]: any }; // reactive props change
  html?: string;
  scss?: string;
  constructor?: () => void; // element is created
  connectedCallback?: () => void; // element is added to the document
  disconnectedCallback?: () => void; // element is removed to the document
  adoptedCallback?: () => void; // element is transferred to a new document
  attributeChangedCallback?: (name: string, oldValue: string, newValue: string) => void; // Invoked when attribute is changed
  render?: () => void; // Invoked after each rendering
}

export function defineX(args: IDefineX): any {
  const CustomElement = class extends HTMLElement {
    addedScss: boolean = false;

    static get observedAttributes() { 
      return Object.keys(args.attrs || {}); 
    }
    orgInnerHTML: string;

    constructor() {
      super();
      args.constructor?.bind(this)();
    }

    connectedCallback() {
      this.orgInnerHTML = this.innerHTML;
      args.connectedCallback?.bind(this)();
      this.render();
    }

    disconnectedCallback() {
      removeCss(this);
      args.disconnectedCallback?.bind(this)();
    }

    adoptedCallback() {
      args.adoptedCallback?.bind(this)();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      args.attributeChangedCallback?.bind(this)(name, oldValue, newValue);
      console.log('attributeChangedCallback', {name, oldValue, newValue});
      this.render();
    }

    private render() {
      if (!this.addedScss && args.scss) {
        addSCSS(this, args.scss);
        this.addedScss = true;
      }
      args.html && setHTML(this, args.html, this.orgInnerHTML);
      args.render && args.render.bind(this)();
    }
  }

  // reactive props by using getters and setters
  for (let key in args.props) {
    Object.defineProperty(CustomElement, key, {
      get() {
        console.log('getter called', key);
        return this.props[key];
      },
      set(value) {
        console.log('setter called', key, value);
        this.props[key] = value;
      }
    });
  }

  if (!customElements.get(args.tagName)) {
    customElements.define(args.tagName, CustomElement);
  }

  return CustomElement;
}