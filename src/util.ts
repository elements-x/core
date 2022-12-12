import * as Handlebars from 'handlebars';
import { ICustomElement, ICustomElementProps } from "./types";

export function addCss(el: ICustomElement | string, css: string) {
  const tagName = typeof el === 'string' ? el : el.tagName.toLowerCase();
  const styleEl = document.querySelector(`style[${tagName}]`);
  if (!styleEl) {
    const newStyleEl = document.createElement('style');
    newStyleEl.setAttribute(tagName,'');
    newStyleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(newStyleEl);
  }
}

export function removeCss(el: ICustomElement) {
  const tagName = el.tagName.toLowerCase();
  const type = tagName === 'x-input' && el.getAttribute('type');
  const typeSuffix = type ? `-${type}` : ''; 
  const selectorName = `${tagName}${typeSuffix}`;
  const numXElements = document.body.querySelectorAll(`${selectorName}`).length;
  const styleEl = document.querySelector(`style[${selectorName}]`);
  if (styleEl && numXElements < 1) {
    styleEl.remove();
  } 
}

export function setProps(el: ICustomElement, args: ICustomElementProps) {
  for (let key in args.props) {
    Object.defineProperty(el, key, {
      get() {
        return el._props[key];
      },
      set(value) {
        el._props[key] = value;
        el._render(args);
      }
    });
    el._props[key] = args.props[key];
  } 
}

export function setAttributes(el: ICustomElement, attrs: any) {
  for (var key in attrs) {
    const attr = attrs[key];
    const value = 
      attr.type === 'number' ? +attr.value : 
      attr.type === 'boolean' ? attr.value === true : 
      attr.type === 'string' ? '' + attr.value  :
      attr.type === 'function' ? attr.value.bind(el)() : attr;

    el._props[key] = value;
    el.setAttribute(key, value);
  }
}

export function renderHTML(el: ICustomElement, newHtml: string) {
  const orgHtml = el._props.orgInnerHTML;
  const templateHtml = Handlebars.compile(newHtml)(el._props);
  const html = templateHtml.indexOf('</slot>') ?  templateHtml.replace('<slot></slot>', orgHtml) : templateHtml;
  console.log('renderHTML', html)

  // Convert HTML to a valid HTML to make it sure not to break the hosting document
  const doc = (new DOMParser()).parseFromString(html, 'text/html');
  Array.from(doc.head.children).forEach(child => {
    el.insertAdjacentElement('beforeend', child);
  })
  if (doc.body.innerHTML) {
    el.insertAdjacentHTML('beforeend', doc.body.innerHTML);
  }

  // execute script tags
  el.querySelectorAll('script').forEach( (old: HTMLScriptElement) => {
    const scriptEl = document.createElement('script');
    Array.from(old.attributes)
      .forEach( attr => scriptEl.setAttribute(attr.name, attr.value) );
    scriptEl.appendChild(document.createTextNode(old.innerText));
    try {
      el.replaceChild(scriptEl, old); // don't know why this error out
    } catch(e) {
      el.appendChild(scriptEl); 
    }
  });
}
