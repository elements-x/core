import { customElement, waitForScriptLoad } from "../custom-element";

declare global {
  interface Window {
    Prism?: any;
  }
}

export default {
  title: 'customElement()/Prism'
};

customElement('x-prism', {
  debug: true,
  preCondition: () => waitForScriptLoad('Prism', [
    'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.jss',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css'
  ]),
  css: `x-prism {display: block; font-family: monospace; white-space: pre;}`,
  html: `<pre><code class="language-{{language}}"><slot></slot></code></pre>`,
  attrs: {
    language: 'javascript'
  },
  connectedCallback(args) {
    window.Prism.highlightElement(this.querySelector('pre code'));
  }
})

export const Prism = () => 
`<x-prism>`+
`function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}` +
`</x-prism>`;