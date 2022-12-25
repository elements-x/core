import { customElement } from '..';

customElement('my-event', {
  html: '<button x-style>Click Me</button`>',
  events : { 
    click: function(event) { alert('Click Happened'); }
  }
});

export const EventListeners = () => /*html*/ `
  <p>
  The best way to respond to user interactions is to listen to event and react to it.
  Events are fired to notify code of "interesting changes", typically occur due to user interaction.
  </p>
  <p>
  For example, <code>click</code> event when a button is clicked on it,
  or <code>input</code> event when user enters a value to &lt;input> tag. 
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

  From the above example, the given code works like the following.
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
