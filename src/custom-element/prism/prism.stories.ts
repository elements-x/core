import { customElement, waitForScriptLoad } from "../custom-element";

export default {
  title: 'customElement()/HighlightJS'
};

customElement('x-highlight', {
  debug: true,
  await: () => waitForScriptLoad('hljs', [
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css',
  ]),
  css: `x-highlight {display: block; font-family: monospace; white-space: pre;}`,
  html: `<pre language="{{language}}"></pre>`,
  attrs: { language: 'javascript' },
  connectedCallback(args) {
    this.querySelector('pre').innerHTML = this._props.orgInnerHTML.trim();
    window['hljs'].highlightElement(this.querySelector('pre'));
  }
})

export const HighlightJS = () => 
`<x-highlight>`+
`function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}` +
`</x-highlight>`;