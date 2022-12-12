import { customElement  } from "./custom-element";

const klass = customElement({
  preCondition: () => {
    let waited = 0;
    return new Promise(function (resolve, reject) {
      function waitForCondition(){
        if (window['JsBarcode']) resolve(true);
        else if (waited > 3000)  reject();
        else {
          if (!document.querySelector('script#jsbarcode')) {
            const el = document.createElement('script');
            el.setAttribute('id', 'jsbarcode');
            el.setAttribute('src', '//unpkg.com/jsbarcode/dist/JsBarcode.all.min.js');
            document.head.appendChild(el);
          }
          setTimeout(waitForCondition, 300);
          waited += 300;
        }
      }
      waitForCondition();
    });
  },
  debug: true,
  tagName: 'hello-custom-element',
  html: `
    <h1>{{hello}} {{world}}</h1>
    attributes:
    <ul>
      <li>number: {{number}}</li>
      <li>boolean: {{boolean}}</li>
    </ul>
  `,
  attrs: {
    hello: 'Hello',
    world: 'Custom Element',
    number: { type: 'number', value : 2},
    boolean: { type: 'boolean', value: true}
  },
  props : {
    a: 1,
    b: 2
  },
  css: `
    h1 {
      color: red;
      display: block;
    }`
});

export default {
  title: 'customElement()'
};

export const Story1 = () => `
  <hello-custom-element></hello-custom-element>
  <hello-custom-element></hello-custom-element>
`