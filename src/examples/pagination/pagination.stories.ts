import { customElement  } from '@lib';
import css from './pagination.scss';

export default {
  title: 'Examples/Pagination'
};

const js = /* javascript */ `
customElement('x-pagination', {
  debug: true,
  css, 
  html: 
    '<button class="first page navigation" title="first page"></button>' +
    '<button class="prev page navigation" title="previous page"></button>' +
    '<div class="pages"></div>' +
    '<button class="next page navigation" title="next page"></button>' +
    '<button class="last page navigation" title="last page"></button>',
  attrs: {
    total: {type: Number, default: 100},
    index: {type: Number, default: 0},
    numPerPage: {type: Number, default: 10},
    numPages: {type: Number, default: 5},
  },
  events: {
    'click': handleClick, 
  },
  attributeChangedCallback(name, oldValue, newValue) {
    this.render(true);
  },
  render() {
    (this._props.numPages % 2 === 0) && this._props.numPages++; // make it odd number
    updateNavButtons(this);
    updatePageButtons(this);
  },
});
  
function handleClick(event) {
  const clickedEl = event.target;
  if (clickedEl.classList.contains('page')) { 
    this._props.index = +clickedEl.getAttribute('index');
    updateNavButtons(this);
    updatePageButtons(this);

    const {index, numPerPage, total} = this._props;
    const customEvent = new CustomEvent('select', 
      {bubbles: true, detail: {index, numPerPage, total}}
    );
    this.dispatchEvent(customEvent);
  }
}

// Rewrite navigation buttons; first, last, next, prev
function updateNavButtons(paginationEl) {
  const firstPageBtn = paginationEl.querySelector('.first.page');
  const prevBtn = paginationEl.querySelector('.prev');
  const nextBtn = paginationEl.querySelector('.next');
  const lastPageBtn = paginationEl.querySelector('.last.page');

  const {numPerPage, total} = paginationEl._props;
  const pages = getPages(paginationEl._props);
  const [pages0, pagesX] = [pages[0], pages.slice(-1)[0]];
  const pages0Index = (pages0 -1) * numPerPage;
  const pagesXIndex =  (pagesX -1) * numPerPage;

  firstPageBtn.setAttribute('index', 0);
  firstPageBtn.disabled = !(pages0Index > numPerPage);

  prevBtn.setAttribute('index', pages0Index - numPerPage);
  prevBtn.disabled = !(pages0Index > 0);

  nextBtn.setAttribute('index', pagesXIndex + numPerPage);
  nextBtn.disabled = !(total > pagesXIndex + numPerPage);

  lastPageBtn.setAttribute('index', (total - numPerPage));
  lastPageBtn.disabled = !(total > (pagesXIndex + numPerPage*2));
}

// Rewrite page buttons
function updatePageButtons(paginationEl) {
  const {numPerPage, index} = paginationEl._props;
  const pagesEl = paginationEl.querySelector('.pages');

  pagesEl.innerHTML = '';
  getPages(paginationEl._props).forEach(page => {
    const pageNum = (page - 1) * numPerPage;
    const selected = pageNum === index ? ' selected' : '';

    pagesEl.insertAdjacentHTML('beforeend', 
      '<button class="page' + selected + '" index="' + pageNum + '">' + page + '</button>'
    );
  });
}

// Returns array of page numbers to display
function getPages({total, numPerPage, index, numPages}) {
  const totalPages = Math.ceil(total / numPerPage);
  const currentPage = (index + numPerPage) / numPerPage;
  const numNeighbor = (numPages - 1) / 2;

  let middlePage = currentPage;
  if ((numNeighbor*2 - currentPage) >= 1) { // currentPage is a low number
    middlePage = numNeighbor + 1;
  } else if ((numNeighbor + currentPage) > totalPages) { // currentPage is a high number
    middlePage = totalPages - numNeighbor;
  }
  const minPage = Math.max(middlePage - numNeighbor, 1);
  const maxPage = Math.min(totalPages, middlePage + numNeighbor);

  function range(start, end) {
    return Array.from({ length }, (_, i) => start + i);
  }

  var length = maxPage - minPage + 1;
  return [...Array(length).keys()].map(el => el + minPage);
}
`;

const demoHTML = /*html*/ `
  <x-pagination></x-pagination>
  <br/>
  <x-pagination total="500" index="5" num-per-page="15" num-pages="7"></x-pagination>
`;

new Function('customElement', 'css', js)(customElement, css);

export const Pagination = () => /*html*/ `
  <p>
    It enables the user to select a specific page from a range of pages that 
    are composed by total records, number of records per page, and the current row number.  
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;