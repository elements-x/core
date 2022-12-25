import { customElement } from '..';

function recursivePromiseChain(text, el, speed=100){
  const char = text.shift();
  if (char) {
    return new Promise( (resolve) => {
      el.innerText += char;
      setTimeout(_ => resolve(true), char === '\n' ? speed*3 : speed );
    }).then(_ => recursivePromiseChain(text, el, speed));
  } else {
    return Promise.resolve();
  }
}

export const js = /*javascript*/ ` 
  return customElement({
    debug: true,
    css: 'x-typing-effect { display: block; font-family: monospace; white-space: pre; }',
    attrs: {
      speed: {type: Number, default: 100}
    },
    connectedCallback(args) {
      const text = this._props.orgInnerHTML.split('');
      this.innerHTML = '';
      recursivePromiseChain(text, this, this._props.speed); // returns promise
    }
  });
`;

export const TypingEffectEl = 
  new Function('customElement', 'recursivePromiseChain', js)(customElement, recursivePromiseChain);