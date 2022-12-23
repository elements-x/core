import { customElement } from "../../custom-element";

customElement('my-render', {
  attrs: {
    foo: '1'
  },
  props: {
    bar: 2
  },
  html: 'foo: {{foo}}, bar: {{bar}}',
  propsChangedCallback(name, value) {
    this.render();
  },
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  },
  render() {
    this.style.backgroundColor = '#'+(Math.floor(Math.random()*16777215).toString(16));
  }
});

export const renderHTML = /*html*/ `
  <h2 class="fs-4">options.render()</h2>

  <p>
    Optional, when provided, it is called after <code>connectedCallback()</code>
  </p>

  <p>You also can call it to re-render html from <code>attributeChannged()</code> and <code>propsChangedCallback()</code>.

  <x-highlight>
    customElement('my-render', {
      attrs: { foo: '1' },
      props: { bar: 2 },
      html: 'foo: {{foo}}, bar: {{bar}}',
      propsChangedCallback(name, value) {
        this.render();
      },
      attributeChangedCallback(name, oldValue, newValue) {
        this.render();
      },
      render() {
        this.style.backgroundColor = '#'+(Math.floor(Math.random()*16777215).toString(16));
      }
    });
  </x-highlight>

  <my-render class="d-block border border-info p-2"></my-render>
  <button onclick="document.querySelector('my-render').setAttribute('foo', Math.random()*10)">Change attr</button>
  <button onclick="document.querySelector('my-render').bar = Math.random()">Change prop</button>
`;
