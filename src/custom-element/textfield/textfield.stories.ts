import { customElement } from '../';
import css from './textfield.scss';

export default {
  title: 'Examples/TextField'
};

const js = /*javascript*/ `
  customElement('x-textfield', {
    debug: true,
    css, 
    html:
      '{{#label}}' +
      '  <span class="label">{{label}}</span>' +
      '{{/label}}' +
      '<input type="text" ' +
      '  {{#value}}value="{{value}}"{{/value}}' +
      '  {{#placeholder}}placeholder="{{placeholder}}"{{/placeholder}} ' +
      '  {{#disabled}}disabled{{/disabled}}' +
      '  {{#readonly}}readonly{{/readonly}}' +
      '/>' +
      '<div class="ink-bar"></div>',
    attrs: {
      label: '',
      placeholder: ' ', // intentional one space to use :placeholder-shown
      value: '', // this._props.value
      readonly: {type: Boolean}, 
      disabled: {type: Boolean},
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
  });
`;

const demoHTML = /*html*/ `
  <h3 class="fs-6">With Label</h3>
  <x-textfield label="Label" value="Hello Textfield"></x-textfield> With value
  <br/><br/> <x-textfield label="Label"></x-textfield> When empty  
  <br/><br/> <x-textfield label="Label" placeholder="Enter here..."></x-textfield> With placeholder 
  <br/><br/> <x-textfield label="Label" disabled value="Hello Textfield"></x-textfield> When disabled

  <h3 class="fs-6 mt-4">Without Label</h3>
  <x-textfield value="Hello Textfield"></x-textfield> With value
  <br/><br/> <x-textfield></x-textfield> When empty  
  <br/><br/> <x-textfield placeholder="Enter here..."></x-textfield> With placeholder 
  <br/><br/> <x-textfield disabled value="Hello Textfield"></x-textfield> When disabled
`;

new Function('customElement', 'css', js)(customElement, css);

export const TextField = () => /*html*/ `
  <p>
    QR code generator  
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/><br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;