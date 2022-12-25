import { customElement } from "../../../lib";

customElement('my-attrs', {
  attrs: {
    theme: 'default',
    readOnly: {type: Boolean},
    size: {type: Number},
    currentDate: {type: Date, default: new Date()}, 
    tagName: {type: Function, default: function() { return this.tagName; }}
  },
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attribute ', name, 'is changed from', oldValue, 'to', newValue);
  },
  html: 'theme: {{theme}}, readonly: {{readOnly}}, size: {{size}}, currentDate: {{currentDate}}, tagName: {{tagName}}'
});

export const attrsHTML = /*html*/ `
<h2 class="fs-4">options.attrs</h2>

<p>
Optional, when provided, the attribute names will be registered to <code>observedAttributes</code>, so that anytime when the attribute 
value changes, <code>attributeChangedCallback()</code> will be executed.
</p>

<p>
You can access attribute values at <code>this._props</code>. e.g. <code>this._props.theme</code>.
</p>

<p>
There are several ways to define attribute type and default value.
The default value is overwritten when you provide attribute value. <code><my-el show-gutter></my-el></code> will set 
<code>this._props.showGutter</code> to true.
</p>

From the following example, 
<ul>
  <li><code>theme: 'default'</code> is equivalent to <code>theme: {type: String, default: 'default'}</code>.</li>
  <li><code>readOnly: {type: Boolean}</code> is equivalent to <code>readOnly: {type: Boolean, default: undefined}</code>.</li>
  <li><code>size: {type: Number}</code> is equivalent to <code>theme: {type: Number, default: undefined}</code>.</li>
</ul>

The available attribute value types are; <code>Number</code>, <code>Boolean</code>, <code>String</code>, <code>Date</code>, and <code>Function</code>. 

<x-highlight>
customElement('my-attrs', {
  attrs: {
    theme: 'default',
    readOnly: {type: Boolean},
    size: {type: Number},
    currentDate: {type: Date, default: new Date()}, 
    tagName: {type: Function, default: function() { return this.tagName; }}
  },
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attribute ', name, 'is changed from', oldValue, 'to', newValue);
  },
  html: 'theme: {{theme}}, readOnly: {{readOnly}}, size: {{size}}, currentDate: {{currentDate}}, tagName: {{tagName}}'
});
</x-highlight>

<p>
From the above code, <code>&lt;my-attrs>&lt;/my-attrs></code> will be like this. 
<br/>
<my-attrs  class="d-block border border-info p-2"></my-attrs>
</p>

<p>
and <code>&lt;my-attrs theme="github" size="10" read-only current-date="2050-12-25">&lt;/my-attrs></code> will be like this. 
<br/>
<my-attrs  class="d-block border border-info p-2" theme="github" size="10" read-only current-date="2050-12-25"></my-attrs>
</p>
`;

