export const cssHTML = /*html*/ `
  <h2 class="fs-4">options.css</h2>

  <p>
    Optional, when provided and your custom element is connected
    it adds &ltstyle id="<code>tagName</code>"> only once as the same as a popular framework. 
  </p>

  <x-highlight>
  customElement('my-element', {
    css: 'my-element .some-class { font-weight: bold; }'
  });
  </x-highlight>

  When run the above code, your <code>&lt;head></code> will append styling like this,
  and it will be removed when disconnected.

  <x-highlight language="html">
  &lt;html>
    &lt;head>
      ...
      &lt;style id="my-element">
        my-element .some-class { font-weight: bold; } 
      &lt;/style>
    &lt;/head>
    &lt;body>
      ...
    &lt;/body>
  &lt;/html>
  </x-highlight>

  <p>
  To avoid css leaking, unless it's intentional, please provide a specific css scope. 
  </p>
  <x-highlight language="css">
    /* DON'T do this, which applies to all element */
    .some-class {
      font-weight: bold;
    }

    /* Do this instead, which applies only to my-element */
    my-element .some-class {
      font-weight: bold;
    }
  </x-highlight>
`;
