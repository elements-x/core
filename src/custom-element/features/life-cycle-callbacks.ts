export const LifeCycleCallbacks = () => /*html*/ `
  <p>
  Lifecycles are the exactly the same as 
  <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks">
  custom elements life cycles
  </a>. In addition, it hast the following three more functions for users' convenience.
    <ul>
      <li>
        <code>await()</code>: 
        called at the beginning of <code>connectedCallback()</code>.
        This makes the processing to wait until the necessary library is imported.
      </li>

      <li>
        <code>render()</code>: 
        called at the end of  <code>connectedCallback()</code>.
        Also users can call <code>this.render()</code> to rebuild html from any callback function.
      </li>

      <li>
        <code>propsChangedCallback()</code>:
        called when propery is changed, and registred at <code>connectedCallback()</code>.
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