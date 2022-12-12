type AttrValue = string | {
  type: 'number' | 'string' | 'boolean' | 'function', 
  value: number | boolean | string | Function
};

export interface ICustomElementProps {
  preCondition?: () => Promise<any>; // Initialize required condition e.g. JQuery library
  tagName?: string; // custom element tag name
  attrs?: { [key: string]: AttrValue}; // reactive attrs change 
  props?: { [key: string]: any }; // reactive props change
  html?: string;
  css?: string;
  constructor?: Function;
  connectedCallback?: Function; // element is added to the document
  disconnectedCallback?: Function; // element is removed to the document
  adoptedCallback?: Function; // element is transferred to a new document
  attributeChangedCallback?: Function; // (name: string, oldValue: string, newValue: string); // Invoked when attribute is changed
  render?: Function; // Invoked after each rendering
  debug?: boolean;
}

export interface ICustomElement extends HTMLElement {
  _props: { [key: string]: any };
  _render(args: any);
  adoptedCallback();
  attributeChangedCallback(name: string, oldValue: string, newValue: string);
  connectedCallback();
  disconnectedCallback();
}