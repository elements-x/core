import Mustache from 'mustache';

export function addCss(el: HTMLElement | string, css: string, cssOnly=false) {
  const tagName = typeof el === 'string' ? el : el.tagName.toLowerCase();
  const styleEl = document.querySelector(`style[${tagName}]`);
  if (!styleEl) {
    const newStyleEl = document.createElement('style');
    newStyleEl.setAttribute(tagName,'');
    const newCss = cssOnly ? css : `${css}\n${tagName}:not([x-init]) {display:none}`;
    newStyleEl.appendChild(document.createTextNode(newCss));
    document.head.appendChild(newStyleEl);
  }
}

export function removeCss(el: HTMLElement) {
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

export function setPropsFromAttributes(el: HTMLElement, attrs: any) {
  for (var key in attrs) {
    const attrName = key.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
    const attrValue = el.getAttribute(attrName);

    if (attrs[key]?.type) {
      const defaultValue = attrValue || attrs[key].default;
      const value = // type conversion
        attrs[key].type === Number ? +defaultValue : 
        attrs[key].type === Boolean ? attrValue !== null ? true : !!attrs[key].default : 
        attrs[key].type === String ? '' + defaultValue  :
        attrs[key].type === Date ? localDate(defaultValue) :
        attrs[key].type === Function ? defaultValue.bind(el)() :
        defaultValue;
      el['_props'][key] = value;
    } else {
      const value = attrValue || attrs[key];
      el['_props'][key] = value;
    }
  }
}

export function resetHTML(el: HTMLElement, newHtml: string) {
  const orgHtml = el['_props'].orgInnerHTML as string;
  const context = {};
  for (var key in el['_props']) {
    context[key] = el['_props'][key];
    try {
      el[key] && (context[key] = el[key]);
    } catch(e) {
      // in case el[key] getter is called before HTML is set. e.g. this.querySelector('.foo');
    }
  }
  const templateHtml = Mustache.render(newHtml, context);

  const toSlot = templateHtml.indexOf('</slot>') && orgHtml; 
  const slotHTML = templateHtml.replace(/<slot(.*?)>.*?<\/slot>/, (str, m1) => `<slot${m1}>${orgHtml}</slot>`);
  const html = toSlot ? slotHTML: templateHtml;

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
        return resolve(`window.${id} found`);
      }
      else if (waited > 3000)  reject();
      else {
        scripts.forEach(scriptSrc => {
          if (scriptSrc.endsWith('.js')) {
            if (!document.querySelector(`script[data-id=${id.toLowerCase()}]`)) {
              const el = document.createElement('script');
              // why data-id not id, window.<id> returns an element. 
              // e.g. window.hljs is an element, not a function
              el.setAttribute('data-id', id.toLowerCase()); 
              el.setAttribute('src', scriptSrc);
              document.head.appendChild(el);
            }
          } else if (scriptSrc.endsWith('.css')) {
            if (!document.querySelector(`link[data-id=${id.toLowerCase()}]`)) {
              const el = document.createElement('link');
              el.setAttribute('data-id', id.toLowerCase());
              el.setAttribute('rel', 'stylesheet');
              el.setAttribute('href', scriptSrc);
              document.head.appendChild(el);
            }
          } else {
            throw `${scriptSrc} must ends with .js or .css`;
          }
        })
        setTimeout(waitForCondition, 300);
        waited += 300;
      }
    }
    waitForCondition();
  });
}

export function localDate(date): Date {
  if (!date) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    date = new Date(Date.now() - tzoffset);
  } else if (typeof date === 'string') {
    date = new Date(date);
  }
  const str = date.toISOString().slice(0, -1).replace(/[^0-9]/g, '');
  const [year, month, day] = [str.substr(0,4), str.substr(4,2), str.substr(6,2)];

  const localDate = new Date(+year, +month - 1, +day, 2, 0, 0);
  return localDate;
}
