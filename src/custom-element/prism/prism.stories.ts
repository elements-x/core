import { customElement, waitForScriptLoad } from "../custom-element";

declare global {
  interface Window {
    Prism?: any;
  }
}

export default {
  title: 'customElement()/prism'
};

customElement({
  debug: true,
  tagName: 'x-prism',
  preCondition: () => waitForScriptLoad('Prism', [
    'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.jss',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css'
  ]),
  css: `x-prism {display: block; font-family: monospace; white-space: pre;}`,
  html: `<pre class="language-{{language}}"><code><slot></slot></code></pre>`,
  attrs: {
    language: 'javascript'
  },
  connectedCallback(args) {
    window.Prism.highlightElement(this.querySelector('pre'));
  }
})

export const AceEditor = () => 
`<x-prism>`+
`function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}` +
`</x-prism>`;