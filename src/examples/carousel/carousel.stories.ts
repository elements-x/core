import { customElement  } from '../../lib';
import css from './carousel.scss';
import html from './carousel.html';

export default {
  title: 'Examples/Carousel'
};

const js = /*javascript*/`
  customElement('x-carousel', {
    debug: true,
    css, 
    html,
    attrs: {
      selected: {type: Number, default: 0},
    },
    props: {
      items: {
        get() {
          return Array.from(this.querySelector('.x-items slot').children);
        }
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
        const html = '<button class="x-button' + active + '">' + i + '</button>';
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
  }`;

const demoHTML = /*html*/ `
  <x-carousel selected="2">
    <img class="img1" src="//picsum.photos/400/300?1">
    <img class="img2" src="//picsum.photos/400/300?2">
    <img class="img3" src="//picsum.photos/400/300?3">
    <img class="img4" src="//picsum.photos/400/300?4">
    <img class="img5" src="//picsum.photos/400/300?5">
    <img class="img6" src="//picsum.photos/400/300?6">
    <img class="img7" src="//picsum.photos/400/300?7">
    <img class="img8" src="//picsum.photos/400/300?8">
    <img class="img9" src="//picsum.photos/400/300?9">
  </x-carousel>
`;

new Function('customElement', 'css', 'html', js)(customElement, css, html);

export const Carousel = () => /*html*/ `
  <p>
    A carousel is basically a type of slideshow used to display images, text, or both in a cyclic manner
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/><br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;