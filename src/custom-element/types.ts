type AttrValue = string | {
  type: typeof Number | typeof Boolean | typeof String | typeof Date | typeof Function, 
  default?: number | boolean | string | Date | Function
};

export interface ICustomElementProps {
  await?: () => Promise<any>; // Initialize required condition e.g. JQuery library
  tagName?: string; // custom element tag name
  attrs?: { [key: string]: AttrValue}; // reactive attrs change 
  props?: { [key: string]: any }; // reactive props change
  html?: string;
  css?: string;
  events?: { [key: string]: Function};
  constructorCallback?: Function;
  connectedCallback?: Function; // element is added to the document
  disconnectedCallback?: Function; // element is removed to the document
  adoptedCallback?: Function; // element is transferred to a new document
  attributeChangedCallback?: Function; // (name: string, oldValue: string, newValue: string); // Invoked when attribute is changed
  propsChangedCallback?: Function;
  render?: Function;
  debug?: boolean;
}