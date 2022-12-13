import { customElement, waitForScriptLoad  } from "./custom-element";

declare global {
  interface Window {
    ace?: any;
    QRCode?: any;
    JsBarcode?: any;
  }
}

export default {
  title: 'customElement()/preCondition'
};

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
  preCondition: () => waitForScriptLoad('QRCode', ['//unpkg.com/qrcode@1.4.4/build/qrcode.min.js']),
  html: `<img alt="{{value}}" src="{{imgUrl}}" />`,
  css: `x-qrcode img[src=""] { display: none; }`,
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

const XAce = customElement({
  debug: true,
  tagName: 'x-ace',
  preCondition: () => waitForScriptLoad('ace', ['https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js']),
  html: `<pre class="editor"></pre>`,
  css: `
  x-ace {
    display: block;
    position: relative;
    min-height: 80px;
    height: 100%;
    white-space: pre-wrap;
    width: 100%;
  }
  x-ace > .editor {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
  }
  
  /* Ace Editor Accessibility Fixes */
  x-ace > .editor.ace-chrome .ace_variable {
    color: #22616D;
  }
  x-ace > .editor.ace-chrome .ace_type {
    color: #3747D2;
  }
  x-ace > .editor.ace-chrome .ace_variable.ace_parameter {
    color: #874903;
  }
  x-ace > .editor.ace-monokai .ace_keyword {
    color: #FC92B9;
  }
  x-ace > .editor.ace-monokai .ace_gutter-cell {
    color: #BEBFBB;
  }`,
  attrs: {
    theme: 'monokai',
    mode: 'javascript',
    showGutter: {type: 'boolean'},
    useWrapMode: {type: 'boolean'}
  },
  render: function(args) {
    const editorEl = this.querySelector('.editor');

    const editor = window.ace.edit(editorEl);
    editor.setTheme(`ace/theme/${this._props.theme}`);
    editor.renderer.setShowGutter(this._props.showGutter);
    editor.session.setMode(`ace/mode/${this._props.mode}`);
    editor.session.setUseWrapMode(this._props.useWrapMode);
    editor.renderer.setScrollMargin(8, 8, 0, 0);
    editor.setValue(this._props.orgInnerHTML);
    editor.clearSelection();
    editor.resize(true);

    this.editor = editor;
    editorEl.querySelector('textarea').setAttribute('aria-label', 'ACE editor');
    this.dispatchEvent(new CustomEvent('load', {detail: editor, bubbles: true}));
    ['blur', 'change', 'copy', 'focus', 'paste'].forEach(eventName => {
      editor.on(eventName, data => {
        this.dispatchEvent(new CustomEvent(eventName, { detail: data, bubbles: true }));
      });
    });
  }
})

export const BarCode = () => `<x-barcode value="Hello Bar Code" format="code128"></x-barcode>`;
export const QRCode = () => `<x-qrcode value="Hello QR Code from https://github.com/soldair/node-qrcode"></x-qrcode>`;
export const AceEditor = () => `<x-ace>function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}</x-ace>`