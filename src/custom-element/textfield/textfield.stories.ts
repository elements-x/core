import { customElement, waitForScriptLoad  } from "../custom-element";
import css from './textfield.scss';

export default {
  title: 'customElement()/x-textfield'
};

customElement({
  debug: true,
  tagName: 'x-textfield',
  css, 
  html: `
    {{#if label}}<span class="label">{{label}}</span>{{/if}}
    <input type="text" 
      {{#if value}}value="{{value}}"{{/if}} 
      {{#if placeholder}}placeholder="{{placeholder}}"{{/if}} 
      {{#if disabled}}disabled{{/if}}
      {{#if readonly}}readonly{{/if}}
    />
    <div class="ink-bar"></div>
  `,
  attrs: {
    label: '',
    placeholder: ' ', // intentional one space to use :placeholder-shown
    value: '', // this._props.value
    readonly: {type: 'boolean'}, 
    disabled: {type: 'boolean'},
  },
  props: {
    inputEl: {
      get() {return this.querySelector('input')}
    },
    value: {
      get() { return this.inputEl.value; },
      set(value) { this.inputEl.value = value; }
    },
    readonly: {
      get() { return this.inputEl.readonly; },
      set(value) { this.inputEl.readonly = value; }
    },
    disabled: {
      get() { return this.inputEl.disabled; },
      set(value) { this.inputEl.disabled = value; }
    },
  },
  attributeChangedCallback(name, oldV, newV) {
    this.render();
  }
})

window['setAttrs'] = (arr) => arr.forEach((el) => {
  const [selector, name, value] = el.split(',');
  document.querySelector(selector).setAttribute(name, value);
})
window['setProps'] = (arr) => arr.forEach((el) => {
  const [selector, name, value] = el.split(',');
  document.querySelector(selector)[name] = value;
})

export const AceEditor = () => `
  <h3>With Label</h3>
  <x-textfield label="Label" value="Hello Textfield"></x-textfield> With value
  <br/><br/> <x-textfield label="Label"></x-textfield> When empty  
  <br/><br/> <x-textfield label="Label" placeholder="Enter here..."></x-textfield> With placeholder 
  <br/><br/> <x-textfield label="Label" disabled value="Hello Textfield"></x-textfield> When disabled
  <h3>Without Label</h3>
  <x-textfield value="Hello Textfield"></x-textfield> With value
  <br/><br/> <x-textfield></x-textfield> When empty  
  <br/><br/> <x-textfield placeholder="Enter here..."></x-textfield> With placeholder 
  <br/><br/> <x-textfield disabled value="Hello Textfield"></x-textfield> When disabled
`