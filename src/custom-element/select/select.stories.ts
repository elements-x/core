import { customElement  } from "../custom-element";
import { highlightNext, highlightValue, highlightSearch } from "./highlight";
import css from './select.scss';

export default {
  title: 'customElement()/x-select'
};

function selectHandler(event) {``
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

customElement({
  debug: true,
  tagName: 'x-select',
  html: `
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
    readonly: {type: Boolean}
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
    focusin(event) { console.log('focusin', event.target)},
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

export const Select = () => `
<x-select read-only placeholder="Choose one value" value="Hello World">
  <option value="">Choose One</option>
  <option>Hello</option>
  <option>Hello World</option>
  <option>Foo</option>
  <option disabled>4</option>
  <option>Foo Bar</option>
</x-select>`