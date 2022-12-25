import { customElement } from '../';

customElement('hello-custom-element', {
  html: /*html*/ `<h1>{{hello}} {{world}}</h1>`,
  css: /*css*/ `hello-custom-element { color: red; }`,
  attrs : { hello: 'Hello', world: 'Custom Element' }
})


export const Overview = ({}) => /*html*/ `
  <p>
    <code>customElement()</code> returns a HTMLElement class and defines a custom element.
    You can think of it as a HTML tag, which reacts to attribute change, property change, and fires events. 
  </p>

  Here's a sample:
  <x-highlight>
  import { customElement } from '@elements-x/core';

  customElement('hello-custom-element', {
    html: \`&lt;h1>{{hello}} {{world}}&lt;/h1>\`,
    css: \`hello-custom-element { color: red; }\`,
    attrs : { hello: 'Hello', world: 'Custom Element' }
  });
  </x-highlight>

  <hello-custom-element hello="Hi," world="World"></hello-custom-element>
`;