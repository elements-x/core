import { customElement } from '../../custom-element';

customElement('my-event', {
  html: '<button>Click Me</button>',
  events: {
    click: function(event) { alert('Click Happened'); }
  }
});

export const eventsHTML = /*html*/ `
  <h2 class="fs-4">options.events</h2>

  <p>
    Optional, when provided, it add event listeners to this element.
  </p>

  <p>
    By defining <code>events</code> keys and values, you are ready to listen to any events.
    For example, the following code
  </p>

  <x-highlight>
    customElement('my-event', {
      html: '&lt;button>Click Me&lt/button>',
      events : { 
        click: function(event) { alert('Click Happened'); }
      }
    })
  </x-highlight>

  <p>
  From the above example, the given code works like the following.
  </p>

  <x-highlight>
    class CustomElement extends HTMLElement {
      connectedCallback() {
        ...
        this.addEventListener('click', function(event) { alert('Click Happened'); })
      }
    }
  </x-highlight>
  <my-event></my-event>
`;
