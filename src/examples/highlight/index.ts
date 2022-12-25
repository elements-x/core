import { customElement, waitForScriptLoad } from '../../lib';

function fixIndent(code) {
  code = code.replace(/^([ \t]*\n+){1,}|[\n\t ]+$/g, ''); // remove empty first/last line
  const firstIndent = (code.match(/^([ ]+)/) || [])[1];
  if (firstIndent) {
    const re = new RegExp(`^${firstIndent}`, 'gm');
    return code.replace(re, '');
  }
  return code;
}

export const js = /*javascript*/`
  return customElement({
    debug: true,
    await: () => waitForScriptLoad('hljs', [
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css',
    ]),
    css: 
      'x-highlight {display: block; font-family: monospace; white-space: pre;}' +
      'x-highlight pre.hljs {background: #F0F0F0; padding: 12px;}',
    html: '<pre language="{{language}}"></pre>',
    attrs: { language: 'javascript' },
    connectedCallback(args) {
      this.querySelector('pre').innerHTML = fixIndent(this._props.orgInnerHTML);
      window['hljs'].highlightElement(this.querySelector('pre'));
    }
  })
`;

export const HighlightEl = 
  new Function('customElement', 'waitForScriptLoad', 'fixIndent', js)(
    customElement, waitForScriptLoad, fixIndent);
