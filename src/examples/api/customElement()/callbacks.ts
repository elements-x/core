import { customElement } from "../../../lib";

export const callbacksHTML = /*html*/ `
<h2 class="fs-4">callbacks</h2>

<p>
  There are five inherited callbacks and one new <code>propsChangedCallback()</code>.
</p>

<ul>
  Inherited callbacks from HTMLElement.
  <li>
    <code>constructorCallback()</code>: Run after <code>constructor()</code> is called.
  </li>
  <li>
    <code>connectedCallback()</code>: Run after the default <code>connectedCallback()</code> is called.
    The defalt <code>connectedCallback()</code> does the following.
    <ul>
      <li>if defined, run <code>await <b>options.await()</b></code> </li>
      <li>if <b>options.css</b> is defined, add <code>&lt;style data-id="..."></code into <code>&lt;head></code> tag.</li>
      <li>
        if <b>options.attrs</b> is defined, set <code>obseredAttributes</code> from attribute names and 
        set properties from from attribures provided.
      </li>
      <li>
        if <b>options.props</b> is defined, set getters and setters from the given value.
      </li>
      <li>
        if <b>options.html</b> is defined, replace the innerHTML from Mustache-compiled html.
      </li>
    </ul>
  </li>
  <li>
    <code>disconnectedCallback()</code>: Run after the default <code>disconnectedCallback()</code> is called.
    <br/>
    The default <code>disconnectedCallback()</code> does nothing at the moment.
  </li>
  <li>
    <code>adoptedCallback()</code>: Run after the default <code>adoptedCallback()</code> is called.
    <br/>
    The default <code>adoptedCallback()</code> does nothing at the moment.
  </li>
  <li>
    <code>attributeChangedCallback()</code>: Run after the default <code>attributeChangedCallback()</code> is called.
    <br/>
    The default <code>attributeChangedCallback()</code> sets <code>this._props</code> values.
    <br/>
    For example, if attribute 'foo-bar' changes, <code>this._props.fooBar</code> also changes.
  </li>
</ul>

<code>propsChangedCallback()</code> is a new one, and it runs after a property value changes.
`;
