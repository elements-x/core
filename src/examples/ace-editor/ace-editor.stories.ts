import { customElement, waitForScriptLoad  } from "@lib";
import css from './ace-editor.scss';

export default {
  title: 'Examples/AceEditor'
};

const js = /*javascript*/ ` 
  customElement('x-ace', {
    debug: true,
    await: () => waitForScriptLoad('ace', ['https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js']),
    html: /*html*/ '<pre class="editor"></pre>',
    css,
    attrs: {
      theme: 'monokai',
      mode: 'javascript',
      showGutter: {type: Boolean},
      useWrapMode: {type: Boolean}
    },
    connectedCallback(args) {
      const editorEl = this.querySelector('.editor');

      const editor = window.ace.edit(editorEl);
      editor.setTheme('ace/theme/' + this._props.theme);
      editor.renderer.setShowGutter(this._props.showGutter);
      editor.session.setMode('ace/mode/' + this._props.mode);
      editor.session.setUseWrapMode(this._props.useWrapMode);
      editor.renderer.setScrollMargin(8, 8, 0, 0);
      editor.setValue(this._props.orgInnerHTML);
      editor.setOptions({maxLines: Infinity}); //Automatically adjust height to contents
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
`;

const demoHTML = (args?) => {
  const showGutter = args.showGutter ? 'show-gutter':'';
  return /*html*/ `
    <x-ace ${showGutter} theme="${args.theme}" mode="${args.mode}">
    function foo(items) {
      var x = "All this is syntax highlighted";
      return x;
    }</x-ace>`
};

new Function('customElement', 'waitForScriptLoad', 'css', js)(customElement, waitForScriptLoad, css);

const Template = (args) => {
  return `
    <p>
      Ace editor is an embeddable code editor like Sublime, Vim and TextMate.
    </p>

    <h2 class="fs-5">HTML:</h2>
    <x-highlight language="html">${demoHTML(args).replace(/</g, '&lt;')}</x-highlight>

    <h2 class="fs-5">Result:</h2>
    ${demoHTML(args)}<br/><br/>

    <h2 class="fs-5">Javascript:</h2>
    <x-highlight>${js}</x-highlight>
  `;
}; 

export const AceEditor = Template.bind({});
AceEditor.args = {
  showGutter: true, 
  theme:'monokai', 
  mode: 'javascript'
};


