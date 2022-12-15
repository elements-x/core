import { customElement  } from "../custom-element";
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
  title: 'customElement()/x-clock'
};

customElement({
  debug: true,
  tagName: 'x-clock',
  css, 
  html,
  attrs: {
    hour: {type: 'number', value: new Date().getHours()},
    minute: {type: 'number', value: new Date().getMinutes()},
    run: {type: 'boolean'}
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

export const File = () => `
  <x-clock run></x-clock>
`