import { customElement, waitForScriptLoad  } from "../custom-element";
import { ICustomElementProps } from "../types";

declare global {
  interface Window {
    ace?: any;
  }
}

export default {
  title: 'customElement()/pre-conditional/ace-editor'
};

customElement({
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
  connectedCallback(args) {
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

window['setAttrs'] = (arr) => arr.forEach((el) => {
  const [selector, name, value] = el.split(',');
  document.querySelector(selector).setAttribute(name, value);
})
window['setProps'] = (arr) => arr.forEach((el) => {
  const [selector, name, value] = el.split(',');
  document.querySelector(selector)[name] = value;
})

export const AceEditor = () => `<x-ace>function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}</x-ace>`