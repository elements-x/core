export default {
  title: 'Getting Started'
};

export const GettingStarted = () => {
  return /*html*/ `
    <p>
      <code>@elements-x</code> is available as the <code>@elements-x/core</code> package via npm.
    </p>

    <x-highlight language="shell">
      $ npm i @elements-x/core
    </x-highlight>

    <p>
      Then import into JavaScript or TypeScript files:
      Now you can use the custom element in any HTML, with any framework or none at all. 
    </p>
    <x-highlight language="shell">
      import { customElement } from '@elements-x/core';
    </x-highlight>

    <table x-style="true">
      <tr>
        <th>Instead(Lit JS Example)</th>
        <th>Do</th>
      </tr>
      <tr>
        <td>
          <x-highlight>
            import {html, css, LitElement} from 'lit';
            import {customElement, property} from 'lit/decorators.js';

            @customElement('hello-custom-element')
            export class HelloCustomElement extends LitElement {
              static styles = css\`hello-custom-element { color: red; }\`;

              @property({ attribute: 'hello' })
              hello = 'Hello';
              @property({ attribute: 'world' })
              world = 'World';

              render() {
                return html\`&lt;h1>\$\{hello} \$\{world}&lt;/h1>\`;
              }
            }
          </x-highlight>
          A generic way without using a web component library such as LitJS is much more 
          compoicated than the above code to handle reactive property, css styling, and 
          observable attributes.
        </td>
        <td>
          <x-highlight>
            import {customElement} from '@elements-x/core';

            customElement('hello-custom-element', {
              html: '&lt;h1>{{hello}} {{world}}&lt;/h1>',
              css:  'hello-custom-element { color: red; }',
              attrs : { hello: 'Hello', world: 'Custom Element' }
            });
          </x-highlight>
        </td>
      </tr>
    </table>
  `
};



