export function highlightValue(xSelectEl: HTMLElement, value) {
  const slotEl = xSelectEl.querySelector('slot');
  const highlightedEl = xSelectEl.querySelector('.x-highlighted:not(.hidden)')

  const nextHighlight = [...slotEl.children].find(optionEl => {
    return ((optionEl as any).value === value) ||
      (optionEl.getAttribute('value') === value.toString());
  })

  if (nextHighlight) {
    highlightedEl?.classList.remove('x-highlighted', 'x-selected');
    nextHighlight.classList.add('x-selected', 'x-highlighted');
    scrollIfNeeded(slotEl, nextHighlight);
  }
}

export function highlightSearch(xSelectEl: HTMLElement, search) {
  const slotEl = xSelectEl.querySelector('slot');
  const matches = [...slotEl.children].filter((el: HTMLElement) => {
    const match = el.innerText.match(new RegExp(search, 'i'));
    el.classList.remove('x-highlighted');
    el.removeAttribute('hidden');
    if (!match) {
      el.setAttribute('hidden', '');
    }
    return match;
  });
  matches[0]?.classList.add('x-highlighted');
}

export function highlightNext(xSelectEl: HTMLElement, inc=1) {
  const slotEl = xSelectEl.querySelector('slot');
  const highlightedEl = xSelectEl.querySelector('.x-highlighted:not(.hidden)')

  const allAvailOptions = Array.from(slotEl.children)
    .filter(optionEl => {
      const notDisabled = optionEl.getAttribute('disabled') === null;
      const notHidden = !optionEl.classList.contains('hidden');
      return notDisabled && notHidden;
    });

  const curIndex = allAvailOptions
    .findIndex(el => el.isEqualNode(highlightedEl)) || 0;
  const total = allAvailOptions.length;

  const nextHighlight = allAvailOptions[(curIndex + total + inc) % total];

  highlightedEl?.classList.remove('x-highlighted', 'x-selected');
  nextHighlight.classList.add('x-highlighted');
  scrollIfNeeded(slotEl, nextHighlight);
}

export function scrollIfNeeded(container, element) {
  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop;
  } else {
    const offsetBottom = element.offsetTop + element.offsetHeight;
    const scrollBottom = container.scrollTop + container.offsetHeight;
    if (offsetBottom > scrollBottom) {
      container.scrollTop = offsetBottom - container.offsetHeight;
    }
  }
}