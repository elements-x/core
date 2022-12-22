import { customElement, waitForScriptLoad } from '../src/custom-element';

customElement('x-prism', {
  debug: true,
  await: () => waitForScriptLoad('Prism', [
    'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.jss',
    'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css'
  ]),
  css: `x-prism {display: block; font-family: monospace; white-space: pre;}`,
  html: `<pre><code class="language-{{language}}"><slot></slot></code></pre>`,
  attrs: { language: 'javascript' },
  connectedCallback(args) {
    window['Prism'].highlightElement(this.querySelector('pre code'));
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
        'Elements',
        'API',
        '*'
      ]
    },
  },
}