import { customElement, waitForScriptLoad } from '../src/custom-element';

function fixIndent(code) {
  code = code.replace(/^([ \t]*\n+){1,}|[\n\t ]+$/g, ''); // remove empty first/last line
  const firstIndent = (code.match(/^([ ]+)/) || [])[1];
  if (firstIndent) {
    const re = new RegExp(`^${firstIndent}`, 'gm');
    return code.replace(re, '');
  }
  return code;
}

customElement('x-highlight', {
  debug: true,
  await: () => waitForScriptLoad('hljs', [
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css',
  ]),
  css: /*css*/ `x-highlight {}`,
  html: /*html*/ `<pre class="language-{{language}}"></pre>`,
  attrs: { language: 'javascript' },
  connectedCallback(args) {
    this.querySelector('pre').innerHTML = fixIndent(this._props.orgInnerHTML);
    window['hljs'].highlightElement(this.querySelector('pre'));
  }
})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [ /* https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy */
        'Introduction', 
        'Getting Started',
        'Features',
        'customElement()',
        'waitForScriptLoad()',
        'Example',
        'CSS Collections'
      ]
    },
  },
}