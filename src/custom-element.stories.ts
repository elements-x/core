import { customElement  } from "./custom-element";

customElement({
  debug: true,
  tagName: 'hello-custom-element',
  html: `
    <h1>{{hello}} {{world}}</h1>
    {{prop1}} {{prop2}}
  `,
  css: `hello-custom-element {
    color: red; 
    display: block;
  }`,
  attrs : {
    hello: 'Hello',
    world: 'Custom Element',
  },
  props: {
    prop1: undefined,
    prop2: undefined
  },
});

export default {
  title: 'customElement()/Getting Started'
};

export const Default = () => `
  <hello-custom-element></hello-custom-element>
`
export const attrs = () => `
  <hello-custom-element id="test" hello="Hi," world="My Element"></hello-custom-element>
  <button onclick="document.querySelector('#test').setAttribute('world', Math.random())">Change Attribute</button>
`;

export const props = () => `
  <hello-custom-element id="test"></hello-custom-element>
  <button onclick="document.querySelector('#test').prop1 = Math.random()">Change prop1</button>
`;