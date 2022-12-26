import { customElement } from "@lib";

customElement('my-await-el', {
  await: function() {
    return new Promise((resolve) => {
      setTimeout(_ => resolve(true), 3000);
    });
  },
  html: 'Waited for 3 seconds'
})

export const awaitHTML = /*html*/ `
<h2 class="fs-4">options.await()</h2>

<p>
Optional, when provided, <code>connectedCallback()</code> will wait until it is resolved.
</p>

<my-await-el class="d-block border border-info p-2"></my-await-el>
<x-highlight>
customElement('my-await-el', {
  await: function() {
    return new Promise((resolve) => {
      setTimeout(_ => resolve(true), 3000);
    });
  },
  html: 'This is initialized after 3 seconds'
})

&lt;my-await-el>&lt;/my-await-el>
</x-highlight>


<p>
It also provides <code>waitForScriptLoad()</code> function, which returns a Promise.
This is useful when your custom element requires certain libaries and/or css.
</p>

<p>
Let's say you want to create a custom element to highlight syntax with <a href="https://highlightjs.org/">HighlightJs</a>,
which requires script to be initialized to <code>window.hljs</code> and styles to be loaded.
</p>

<p>
By providing these two scripts and <code>hljs</code> into <code>waitForScriptLoad()</code>, you are ready to use HighlightJs library.
</p>
<p>
The hightlighted code on this page is done by the following code.
</p>

<x-highlight>
customElement('my-highlight', {
  await: () => waitForScriptLoad('hljs', [
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/a11y-light.min.css',
  ]),
  html: '<pre class="language-{{language}}"></pre>',
  attrs: { language: 'javascript' },
  connectedCallback(args) {
    this.querySelector('pre').innerHTML = this._props.orgInnerHTML;
    window['hljs'].highlightElement(this.querySelector('pre'));
  }
});
</x-highlight>`;


