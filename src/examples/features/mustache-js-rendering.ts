export const MustacheJSRendering = () => /*html*/ `
  It compiles your HTML using <a href="https://github.com/janl/mustache.js/#templates">Mustache</a>.
  <code>attrs</code> and <code>props</code> are passed as context to compile new HTML.
  <x-highlight>
  customElement('my-element', {
    html: '{{hello}} {{my}} {{world}}',
    attrs : { hello: 'Hi,', world: 'Custom Element' }
    props : { my: 'My' }
  })
  </x-highlight>

  From the above example, the given HTML is compiled like the following.
  <x-highlight>
  const newHTML = Mustache.render(
    '{{hello}} {{my}} {{world}}', 
    {hello: 'Hi,', world: 'Custom Element', my: 'My'}
  );
  // Output: 'Hi My World'
  </x-highlight>
`;
