import { customElement } from "..";

export default {
  title: 'Getting Started'
};

customElement({
  tagName: 'hello-custom-element',
  html: `<h1>{{hello}} {{world}}</h1>`,
  css: `
  hello-custom-element {
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 3px #CCC;
    padding: 12px;
  }`,
  attrs : { hello: 'Hello', world: 'World' }
});

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
    helloWorld: {type: Boolean, default: true}
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

export const Default = () => `
  <hello-custom-element></hello-custom-element>
  <pre>
customElement({
  tagName: 'hello-custom-element',
  html: \`&lt;h1>{{hello}} {{world}}&lt;/h1>\`,
  css: \`hello-custom-element {
    color: red; 
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 3px #CCC;
    padding: 12px;
  }\`,
  attrs : { hello: 'Hello', world: 'World' }
});
  </pre>
`;

//@ts-ignore
window.changeAttr = 
  _ => document.querySelector('#test').setAttribute('world', `World ${new Date().getTime()}`);

//@ts-ignore
window.changeProp = _ => document.querySelector('#test').prop1 += 1

export const AttrsProps = () => `
  <hello-attrs-props id="test" hello="Hi," world="My Element" hello-world></hello-attrs-props>
  <br/><br/>
  <button onclick="changeAttr()">Change Attribute</button>
  <button onclick="changeProp()">Change prop</button>
`;
