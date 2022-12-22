import { customElement } from '../custom-element';

customElement({
  debug: true,
  tagName: 'hello-attrs-props',
  html: `
    <h1>{{hello}} {{helloWorld}} {{world}}</h1>
    <br/> prop1 : {{prop1}}
    <br/> prop2 : {{prop2}}
  `,
  css: `
  hello-attrs-props {
    color: red; 
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 3px #CCC;
    padding: 12px;
  }`,
  attrs : {
    hello: 'Hello',
    world: 'World',
    helloWorld: {type: Boolean, default: false}
  },
  props: {
    prop1: 0,
    prop2: 0
  },
  attributeChangedCallback(name, oldValue, newValue) {
    this._props.helloWorld = !this._props.helloWorld; 
    this.setAttribute('hello-world', !this._props.helloWorld);
    this.render();
  },
  propsChangedCallback(key, value) {
    this.prop2 = value;
    this.render();
  },
});

export default { title: 'API' };

export const Overview = () => `
<x-prism>
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
</x-prism>`;

//@ts-ignore
window.changeAttr = id => document.querySelector(id).setAttribute('world', `World ${new Date().getTime()}`);
//@ts-ignore
window.changeProp = id => document.querySelector(id).prop1 += 1


export const preCondition = () => `
preCondition
`;

export const tagName = () => `
tagName
`;

export const attrs = () => `
  <hello-attrs-props id="test1" hello="Hi," world="My Element" hello-world></hello-attrs-props>
  <br/><br/>
  <button onclick="changeAttr('#test1')">Change Attribute</button>
`;

export const props = () => `
  <hello-attrs-props id="test2"></hello-attrs-props>
  <br/><br/>
  <button onclick="changeProp('#test2')">Change prop</button>
`;

export const html = () => `
html
`;

export const css = () => `
css
`;
``

export const events = () => `
events
`;

export const constructor = () => `
constructor()
`;

export const connectedCallback = () => `
connectedCallback()
`;

export const disconnectedCallback = () => `
disconnectedCallback()
`;

export const adoptedCallback = () => `
adoptedCallback()
`;

export const attributeChangedCallback = () => `
attributeChangedCallback()
`;

export const propsChangedCallback = () => `
propsChangedCallback()
`;

export const render = () => `
render
`;

export const degug = () => `
debug
`;