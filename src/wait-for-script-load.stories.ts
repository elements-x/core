export default { title: 'waitForScriptLoad()' };

export const Options = () => /*html*/ `
<h2> waitForScriptLoad(varName, scripts)</h2>

<p>
  It returns a Promise after
  <ul>
    <li> insert <code>&lt;script></code> tag or <code>&lt;link rel="stylesheet" ,..></code> to <code>document.head</code> from scripts.
    <li> and, <code>window[varName]</code> is resolved 
  </ul>
</p>

<p>
  This function is useful for <code>options.await</code>. 
  The following example is to append <code>highlight.min.js</code> and <code>default.min.css</code> to 
  <code>document.head</code> and wait for <code>window.hljs</code> to highlight the inner HTML.
</p>

<x-highlight>
  customElement('x-highlight', {
    debug: true,
    await: () => waitForScriptLoad('hljs', [
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css',
    ]),
    html: '<pre class="language-javascript"></pre>',
    connectedCallback(args) {
      this.querySelector('pre').innerHTML = fixIndent(this._props.orgInnerHTML);
      window['hljs'].highlightElement(this.querySelector('pre'));
    }
  })
</x-highlight>
`;
