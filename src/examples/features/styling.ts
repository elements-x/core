export const Styling = () => /*html*/ `
  <p>
  If you provide <code>css</code> property, when your custom element is connected
  it adds &ltstyle id="<code>tagName</code>"> only once as the same as a popular framework. 
  </p>

  <x-highlight>
  customElement('my-element', {
    css: \x60my-element .some-class {
      font-weight: bold;
    }\x60
  })
  </x-highlight>

  When run the above code, your <code>&lt;head></code> will append styling like this,
  and it will be removed when disconnected.

  <x-highlight language="html">
  &lt;html>
    &lt;head>
      ...
      &lt;style id="my-element">
        my-element .some-class {
          font-weight: bold;
        } 
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
    /* DON'T do this */
    .some-class {
      font-weight: bold;
    }

    /* Do this instead */
    my-element .some-class {
      font-weight: bold;
    }
  </x-highlight>

  <p>
  As you see, it does NOT use Shadow DOM. why?
  </p>

  <p>
    1. 
    <strong>Nodes inside Shadow DOM aren't accessible via things like 
    <code>document.querySelector()</code> or <code>document.getElementById()</code>
    </strong>.
    This is good to prevent unwanted changes from other scripts. However, it's not good
    when you need to run some automated QA tests. It makes scripting so difficult.
  </p>
  <p>
    2. <strong>
    All CSS in Shadow DOM is scoped to only inside of it. 
    </strong>
    The advantage of it is styles don't bleed out to light DOM.
    The disadvantage is it's hard to apply global styles such as themes.
    If you are creating a web page using traditional CSS frameworks like Bootstrap, 
    Foundation, Pure, Material Design, etc. Shadow DOM just won't work  because the 
    styling will not penetrate into the components.
  </p>
  <p>
    3. <strong>Shadow DOM has some accessibility issues without extra coding</strong> when ARIA attributes like <code>aria-labelledby</code>
    and <code>aria-describedby</code> are used inside Shadow DOM because values of those cannot
    reach outside of its shadow DOM to reference the element from the other component.
    Not only that, but also there are some issues with label and id between light DOM and shadow DOM.
    Please check the following example
  </p>
    
  <x-highlight>
  customElements.define('my-input',class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({mode: 'open'}).innerHTML =
        '&lt;input id="foo" placeholder="should focus here">';
    }
  });

  &lt;!-- Input NOT Focusable with label and Shadow DOM -->
  &lt;label for="foo">
    Click this label &lt;my-input>&lt;/my-input>
  &lt;/label>
  </x-highlight>
`;
