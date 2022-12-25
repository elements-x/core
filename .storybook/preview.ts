import { customElement } from '../src/lib';
import { HighlightEl } from '../src/examples/highlight';
import { TypingEffectEl } from '../src/examples/typing-effect';
import { tableCss, buttonCss } from '../src/examples/css-only';

!customElements.get('x-highlight') && customElements.define('x-highlight', HighlightEl);
!customElements.get('x-typing-effect') && customElements.define('x-typing-effect', TypingEffectEl);

customElement('table', {css: tableCss})
customElement('button', {css: buttonCss})

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
        'API',
        'Examples',
        '*'
      ]
    },
  },
}