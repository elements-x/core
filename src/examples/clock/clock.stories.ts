import { customElement  } from '@lib';
import css from './clock.scss';
import html from './clock.html';

import { 
  getDistance, 
  mouseEventToDeg, 
  degToTime, 
  degToMin,
  updateHourHand,
  updateMinuteHand,
  runClock,
} from './clock.func';

export default {
  title: 'Examples/Clock'
};

customElement('x-clock', {
  debug: true,
  css, 
  html,
  attrs: {
    hour: {type: Number, default: new Date().getHours()},
    minute: {type: Number, default: new Date().getMinutes()},
    run: {type: Boolean}
  },
  connectedCallback() {
    this.dragEndHandler = (function() { this._onDrag = false; }).bind(this);
    document.addEventListener('mouseup', this.dragEndHandler);
    document.addEventListener('touchend', this.dragEndHandler);
  },
  disconnectedCallback() {
    document.removeEventListener('mouseup', this.dragEndHandler);
    document.removeEventListener('touchend', this.dragEndHandler);
  },
  render() {
    this._dragStaPos; // used to check if drag started
    this._dragElId; // dragging hand; hour-hand or minute-hand
    this.addEventListener('mousedown', onDragStart);
    this.addEventListener('mousemove', onDrag);

    this._time = new Date();
    this._time.setHours(this._props.hour);
    this._time.setMinutes(this._props.minute);
    updateHourHand(this);
    updateMinuteHand(this);
    runClock(this);
  },
});

function onDragStart(event) {
  event.preventDefault();
  this._onDrag = true;
  this._dragStaPos = [event.pageX, event.pageY];
  const handEl = event.target.closest('#hour-hand, #minute-hand');
  this._dragElId = handEl && handEl.id;
}

function onDrag(event) {
  event.preventDefault();
  if (!this._onDrag) { return false; }

  const dragEndPos: [number, number] = [event.pageX as number, event.pageY as number];
  const distance = getDistance(this._dragStaPos, dragEndPos);
  const deg = mouseEventToDeg(event, this);
  if (distance && this._dragElId === 'hour-hand') {
    const [h, min] = degToTime(deg);
    const hour = 
      this._time.getHours() === 23 && h === 0 ? 0 :
        this._time.getHours() === 11 && h === 0 ? 12 :
          this._time.getHours() === 12 && h === 11 ? 11 :
            this._time.getHours() === 0 && h === 11 ? 23 : 
              this._time.getHours() >= 12 ? h + 12 : h;
    this._time.setHours(hour);
    this._time.setMinutes(min);
  } else if (distance && this._dragElId === 'minute-hand') {
    const min = degToMin(deg);
    this._time.setMinutes(min);
  }
  updateHourHand(this);
  updateMinuteHand(this);
}

const hour = new Date().getUTCHours();
const minute = new Date().getUTCMinutes();

const demoHTML = /*html*/ `
  <x-clock>My City</x-clock>
  <x-clock run hour="${hour}" minute="${minute}">London</x-clock>
  <x-clock run>Toronto</x-clock>
  <x-clock run hour="${hour + 9}" minute="${minute}">Seoul</x-clock>
  <x-clock run hour="${hour - 8}" minute="${minute}">Vancouver</x-clock>
`;

export const Clock = () => /*html*/ `
  <p>
    An analog clock with given hour and minute.  With run="true", clock runs by itself.
    Updatable hour and minute by dragging hour hand or minute hand.
  </p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML.replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML}<br/>
`;