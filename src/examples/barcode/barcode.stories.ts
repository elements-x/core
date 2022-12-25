import { customElement, waitForScriptLoad  } from '../../lib';

declare global {
  interface Window {
    JsBarcode?: any;
  }
}

export default {
  title: 'Examples/BarCode'
};

window['setAttrs'] = (arr) => arr.forEach((el) => {
  const [selector, name, value] = el.split(',');
  document.querySelector(selector).setAttribute(name, value);
});
window['setProps'] = (arr) => arr.forEach((el) => {
  const [selector, name, value] = el.split(',');
  document.querySelector(selector)[name] = value;
});

const js = /*javascript*/ `
  customElement('x-barcode', {
    debug: true,
    await: () => waitForScriptLoad('JsBarcode', ['//unpkg.com/jsbarcode/dist/JsBarcode.all.min.js']),
    html: 
      '<svg class="my-barcode"' +
      '  jsbarcode-value="{{value}}"' +
      '  jsbarcode-format="{{format}}"' +
      '  jsbarcode-width="{{width}}"' +
      '  jsbarcode-background="{{background}}"' +
      '  jsbarcode-linecolor="{{lineColor}}"' +
      '  jsbarcode-margin="{{margin}}"' +
      '  jsbarcode-displayvalue="{{displayValue}}"' +
      '  jsbarcode-font="{{font}}"' +
      '  jsbarcode-fontsize="{{fontSize}}"' +
      '  jsbarcode-fontoptions="{{fontOptions}}"' +
      '  jsbarcode-textalign="{{textAlign}}"' +
      '  jsbarcode-textposition="{{textPosition}}"' +
      '  jsbarcode-textmargin="{{textMargin}}">' +
      '</svg>',
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
      this.render();
    },
    propsChangedCallback(key, value) {
      this.render();
    }
  });
`;

const html = /*html*/ `
  <x-barcode id="barcode" value="Hello Bar Code" format="code128"></x-barcode><br/>
  <button onclick="setAttrs(['#barcode,value,123456789012', '#barcode,format,upc'])">Attributes For UPC</button>
  <button onclick="setAttrs(['#barcode,value,Hello Barcode', '#barcode,format,code128'])">Attribute For Code128</button>
  <button onclick="setAttrs(['#barcode,value,Hello World', '#barcode,format,code39'])">Attribute for Code39</button>
  <button onclick="setProps(['#barcode,background,yellow'])">Prop background yelow</button>
  <button onclick="setProps(['#barcode,background,white'])">Prop vackground white</button>
`;

new Function('customElement', 'waitForScriptLoad', js)(customElement, waitForScriptLoad);

export const BarCode = () => /*html*/ `
  <p>
    A barcode generator from the given value. 
    It supports multiple barcode formats.
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${html.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${html}<br/><br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;
