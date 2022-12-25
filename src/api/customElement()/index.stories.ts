import { awaitHTML } from './await';
import { attrsHTML } from './attrs';
import { propsHTML } from './props';
import { htmlHTML } from './html';
import { cssHTML } from './css';
import { eventsHTML } from './events';
import { renderHTML } from './render';
import { callbacksHTML } from './callbacks';

export default { title: 'API/customElement()' };

export const Primary = () =>/*html*/ `

<h2> customElement(tagName, options)</h2>

<x-highlight>
  export interface ICustomElementOptions {
    await?: () => Promise<any>; // Initialize required condition e.g. JQuery library
    attrs?: { [key: string]: AttrValue}; // reactive attrs change 
    props?: { [key: string]: any }; // reactive props change
    html?: string;
    css?: string;
    events?: { [key: string]: Function};
    render?: Function;
    debug?: boolean;
    constructorCallback?: Function;
    connectedCallback?: Function; // element is added to the document
    disconnectedCallback?: Function; // element is removed to the document
    adoptedCallback?: Function; // element is transferred to a new document
    attributeChangedCallback?: Function; // (name: string, oldValue: string, newValue: string); // Invoked when attribute is changed
    propsChangedCallback?: Function;
  }
</x-highlight>` 
+ awaitHTML
+ attrsHTML
+ propsHTML
+ htmlHTML
+ cssHTML
+ eventsHTML
+ renderHTML
+ callbacksHTML;
Primary.storyName = 'customElement()';

