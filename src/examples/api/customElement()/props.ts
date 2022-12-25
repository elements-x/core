import { customElement } from "../../../lib";

customElement('my-props', {
  props: {
    theme: 'default',
    elName: {
      get() { return this.tagName; }
    },
    background: {
      get() { return this.style.backgroundColor; },
      set(value) { this.style.backgroundColor = value; },
      default: 'white'
    },
    currentDate: function() { return new Date(); }
  },
  propsChangedCallback(name, value) {
    console.log('property ', name, 'is changed to', value);
    this.render();
  },
  html: 'theme: {{theme}}, background: {{background}}, currentDate: {{currentDate}}, elName: {{elName}}'
});

export const propsHTML = /*html*/ `
<h2 class="fs-4">options.props</h2>

<p>
  Optional, when provided property is set to <code>this._props.&lt;name></code>, 
  Anytime when a property value changes, <code>propsChangedCallback()</code> will be executed.
</p>

<p>
  You can get the property as <code>this..&lt;name></code>
  and set the property as <code>this.&lt;name>=.&lt;value</code>, e.g., <code>this.foo</code>, <code>this.foo='bar'</code>.
</p>

<p>
  There are several ways to define attribute type and default value.
</p>

<p>
  Property value can be an object type with getter and setter, or non-object type.
  All property values are stored to <code>this._props</code>. e.g.  <code>this._props.foo</code>
  When getter or setter is defined, the defined getter and setter will be used instead of default ones.

  These are the default ones as provoded as the format of key and value.
  Thus, the following code 
</p>

<p>
  When only property getter is given without setter, it's a read-only property.
</p>

<p>
  When property value is without getter or setter, the given value will be assigned as the initial value.
  The value would be any including a function. When a function is gievn as a value, the function will be performed as the initial value.
</p>

<table x-style>
  <tr> 
    <th>This</th><th>is equivalent to</th> 
  </tr>
  <tr>
    <td>
        <x-highlight>
          props: {
            myProp: 123
          }
        </x-highlight>
    </td>
    <td>
        <x-highlight>
          props: {
            myProp: {
              get() { return this._props.myProp; },
              set(value) { this._props.myProp = value; }
            },
          }
          // Then, this.myProp = 123;
        </x-highlight>
    </td>
  </tr>
  <tr>
    <td>
        <x-highlight>
          props: {
            currentDate: function() { return new Date(); }
          }
        </x-highlight>
    </td>
    <td>
      <x-highlight>
          props: {
            currentDate: {
              get() { return this._props.currentDate; },
              set(value) { this._props.currentDate = value; }
            },
          }
          // Then, this.currentDate = new Date();
        </x-highlight>
    </td>
  </tr>
</table>


<p>
  Here are the examples
</p>
<x-highlight>
customElement('my-props', {
  props: {
    theme: 'default',
    elName: {
      get() { return this.tagName; }
    },
    background: {
      get() { return this.style.backgroundColor; },
      set(value) { this.style.backgroundColor = value; },
      default: 'white'
    },
    currentDate: function() { return new Date(); }
  },
  propsChangedCallback(name, value) {
    console.log('property ', name, 'is changed to', value);
    this.render();
  },
  html: 'theme: {{theme}}, background: {{background}}, currentDate: {{currentDate}}, elName: {{elName}}'
});
</x-highlight>

<p>
  From the above code, <code>&lt;my-props>&lt;/my-props></code> will be like this. 
  <br/>
  <my-props class="d-block border border-info p-2"></my-props>
  Try changing property values.
  <br/>
  <button onclick="document.querySelector('my-props').currentDate = new Date()">Change currentDate</button>
  <button onclick="document.querySelector('my-props').background = '#'+(Math.floor(Math.random()*16777215).toString(16))">Change background</button>
</p>
`;
