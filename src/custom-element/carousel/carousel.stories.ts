import { customElement  } from "../custom-element";
import css from './carousel.scss';
import html from './carousel.html';

export default {
  title: 'customElement()/x-carousel'
};

customElement({
  debug: true,
  tagName: 'x-carousel',
  css, 
  html,
  attrs: {
    selected: {type: Number, default: 0},
  },
  props: {
    items: {
      get() {return Array.from(this.querySelector('.x-items slot').children);}
    },
    selected: function() { return this._props.selected;},
  },
  events: {
    click: function(event) {
      if (event.target.classList.contains('x-prev')) { // prev button clicked
        const index = (this.selected + this.items.length - 1) % this.items.length;
        show(this, index);
      } else if (event.target.classList.contains('x-next')) { // next button clicked
        const index = (this.selected + this.items.length + 1) % this.items.length;
        show(this, index);
      } else if (event.target.closest('.x-items slot')) { // an item clicked
        const index = this.items.findIndex(el => el === event.target);
        show(this, index);
      } else if (event.target.closest('.x-shortcuts')) {
        const children = event.target.closest('.x-shortcuts').children
        const index = Array.from(children).findIndex(el => el === event.target);
        show(this, index);
      }
    }
  },
  connectedCallback() {
    this.items.forEach((_el, i) => {
      const active = this.selected === i ? ' active':'';
      const html = `<button class="x-button${active}">${i}</button>`
      this.querySelector('.x-shortcuts').insertAdjacentHTML('beforeend', html);
    });
    show(this, this.selected, false);
  }
});

function show(carouselEl, number, scroll=true) {
  const itemEls = carouselEl.items;
  itemEls[carouselEl.selected]?.classList.remove('x-active'); // unselect an item

  carouselEl.selected = +number;

  // show the item selected
  const target = itemEls[carouselEl.selected];
  if (scroll) {
    target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  } else {
    setTimeout(_ => {
      carouselEl.items.scrollLeft = target.offsetLeft;
    }, 1000);
  }
  itemEls[carouselEl.selected].classList.add('x-active');

  // highlight the shortcut of the selected item
  carouselEl.querySelector('.x-shortcuts .x-active')?.classList.remove('x-active');
  carouselEl.querySelectorAll('.x-shortcuts .x-button')[carouselEl.selected].classList.add('x-active');
}

export const File = () => `
  <x-carousel selected="2">
    <img class="img1" src="//picsum.photos/300/200?1">
    <img class="img2" src="//picsum.photos/300/200?2">
    <img class="img3" src="//picsum.photos/300/200?3">
    <img class="img4" src="//picsum.photos/300/200?4">
    <img class="img5" src="//picsum.photos/300/200?5">
    <img class="img6" src="//picsum.photos/300/200?6">
    <img class="img7" src="//picsum.photos/300/200?7">
    <img class="img8" src="//picsum.photos/300/200?8">
    <img class="img9" src="//picsum.photos/300/200?9">
  </x-carousel>
`