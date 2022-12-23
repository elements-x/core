import { customElement } from '../';
import css from './calendar.scss'; 
import { rebuildCalendar } from './rebuild-calendar';
import { localDate } from '../util';

export default {
  title: 'Example/Calendar'
};

function changeHandler(event) { // Do not use arrow function here if 'this' is used
  const year = event.target.value;
  const [month, day] = [this.currentDate.getMonth(), this.currentDate.getDate()];
  this.currentDate = new Date(year, month, day);
}

function clickHandler(e) {
  const date = this.currentDate;
  const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
  if (e.target.id === 'x-prev-month') { // ◀ button
    this.currentDate = new Date(year, month-1, day);
  } else if (e.target.id === 'x-next-month') { // ▶ button
    this.currentDate = new Date(year, month+1, day);
  } else if (e.target.id === 'x-today') { // ● button
    this.currentDate = new Date();
  } else if (e.target.id.match(/x-[0-9-]+$/)) { // date button
    const dateEl = e.target;
    const date = new Date(dateEl.id.slice(2));
    const preSelected = dateEl.classList.contains('x-select');
    if (preSelected) {
      dateEl.classList.remove('x-select');
      this.datesSelected = this.datesSelected.filter(el => {
        return el.toISOString().substring(0,10) !== date.toISOString().substring(0,10);
      });
      dateEl.dispatchEvent(new CustomEvent('deselect', { bubbles: true, detail: localDate(date)}));
    } else {
      if (this._props.multiple) {
        this.datesSelected.push(date);
      } else {
        this.querySelector('.x-days-container .x-select')?.classList.remove('x-select');
        this.datesSelected = [date];
      }
      dateEl.classList.add('x-select');
      dateEl.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: localDate(date)}));
    }
  }
}

const XCalendar = customElement('x-calendar', {
  debug: true,
  html: /*html*/ `
    <div class="calendar">
      <div class="x-header">
        <div class="x-month-year">
          <span id="x-month" class="x-month"></span>
          <select id="x-years" class="x-years" read-only></select>
        </div>
        <button x="" id="x-prev-month" class="x-prev icon" arial-label="previous month"></button>
        <button x="" id="x-today" class="x-today icon" arial-label="today"></button>
        <button x="" id="x-next-month" class="x-next icon" arial-label="next month"></button>
      </div>
      <div class="x-week-days-container"></div>
      <div class="x-days-container">
      </div>
    </div>
  `,
  css: css, 
  attrs: {
    multiple: {type: Boolean},
    date: {type: Date, default: new Date()},
    monthFormat: 'long',  // long(June), short(Jun), narrow(J)
    weekFormat: 'long',  // long(Monday), short(Mon), narrow(M)
    locale: 'en', // en-US, ja, ko, zh-CN
    firstDayOfWeek: {type: Number, default: 0} // 0(Sunday), 1(Monday)
  },
  props: {
    currentDate: function() { return this._props.date; }
  },
  events: {
    'change': changeHandler,
    'click': clickHandler
  },
  render() {
    rebuildCalendar(this);
  },
  propsChangedCallback(name, value) { // Do not use arrow function here if 'this' is used
    this.render(true); // true means call user render() func. the same as the following
    // this.render().then(_ => rebuildCalendar(this))
  }
});
XCalendar.HOLIDAYS = [
  {date: '2022-12-25', name: 'Christmas'}
];
XCalendar.IS_SELECTABLE =  date => true ;

export const MiniCalendar = () => /*html*/ `<x-calendar class="small"></x-calendar>`;
export const FullCalendar = () => /*html*/ `<x-calendar date="2022-12-31" multiple="true"></x-calendar>`;