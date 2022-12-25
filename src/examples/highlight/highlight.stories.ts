import { js, HighlightEl } from './index';
!customElements.get('x-highlight') && customElements.define('x-highlight', HighlightEl);

export default {
  title: 'Examples/HighlightJS'
};

const demoHTML = /*html*/`<x-highlight>function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}</x-highlight>`;

export const HighlightJS = () => /*html*/ `
  <p>
    Convert a section to a syntax highlighted view, https://highlightjs.org/ 
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/><br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;