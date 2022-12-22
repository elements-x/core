import { customElement, waitForScriptLoad  } from "../custom-element";
import { ICustomElementProps } from "../types";

declare global {
  interface Window {
    JsBarcode?: any;
  }
}

export default {
  title: 'customElement()/BarCode'
};

customElement('x-barcode', {
  debug: true,
  await: () => waitForScriptLoad('JsBarcode', ['//unpkg.com/jsbarcode/dist/JsBarcode.all.min.js']),
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
    format: 'code128', // code128, upc
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
  render() { 
    window.JsBarcode('.my-barcode').init()
  },
  attributeChangedCallback(name, oldValue, newValue) {
    this.render(true);
  },
  propsChangedCallback(key, value) {
    this.render(true);
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

export const BarCode = () => `
  <button onclick="setAttrs(['#barcode,value,123456789012', '#barcode,format,upc'])">Attributes For UPC</button>
  <br/>
  <button onclick="setAttrs(['#barcode,value,Hello Barcode', '#barcode,format,code128'])">Attribute For Code128</button>
  <br/>
  <button onclick="setAttrs(['#barcode,value,Hello World', '#barcode,format,code39'])">Attribute for Code39</button>
  <br/>
  <button onclick="setProps(['#barcode,background,yellow'])">Prop background yelow</button>
  <br/>
  <button onclick="setProps(['#barcode,background,white'])">Prop vackground white</button>
  <br/>
  <x-barcode id="barcode" value="Hello Bar Code" format="code128"></x-barcode>
`;
