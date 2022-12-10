import * as sass from 'node-sass';

export function addSCSS(el: HTMLElement, scss: string): void {
  const css = sass.renderSync(scss);
  const tagName = el.tagName.toLowerCase();
  const type = tagName === 'x-input' && el.getAttribute('type');
  const typeSuffix = type ? `-${type}` : ''; 
  const selectorName = `${tagName}${typeSuffix}`;
  const styleEl = document.querySelector(`style[${selectorName}]`);
  if (!styleEl) {
    // console.log('[elements-x] addCss', selectorName);
    const newStyleEl = document.createElement('style');
    newStyleEl.setAttribute(selectorName,'');
    newStyleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(newStyleEl);
    newStyleEl['createdAt'] = new Date().getTime();
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
    // console.log('[elements-x] removeCss', selectorName);
    // if (new Date().getTime() > (styleEl['createdAt'] + 500)) { // only if 500ms passed
      styleEl.remove();
    // }
  } 
}

export function getHtmlError(html:string, paramNoCheckTags?:string) {
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
    return doc.documentElement.querySelector('parsererror');
  }
}

export function setHTML(el: HTMLElement, newHtml: string, orgHtml: string) {
  if (getHtmlError(newHtml)) {
    el.appendChild(getHtmlError(newHtml) as HTMLElement);
    return;
  }

  el.innerHTML = '';
  el.innerHTML = newHtml.indexOf('</slot>') ?  newHtml.replace('<slot></slot>', orgHtml) : newHtml;

  // execute script tags
  this.querySelectorAll('script')
    .forEach( (old: HTMLScriptElement) => {
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
