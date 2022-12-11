export function setStyle(el: HTMLElement | string, css: string) {
  const tagName = typeof el === 'string' ? el : el.tagName.toLowerCase();
  const styleEl = document.querySelector(`style[${tagName}]`);
  if (!styleEl) {
    const newStyleEl = document.createElement('style');
    newStyleEl.setAttribute(tagName,'');
    newStyleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(newStyleEl);
  }
}

export function setAttributes(el: HTMLElement, attrs: any) {
  for (var key in attrs) {
    const attr = attrs[key];
    const value = 
      attr.type === 'number' ? +attr.value : 
      attr.type === 'boolean' ? attr.value === true : 
      attr.type === 'string' ? '' + attr.value  :
      attr.type === 'function' ? attr.value.bind(el)() : attr;

    el['props'][key] = value;
    el.setAttribute(key, value);
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

export function getHtmlError(html:string, paramNoCheckTags?:string): string | void {
  const defaultCheckTags = 'script,style,pre,x-pre,x-ace,x-highlightjs'.split(',');
  const noCheckTags = defaultCheckTags.concat(paramNoCheckTags || ''); 
  const parser = new DOMParser();
  // remove valid html, but non-valid xml tags with its contents, e.g., script, pre, style &nbsp;
  let htmlForParser = `<xml>${html}</xml>` // Can't user html parser, which auto-correct contents
    .replace(/(src|href)=".*?"/g, '$1="OMITTED"')
    .replace(/&nbsp;/g, '&#160;');
  
  noCheckTags.forEach(tagName => {
    const regExp = new RegExp(`<${tagName}[\\s\\S]+?<\\/${tagName}>`, 'gm');
    htmlForParser = htmlForParser.replace(regExp, `<${tagName}>OMITTED</${tagName}>`);
  });
  
  // remove empty attributes, which is invalid for XML parser
  htmlForParser = htmlForParser
    .replace(/(<[a-z-]+.*?)(\s[a-z][a-z-]+\s)(.*?\/?\s?>)/gm, '$1 $3')
    .replace(/(<[a-z-]+.*?)(\s[a-z][a-z-]+)(\/?\s?>)/gm, '$1 $3');

  const doc = parser.parseFromString(htmlForParser, 'text/xml');
  if (doc.documentElement.querySelector('parsererror')) {
    console.error(htmlForParser.split(/\n/).map( (el, ndx) => `${ndx+1}: ${el}`).join('\n'));
    return doc.documentElement.querySelector('parsererror')?.innerHTML;
  }
}

export function renderHTML(el: HTMLElement, newHtml: string, orgHtml: string) {
  const parseError = getHtmlError(newHtml);
  if (parseError) {
    throw parseError;
  }

  el.innerHTML = '';
  el.innerHTML = newHtml.indexOf('</slot>') ?  newHtml.replace('<slot></slot>', orgHtml) : newHtml;

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
