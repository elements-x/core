function cumulativeOffset(element: HTMLElement): {x:number, y:number} {
  let y = 0, x = 0;
  do {
    y += element.offsetTop  || 0;
    x += element.offsetLeft || 0;
    element = element.offsetParent as HTMLElement;
  } while(element);

  return {x, y};
};

export function getDistance(a: [number, number], b: [number, number]): number {
  return Math.sqrt(
    Math.pow( (a[0] - b[0]) ,2) +
    Math.pow( (a[1] - b[1]) ,2)
  );
};

export function mouseEventToDeg(event: MouseEvent, box: HTMLElement): number {
  const offset = cumulativeOffset(box);
  const [centerX, centerY] = [
    offset.x + box.offsetWidth / 2, 
    offset.y + box.offsetHeight / 2
  ];

  const atan2 = Math.atan2(
    event.pageX - centerX, 
    (event.pageY - centerY) * -1
  );
  const deg = atan2 * (180 / Math.PI );  
  return deg;
}

export function degToTime(deg: number): [number, number] {
  const deg2 =  deg < 0 ? (180+deg) + 180 : deg;
  const hour = Math.floor(deg2 / 30);  // 1 hour = 30 deg.
  const min = (Math.floor(deg2) % 30) * 2;

  return [hour, min];
}

export function degToMin(deg: number): number {
  const deg2 =  deg < 0 ? (180+deg) + 180 : deg;
  return Math.floor(deg2 / 6);
}

export function updateHourHand(clockEl) {
  const [hour, min] = [clockEl._time.getHours(), clockEl._time.getMinutes()];
  const hourDeg = ((hour % 12) * 60) / 2; 
  const minDeg = (min/60) * (360/12); // 1 hour 30 deg
  const deg = hourDeg + minDeg;
  const hourHand = clockEl.querySelector('#hour-hand');
  const digitalText = clockEl.querySelector('#digital-text');
  const displayTime =
    clockEl._time.toLocaleTimeString('en-US', {hour12: 0, hourCycle: 'h23'}).replace(/^24/,'00');

  hourHand.setAttribute('transform',`rotate(${deg})`);
  digitalText.textContent = displayTime;

  const event = new CustomEvent('select', {bubbles: true, detail: clockEl._time});
  clockEl.dispatchEvent(event);
}

export function updateMinuteHand(clockEl) {
  const min = clockEl._time.getMinutes();
  const deg =  360/60 * min; // 1 min 6 deg
  const minuteHand = clockEl.querySelector('#minute-hand');

  if (clockEl._onDrag) {
    const inc = 
      clockEl._prevMin === 59 && min === 0 ? 1 :
      clockEl._prevMin === 0 && min === 59 ? -1 : 0;
    clockEl._time.setHours(clockEl._time.getHours() + inc);      
  }

  minuteHand.setAttribute('transform',`rotate(${deg})`);
  clockEl._prevMin = min;
}

export function runClock(clockEl) {
  if (!clockEl._props.run) return;

  const minuteHand = clockEl.querySelector('#minute-hand');
  const secondHand = clockEl.querySelector('#second-hand');
  const digitalText = clockEl.querySelector('#digital-text');
  secondHand.setAttribute('transform',`rotate(${360/60 * clockEl._time.getSeconds()})`);

  setInterval(_ => {
    clockEl._time.setSeconds(clockEl._time.getSeconds() + 1);
    const secDeg =  6 * clockEl._time.getSeconds(); // 1 min 6 deg
    secondHand.setAttribute('transform',`rotate(${secDeg})`);
    if (secDeg === 360) {
      const minDeg = 6 * clockEl._time.getMinutes(); 
      minuteHand.setAttribute('transform',`rotate(${minDeg})`);
    }
    const displayTime =
      clockEl._time.toLocaleTimeString('en-US', {hour12: 0, hourCycle: 'h23'}).replace(/^24/,'00');
    digitalText.textContent = displayTime;
  }, 1000);
}
