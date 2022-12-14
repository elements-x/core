import { customElement } from '@lib';
import { highlightNext, highlightValue, highlightSearch } from './highlight';
import css from './select.scss';

export default {
  title: 'Examples/Select'
};

function selectHandler(event) {
  if (event.target.closest('slot')) { // option mouse clicked
    this.value = event.target.value || event.target.getAttribute('value');
    this.dispatchEvent(new Event('change', {bubbles: true}));
    this.inputEl.blur();
  } else if (this.highlightedEl) { // keyboard enter
    this.value = this.highlightedEl.value || this.highlightedEl.getAttribute('value');
    this.dispatchEvent(new Event('change', {bubbles: true}));
    this.inputEl.blur();
  }
}

customElement('x-select', {
  debug: true,
  html: /*html*/ `
    <input aria-label="Select input"
      {{#size}}size="{{size}}"{{/size}} 
      {{#value}}value="{{value}}"{{/value}} 
      {{#disabled}}disabled{{/disabled}}
      {{#placeholder}}placeholder="{{placeholder}}"{{/placeholder}} 
      {{#readonly}}readonly{{/readonly}}
     />
    <slot></slot> <!-- options goes into here -->
  `,
  css, 
  attrs: {
    size: {type: Number},
    value: undefined,
    disabled: {type: Boolean},
    required: {type: Boolean},
    placeholder: ' ',
    readOnly: {type: Boolean}
  },
  props: {
    value: {
      get() { return this.inputEl.value; },
      set(value) { 
        this.inputEl.value = value;
        highlightValue(this, value);
      }
    },
    inputEl: { get() { return this.querySelector('input'); } },
    slotEl: { get() { return this.querySelector('slot') } },
    highlightedEl: { get() { return this.querySelector('slot .x-highlighted:not([hidden])'); } },
  },
  events: {
    // mousedown -> inputEl.blur(), hide dropdown -> input:focus, show dropdown
    mousedown: selectHandler,   
    // click(event) {...} //  click -> inputEl.blur(), hide dropdown
    // do not call selectHandler with click event, but with mousedown
    focusin(event) { /* console.log('focusin', event.target) */ },
    keydown(event) {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
        if      (event.key === 'ArrowDown') { highlightNext(this, 1); }
        else if (event.key === 'ArrowUp') { highlightNext(this, -1); } 
        else if (event.key === 'Escape') { this.inputEl.blur(); }
        else if (event.key === 'Enter') { selectHandler.bind(this)(event) }
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    },
    input(event) { // input key event handler
      highlightSearch(this, this.inputEl.value);
    },
  },
  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  },
  connectedCallback() { // do not call this.render() here, it's called already
    highlightValue(this, this.value);
  }
});

const demoHTML = /*html*/ `
<x-select read-only placeholder="Choose one value" value="Hello World">
  <option value="">Choose One</option>
  <option>Hello</option>
  <option>Hello World</option>
  <option>Foo</option>
  <option disabled>Disabled</option>
  <option>Foo Bar</option>
</x-select>`

export const Select = () => /*html*/ `
  <p>
    Alternative to the traditional &lt;select> tag, which is searchable and stylable.
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/><br/>
`;
  // <h2 class="fs-5">Javascript:</h2>
  // <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>