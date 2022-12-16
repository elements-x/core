# Title

map (w/ open-layers) 
pagination (1)
select
ul (2)
```Typescript
defineX({ // returns a custom element
  name: 'my-custom', // custom element tag name
  attrs: { // reactive attrs change

  },
  props: { // reactive props change

  },
  html: ``,
  css: ``,
  connectedCallback() { // Invoked when appended into DOM
  },
  disconnectedCallback() { // Invoked when disconnected from DOM
  },
  adoptedCallback() { // Invoked wnen moved to a new document.
  },
  attributeChangedCallback(name, oldValue, newValue) { // Invoked when attribute is changed
  }
}) : HTMLElement;
```