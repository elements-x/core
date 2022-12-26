import { customElement } from "@lib";

export const htmlHTML = /*html*/ `
<h2 class="fs-4">options.html</h2>

<p>
  Optional, when provided, it compiles your HTML using Mustache. attrs and props are passed as context to compile new HTML.
</p>

<x-highlight>
customElement('my-element', {
  html: '{{hello}} {{my}} {{world}}',
  attrs : { hello: 'Hi,', world: 'Custom Element' }
  props : { my: 'My' }
})
</x-highlight>
<p>
From the above example, the given HTML is compiled like the following.
</p>

<x-highlight>
const newHTML = Mustache.render(
  '{{hello}} {{my}} {{world}}', 
  {hello: 'Hi,', world: 'Custom Element', my: 'My'}
);
// Output: 'Hi My World'
</x-highlight>

<p>
For more info. about Mustache please visit <a href="http://mustache.github.io/mustache.5.html">Mustache man page</a>.
`;

