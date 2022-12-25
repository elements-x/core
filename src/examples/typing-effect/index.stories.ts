import { js, TypingEffectEl } from '.';
!customElements.get('x-typing-effect') && customElements.define('x-typing-effect', TypingEffectEl);

export default {
  title: 'Examples/TypingEffect'
};

const demoHTML = /*html*/ `
  <x-typing-effect>Hello Custom Element.  You are watching a typing effect.</x-typing-effect>
`;

export const TypingEffect = () => /*html*/ `
  <p>Typing Effect</p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/><br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;