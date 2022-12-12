import * as Handlebars from 'handlebars';
import { ICustomElement } from "./types";

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

export function setPropsFromAttributes(el: ICustomElement, attrs: any) {
  for (var key in attrs) {
    const attrDef = attrs[key];
    const attrValue = el.getAttribute(key);
    const defaultValue = attrValue || attrDef.value;

    const value = // type conversion
      attrDef.type === 'number' ? +defaultValue : 
      attrDef.type === 'boolean' ? defaultValue === true : 
      attrDef.type === 'string' ? '' + defaultValue  :
      attrDef.type === 'function' ? defaultValue.bind(el)() :
      attrDef.type === undefined ? attrValue || attrDef : 
      defaultValue;

    el._props[key] = value;
  }
}

export function renderHTML(el: ICustomElement, newHtml: string) {
  const orgHtml = el._props.orgInnerHTML;
  const templateHtml = Handlebars.compile(newHtml)(el._props);
  const html = templateHtml.indexOf('</slot>') ?  templateHtml.replace('<slot></slot>', orgHtml) : templateHtml;

  // Convert HTML to a valid HTML to make it sure not to break the hosting document
  el.innerHTML = '';
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

export function waitForScriptLoad(id, scripts: string[]): Promise<any> {
    let waited = 0;
    return new Promise(function(resolve, reject) {
      function waitForCondition(){
        if (window[id])  {
          console.log('window property found', id, window[id], window);
          return resolve(true);
        }
        else if (waited > 3000)  reject();
        else {
          scripts.forEach(scriptSrc => {
            if (scriptSrc.endsWith('.js') && !document.querySelector('script#'+id.toLowerCase())) {
              const el = document.createElement('script');
              el.setAttribute('id', id.toLowerCase());
              el.setAttribute('src', scriptSrc);
              document.head.appendChild(el);
            } else if (scriptSrc.endsWith('.css')) {
              const el = document.createElement('link');
              el.setAttribute('id', id.toLowerCase());
              el.setAttribute('rel', 'stylesheet');
              el.setAttribute('href', scriptSrc);
              document.head.appendChild(el);
            }
          })
          setTimeout(waitForCondition, 300);
          waited += 300;
        }
      }
      waitForCondition();
    });
}
