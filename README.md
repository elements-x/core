# elements-x/core

The simplest custom element library for building fast, lightweight, and reusable tags.

![image](https://user-images.githubusercontent.com/1437734/209509553-191023e4-93e3-41ba-9a10-8ced0a49325d.png)


**Simple**
It's tiny wrapper of Custom Elements,a HTML standard. With minimum coding, you can create your own custom elements in seconds.

**Custom Element**
The return from `customElement()` is a HTMLElement. Thus, it works anywhere you use HTML, with any framework or none at all.

**Library**
All you need to know is a function `customElement(options)`. `options` is just a HTMLElement class expression, which you know it already. e.g., `connectedCallback()`, `attributeChangedCallback()`, etc.

## Getting Started

`@elements-x` is available as the `@elements-x/core` package via npm.

```
$ npm i @elements-x/core
```

Then import into JavaScript or TypeScript files:
Now you can use the custom element in any HTML, with any framework or none at all. 


`customElement()` returns a HTMLElement class and defines a custom element.
You can think of it as a HTML tag, which reacts to attribute change, property change, and fires events. 

```
import { customElement } from '@elements-x/core';

customElement('hello-custom-element', {
  html: '&lt;h1>{{hello}} {{world}}&lt;/h1>',
  css:  'hello-custom-element { color: red; }',
  attrs : {
    hello: 'Hello',
    world: 'Custom Element'
  }
});
```

## API
```
customElement(tagName:string, options: Options) : HTMLElement
```

```javascript
interface Options {
  // Initialize required condition e.g. JQuery library, connectedCallback() will wait until it is resolved.
  await?: () => Promise<any>; 
  
  // the attribute names will be registered to observedAttributes, 
  // so that anytime when the attribute  value changes, `attributeChangedCallback()`will be executed.
  attrs?: { [key: string]: AttrValue};
  
  // property is set to this._props. Anytime when a property value changes, 
  // `propsChangedCallback()` will be executed.
  props?: { [key: string]: any };
  
  // Compiles HTML using Mustache. attrs and props are passed as context to compile new HTML
  html?: string;
  
  // Adds <style id="<<tagName</code>>"> only once when connected.
  css?: string; 
  
  // Add event listeners to this element. 
  // By defining `events` keys and values, you are ready to listen to any events.
  events?: { [key: string]: Function}; 
  
  // called after `connectedCallback()`. You also can call it to re-render 
  // html from `attributeChannged()` and `propsChangedCallback()`.
  render?: Function; 
  
  debug?: boolean; // prints debug messages
  constructorCallback?: Function;
  connectedCallback?: Function; // element is added to the document
  disconnectedCallback?: Function; // element is removed to the document
  adoptedCallback?: Function; // element is transferred to a new document
  attributeChangedCallback?: Function; // Invoked when attribute is changed
  propsChangedCallback?: Function; // Invoked when a prop is changed
}
```


