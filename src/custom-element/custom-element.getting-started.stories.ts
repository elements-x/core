import { customElement  } from "./custom-element";

export default {
  title: 'customElement()/Getting Started'
};

customElement({
  debug: true,
  tagName: 'hello-custom-element',
  html: `
    <h1>{{hello}} {{world}}</h1>
    <br/> helloWorld: {{helloWorld}}
    <br/> prop1 : {{prop1}}
  `,
  css: `hello-custom-element {
    color: red; 
    display: block;
  }`,
  attrs : {
    hello: 'Hello',
    world: 'Custom Element',
    helloWorld: {type: 'boolean'}
  },
  props: {
    prop1: 0,
  },
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  },
  propsChangedCallback(key, value) {
    this.render();
  },
});

export const Default = () => `
  <hello-custom-element></hello-custom-element>
`
export const AttrsProps = () => `
  <hello-custom-element id="test" hello="Hi," world="My Element" hello-world></hello-custom-element>
  <button onclick="document.querySelector('#test').setAttribute('world', Math.random())">Change Attribute</button>
  <button onclick="document.querySelector('#test').prop1 = Math.random()">Change prop1</button>
`;
