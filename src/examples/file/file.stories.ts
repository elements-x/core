import { customElement  } from '../../lib';
import css from './file.scss';

export default {
  title: 'Examples/File'
};

const js = /*javascript*/ `
customElement('x-file', {
  debug: true,
  css, 
  html: 
    '<label class="x-file-input">' +
    '  <input type="file" multiple />' +
    '  <div class="x-slot">' +
    '    <slot>' +
    '      Click, copy/paste files, or drag/drop files here.' +
    '      The selected files are displayed below.' +
    '   </slot>' +
    '  </div>' +
    '</label>' +
    '<div class="x-file-list"></div>',
  props: {
    inputEl: {
      get() { return this.querySelector('input'); }
    },
    files: {
      get() { return this._props.files; }
    },
  },
  events: {
    'dragover': dragoverHandler,
    'dragleave': dragleaveHandler,
    'drop': function dropHandler(evt) {
      dragleaveHandler(evt);
      setFiles(evt);
    },
    'paste': function pasteHandler(evt) {
      dragleaveHandler(evt);
      setFiles(evt);
    },
    'change': setFiles
  }
});

function dragoverHandler(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  this.classList.add('x-dragover');
}

function dragleaveHandler(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  this.classList.remove('x-dragover');
}

function setFiles(evt) {
  // dataTransfer(drag/drop), clipboardData(copy/paste), target(select)
  this._props.files = [
    ...(evt.dataTransfer || evt.clipboardData || evt.target).files
  ];

  this._props.files.forEach(async file => {
    file.dataURL = await readURL(file);
    showFile.bind(this)(file);
  })
  const customEvent = new CustomEvent('x-select', {bubbles: true, detail: this.files}) 
  this.dispatchEvent(customEvent);
}

function readURL(file) {
  return new Promise(function(res, rej) {
    const reader = new FileReader();
    reader.onload = e => res(e.target.result);
    reader.onerror = e => rej(e);
    reader.readAsDataURL(file);
  });
}

function showFile(file) {
  const fileEl = document.createElement('div');
  fileEl.classList.add('x-file');
  const imgEl = file.type.startsWith('image') ?
    '<img class="x-preview" src="' + file.dataURL + '" />': '<span>' + file.type + '</span>';

  fileEl.insertAdjacentHTML('beforeend', 
    '<div class="x-name">' + file.name + '</div>' +
    '<div class="x-preview">' + imgEl + '(' + formatSize(file.size) + ')</div>' +
    '<div class="x-buttons">' +
      '<button class="x-delete">🗑</button>' +
    '</div>' +
    '<div class="x-progress"></div>'
  );
  fileEl.querySelector('.x-delete').addEventListener('click', event => {
    this.files.splice(this.files.indexOf(file), 1);
    event.target.closest('.x-file').remove();
    this.dispatchEvent(new CustomEvent('x-select', {bubbles: true, detail: this.files}));
  });

  this.querySelector('.x-file-list').appendChild(fileEl);
}

function formatSize(bytes, decimalPoint = 2) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, i))
    .toFixed(decimalPoint)) + ' ' + sizes[i];
}
`;

const demoHTML = /*html*/ `
  <x-file></x-file>
  <br/><br/>
  <x-file>My own guide message here replacing the default.</x-file>
`;

new Function('customElement', 'css', js)(customElement, css);

export const File = () => /*html*/ `
  <p>
    To collect files, user can drag/drop or copy/paste files.
    As the result, users can see the preview of file if the collected file is an image.
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/><br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;

