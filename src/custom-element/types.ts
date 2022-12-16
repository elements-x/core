type AttrValue = string | {
  type: any, 
  value?: number | boolean | string | Date | Function
};

export interface ICustomElementProps {
  preCondition?: () => Promise<any>; // Initialize required condition e.g. JQuery library
  tagName?: string; // custom element tag name
  attrs?: { [key: string]: AttrValue}; // reactive attrs change 
  props?: { [key: string]: any }; // reactive props change
  html?: string;
  css?: string;
  events?: { [key: string]: Function};
  constructor?: Function;
  connectedCallback?: Function; // element is added to the document
  disconnectedCallback?: Function; // element is removed to the document
  adoptedCallback?: Function; // element is transferred to a new document
  attributeChangedCallback?: Function; // (name: string, oldValue: string, newValue: string); // Invoked when attribute is changed
  propsChangedCallback?: Function;
  render?: Function;
  debug?: boolean;
}

export interface ICustomElement extends HTMLElement {
  _props: { [key: string]: number | boolean | string | Function };
  render(runUserRenderFunc?: boolean);
  // default is false, 
  // if your render() function sets any prop, only call `this.render()` to prevent loop in propsChangedCallback() 
  // with this.render(true) propsChangedCallback() -> render() -> user render() sets prop 
  //                               ^                                       |
  //                               +---------------------------------------+
  // with this.render() propsChangedCallback() -> render() 
  //
  // if your render() function sets any attribute, only call `this.render()` to prevent loop in attributeChangedCallback() 
  // with this.render(true) attributeChangedCallback() -> render() -> user render() sets attribute
  //                               ^                                       |
  //                               +---------------------------------------+
  // with this.render() propsChangedCallback() -> render()
  adoptedCallback();
  attributeChangedCallback(name: string, oldValue: string, newValue: string);
  connectedCallback();
  disconnectedCallback();
}