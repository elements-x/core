import { customElement, waitForScriptLoad  } from "./custom-element";

declare global {
  interface Window {
    QRCode?: any;
    JsBarcode?: any;
  }
}

const XBarCode = customElement({
  tagName: 'x-barcode',
  debug: true,
  preCondition: () => waitForScriptLoad('JsBarcode', ['//unpkg.com/jsbarcode/dist/JsBarcode.all.min.js']),
  html: `
    <svg class="my-barcode"
      jsbarcode-value="{{value}}"
      jsbarcode-format="{{format}}"
      jsbarcode-width="{{width}}"
      jsbarcode-background="{{background}}"
      jsbarcode-linecolor="{{lineColor}}"
      jsbarcode-margin="{{margin}}"
      jsbarcode-displayvalue="{{displayValue}}"
      jsbarcode-font="{{font}}"
      jsbarcode-fontsize="{{fontSize}}"
      jsbarcode-fontoptions="{{fontOptions}}"
      jsbarcode-textalign="{{textAlign}}"
      jsbarcode-textposition="{{textPosition}}"
      jsbarcode-textmargin="{{textMargin}}">
    </svg>
  `,
  attrs: {
    value: '123456789012',
    format: 'code128',
  },
  props : {
    width: 1,
    background: '#FFFFFF',
    lineColor: '#000000',
    margin: 10,
    displayValue: true,
    font: 'monospace',
    fontSize: 20,
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontOptions: 'bold',
  },
  render: (args) => window.JsBarcode('.my-barcode').init()
});

const XQRCode = customElement({
  debug: true,
  preCondition: async () => await waitForScriptLoad('QRCode', ['//unpkg.com/qrcode@1.4.4/build/qrcode.min.js']),
  html: `<img alt="{{value}}" title="{{value}}" src="{{imgUrl}}" />`,
  attrs: {
    value: 'Hello QR Code'
  },
  props : {
    imgUrl: undefined
  },
  render: async function(args) { // Do not call this.xxxxx here, causing loop
    this.imgUrl = await window.QRCode.toDataURL(this._props.value);
  },
});
if (!customElements.get('x-qrcode')) {
  customElements.define('x-qrcode', XQRCode);
}

export default {
  title: 'customElement()/preCondition'
};

export const BarCode = () => `<x-barcode value="Hello Bar Code" format="code128"></x-barcode>`;
export const QRCode = () => `<x-qrcode value="Hello QR Code from https://github.com/soldair/node-qrcode"></x-qrcode>`;