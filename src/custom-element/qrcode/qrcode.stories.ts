import { customElement, waitForScriptLoad  } from "../custom-element";
import { ICustomElementProps } from "../types";

declare global {
  interface Window {
    QRCode?: any;
  }
}

export default {
  title: 'customElement()/QRCode'
};

customElement('x-qrcode', {
  debug: true,
  await: () => waitForScriptLoad('QRCode', ['//unpkg.com/qrcode@1.4.4/build/qrcode.min.js']),
  html: `<img alt="{{value}}" src="{{imgUrl}}" /><br/>{{value}}`,
  css: `x-qrcode img[src=""] { display: none; }`,
  attrs: {
    value: 'Hello QR Code'
  },
  props : {
    imgUrl: async el => await window.QRCode.toDataURL(el._props.value)
  },
  async attributeChangedCallback(name, oldV, newV) {
    this.imgUrl = await window.QRCode.toDataURL(this._props.value);
    this.render();
  }
});

window['setAttrs'] = (arr) => arr.forEach((el) => {
  const [selector, name, value] = el.split(',');
  document.querySelector(selector).setAttribute(name, value);
})
window['setProps'] = (arr) => arr.forEach((el) => {
  const [selector, name, value] = el.split(',');
  document.querySelector(selector)[name] = value;
})

export const QRCode = () => `
  <button onclick="setAttrs(['#qrcode,value,123456789012'])">Change Attribute 1</button>
  <br/>
  <button onclick="setAttrs(['#qrcode,value,Hello QR Code from soldair/node-qrcode'])">Change Attribute 2</button>
  <br/>
  <x-qrcode id="qrcode" value="Hello QR Code from https://github.com/soldair/node-qrcode"></x-qrcode>
`;