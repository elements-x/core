import { customElement  } from "./custom-element";

const klass = customElement({
  debug: true,
  tagName: 'hello-custom-element',
  html: `<h1>Hello Custom Element</h1>`,
  attrs: {
    foo: '1',
    bar: { type: 'number', value : 2},
    baz: { type: 'boolean', value: true}
  },
  props : {
    a: 1,
    b: 2
  },
  css: `
    h1 {
      color: red;
    }`
});

export default {
  title: 'customElement()'
};

export const Story1 = () => `
  <hello-custom-element></hello-custom-element>
`