import { customElement } from '../custom-element';
export default { title: 'Elements' };

customElement('hello-custom-element', {
  html: `<h1>{{hello}} {{world}}</h1>`,
  css: `hello-custom-element { color: red; }`,
  attrs : { hello: 'Hello', world: 'Custom Element' }
})

customElement('my-event', {
  html: '<button>Click Me</button`>',
  events : { 
    click: function(event) { alert('Click Happened'); }
  }
});

export const Overview = () => `
<p>
  A component returned by <code>customElement()</code> function is a reusable HTML element. 
  You can think of any HTML tag. It reacts to attribute change, property change, and fires events. 
</p>

Here's a sample:
<x-prism>
import { customElement } from '@elements-x/core';

customElement('hello-custom-element', {
  html: \`&lt;h1>{{hello}} {{world}}&lt;/h1>\`,
  css: \`hello-custom-element { color: red; }\`,
  attrs : { hello: 'Hello', world: 'Custom Element' }
});
</x-prism>

<hello-custom-element hello="Hi," world="World"></hello-custom-element>
`;

export const LifeCycleCallbacks = () => `
<p>
Lifecycle callbacks are the exactly the same as 
<a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks">
custom elements life cycle
</a>. Also it hast the following three functions for users' convenience.
  <ul>
    <li>
      <code>await()</code>: called at the beginning of <code>connectedCallback()</code>.
      This makes the processing to wait until the necessary library is imported.
    </li>

    <li>
      <code>render()</code>: called at the end of  <code>connectedCallback()</code>.
      Also users can call render() to rerender compiled html from 
      <code class="text-secondary">attributeChangedCallback()</code> or 
      <code class="text-secondary">propsChangedCallback()</code>
    </li>

    <li>
      <code>propsChangedCallback()</code>: called when propery is changed.
      You can rerender HTML by calling <code>render()</code> function.
    </li>
  </ul> 
</p>

<h4>When connected</h4>
<ol>
  <li>run <code>await()</code></li>
  <li>add style from <code>css</code></li>
  <li>set observedAttributes from <code>attrs</code></li>
  <li>set getters and setters from <code>props</code></li>
  <li>compile <code>html</code> and render HTML</li>
  <li>run <code>render()</code></li>
  <li>add event listeners from <code>events</code></li>
  <li>run <code>connectedCallback()</code></li>
</ol>

<h4>When disconnected</h4>
<ol>
  <li>remove <code>css</code>, which is added when connected</code></li>
  <li>run <code>disconnectedCallback()</code></li>
</ol>

<h4>When an attribute changed</h4>
<ol>
  <li>run <code>attributeChangedCallback()</code></li>
</ol>

<h4>When a property changed</h4>
<ol>
  <li>run <code>propsChangedCallback()</code></li>
</ol>
`;

export const MustacheJSRendering = () => `
It compiles your HTML using <a href="https://github.com/janl/mustache.js/#templates">Mustache</a>.
<code>attrs</code> and <code>props</code> are passed to compile new HTML.
<x-prism>
customElement('my-element', {
  html: '{{hello}} {{my}} {{world}}',
  attrs : { hello: 'Hi,', world: 'Custom Element' }
  props : { my: 'My' }
})
</x-prism>

From the above example, HTML is compiles like the following.
<x-prism>
const newHTML = Mustache.render(
  '{{hello}} {{my}} {{world}}', 
  {hello: 'Hi,', world: 'Custom Element', my: 'My'}
);
// Output: 'Hi My World'
</x-prism>
`;

export const EventListeners = () => `
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

<x-prism>
customElement('my-event', {
  html: '&lt;button>Click Me&lt/button>',
  events : { 
    click: function(event) { alert('Click Happened'); }
  }
})
</x-prism>
<my-event></my-event>

`;

export const Styling = () => `
<p>
If you provide <code>css</code> property, when your custom element is connected
it adds &ltstyle id="<code>tagName</code>"> only once as the same as a popular framework. 
</p>

<p>
Please be specific to the css to avoid css leaking to your custom element like the following
</p>
<x-prism language="css">
  my-element .some-class {
    font-weight: bold;
  }
</x-prism>

<p>
It does NOT use Shadow DOM. why?
</p>

<p>
  1. Nodes inside Shadow DOM aren't accessible via things like 
  <code>document.querySelector()</code> or <code>document.getElementById()</code>.
  This is good to prevent unwanted changes from other scripts. However, it's not good
  when you need to run some automated QA tests. It makes scripting so difficult.
</p>
<p>
  2. All CSS in Shadow DOM is scoped to it. The advantage of it is styles don't bleed out to light DOM.
  The disadvantage is it's hard to apply global styles such as themes.
  If you are creating a web page using traditional CSS frameworks like Bootstrap, 
  Foundation, Pure, Material Design, etc. Shadow DOM just won't work  because the 
  styling will not penetrate into the components.
</p>
<p>
  3. Shadow DOM has some accessibility issues when ARIA attributes like <code>aria-labelledby</code>
  and <code>aria-describedby</code> are used inside Shadow DOM because values of those cannot
  reach outside of its shadow DOM to reference the element from the other component.
  Not only that, but also there are some issues with label and id between light DOM and shadow DOM.
  Please check the following example
</p>
  
<x-prism>
customElements.define('my-input',class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML =
      '&lt;input id="foo" placeholder="should focus here">';
  }
});

&lt;!-- Input NOT Focusable with label and Shadow DOM -->
&lt;label for="foo">
  Click this label &lt;my-input>&lt;/my-input>
&lt;/label>
</x-prism>



`;
