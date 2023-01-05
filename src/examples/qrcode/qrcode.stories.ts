import { customElement } from '@lib';

export default {
  title: 'Examples/QRCode'
};

const waitForScriptLoad = customElement.waitForScriptLoad;

const js = /*javascript*/ ` 
  customElement('x-qrcode', {
    debug: true,
    await: () => waitForScriptLoad('QRCode', ['//unpkg.com/qrcode@1.4.4/build/qrcode.min.js']),
    html: '<img alt="{{value}}" src="{{imgUrl}}" /><br/>{{value}}',
    css: 'x-qrcode img[src=""] { display: none; }',
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
`;

const demoHTML = /*html*/ `
  <x-qrcode id="qrcode" value="Hello QR Code from https://github.com/soldair/node-qrcode"></x-qrcode>
  <br/>
  <button onclick="setAttrs(['#qrcode,value,123456789012'])">Change Attribute 1</button>
  <button onclick="setAttrs(['#qrcode,value,Hello QR Code from soldair/node-qrcode'])">Change Attribute 2</button>
  <script>
    window.setAttrs = (arr) => arr.forEach((el) => {
      const [selector, name, value] = el.split(',');
      document.querySelector(selector).setAttribute(name, value);
    })
    window.setProps = (arr) => arr.forEach((el) => {
      const [selector, name, value] = el.split(',');
      document.querySelector(selector)[name] = value;
    })
  </script>

`;

new Function('customElement', 'waitForScriptLoad', js)(customElement, waitForScriptLoad);

export const QRCode = () => /*html*/ `
  <p>
    QR code generator  
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/><br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;