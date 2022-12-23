import { customElement  } from '../';
import css from './list.scss';

export default {
  title: 'Example/List'
};

customElement('x-list', {
  debug: true,
  css, 
  attrs: {
    selected: undefined,
    expanded: {type: Boolean, default: false},
  },
  props: {
    selected: { get: function() {return this._props.selected; } },
    expandAll: { get: function() {return this._props.expand; } },
  },
  events: {
    'keydown': keydownHandler,
  },
  render() {
    init(this);
    initHighlightAndSelect(this)
  },
});

function init(ulEl) {
  ulEl.setAttribute('tabindex', 0);
  ulEl.querySelectorAll('li > ul, li > * > ul').forEach(el => {
    const liEl = el.closest('li');
    liEl.parentElement.setAttribute('aria-has-popup','');
    ulEl.expandAll && liEl.setAttribute('aria-expanded', '');
  });
  ulEl.querySelectorAll('li').forEach(el => {
    el.addEventListener('click', event => {
      const liEl = event.target.closest('li');
      const hasUlEl = liEl.querySelector('ul');
      hasUlEl ?  toggleAriaExpanded(liEl) : fireSelect(liEl);
      highlightEl(ulEl, liEl);
      event.stopPropagation();
    });
  });
}

function highlightNextEl(ulEl: HTMLElement, inc=1) {
  const allEls = ulEl.querySelectorAll('li');
  const visibles = Array.from(allEls)
    .filter(el => el.offsetParent !== null);
  const highlightedEl: HTMLLIElement = ulEl.querySelector('.x-highlighted');
  const curIndex = visibles.indexOf(highlightedEl);
  const nxtIndex = (visibles.length + curIndex + inc) % visibles.length;

  highlightedEl && highlightedEl.classList.remove('x-highlighted');
  visibles[nxtIndex] && visibles[nxtIndex].classList.add('x-highlighted');
}

function highlightEl(ulEl: HTMLElement, el: HTMLElement) {
  const highlightedEl = ulEl.querySelector('.x-highlighted');
  highlightedEl && highlightedEl.classList.remove('x-highlighted');
  el.classList.add('x-highlighted');
}

function initHighlightAndSelect(ulEl) {
  const liEl = ulEl.querySelector('#'+ ulEl.selected || 'unknown');
  if (liEl) {
    liEl.classList.add('x-highlighted');
    let expandable = liEl.parentElement.closest('li:has(ul)');
    while(expandable && ulEl.contains(expandable)) { 
      expandable.setAttribute('aria-expanded', '');
      expandable = expandable.parentElement.closest('li:has(ul)');
    }
    fireSelect(ulEl.querySelector('.x-highlighted'));
  }
}

function toggleAriaExpanded(el) {
  const expanded = el.getAttribute('aria-expanded') !== null;
  if (expanded) {
    el.removeAttribute('aria-expanded');
  } else {
    el.setAttribute('aria-expanded', '');
  }
}

// unselect prev highlighted ones, and highlight and fire event
function fireSelect(el) {
  const ulEl = el.closest('ul');
  const highlightedEl = ulEl.querySelector('.x-highlighted');
  highlightedEl && highlightedEl.classList.remove('x-highlighted');
  if (el && (el.offsetParent !== null)) { // if visible
    el.classList.add('x-highlighted');
    el.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: el }));
  }
}

function keydownHandler(event) {
  const ulEl = event.target;
  const highlightedEl = ulEl.querySelector('.x-highlighted');
  const hasUlEl = highlightedEl.querySelector('ul');

  if (['Enter', 'Space'].includes(event.code)) {
    highlightedEl && hasUlEl && toggleAriaExpanded(highlightedEl);
    (event.code === 'Enter') && fireSelect(highlightedEl);
  } else if (['ArrowUp', 'ArrowLeft'].includes(event.code)) {
    highlightNextEl(ulEl, -1);
  } else if (['ArrowDown', 'ArrowRight'].includes(event.code)) {
    highlightNextEl(ulEl);
  }
  if (['Enter', 'Space', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.code)) {
    event.stopPropagation();
    event.preventDefault();
  }
} 

export const List = () => /*html*/ `
  <x-list selected="file-a">
    <ul>
      <li> File
        <ul>
          <li id="new">New</li>
          <li>Open
            <ul>
              <li> Recent Files 
                <ul>
                  <li id="file-a">File A</li>
                  <li>File B</li>
                  <li>File C</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li> Edit
        <ul>
          <li>Undo</li>
          <li id="redo">Redo</li>
          <li disabled="disabled">Cut</li>
          <li disabled="disabled">Copy</li>
          <li disabled="disabled">Paste</li>
        </ul>
      </li>
      <li> Format
        <ul>
          <li>Font</li>
          <li>Text</li>
        </ul>
      </li>
      <li> View
        <ul>
          <li>100%</li>
          <li>Zoom In</li>
          <li>Zoom Out</li>
        </ul>
      </li>
      <li id="help">Help</li>
    </ul>
  </x-list>
`