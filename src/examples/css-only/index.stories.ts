import { customElement } from '@lib';

import {
  buttonCss, 
  tableCss,
  tooltipCss,
  checkboxCss,
  radioCss,
  switchCss 
} from './';

customElement('button', {debug: true, css: buttonCss});
customElement('table', {debug: true, css: tableCss});
customElement('tooltip', {debug: true, css: tooltipCss});
customElement('input-checkbox', {debug: true,  css: checkboxCss});
customElement('input-radio', {debug: true, css: radioCss});
customElement('input-switch', {debug: true,  css: switchCss});

export default {
  title: 'Examples/Css Only'
};

export const Button = () => /*html*/ `
  <h3>Default</h3>
  <button x-style> Default </button>
  <button x-style class="primary"> Primary </button>
  <button x-style class="accent"> Accent </button>
  <button x-style disabled> Disabled </button>
  <button x-style class="no-style"> No Style </button>
  <button x-style class="no-style" disabled> No Style </button>
  
  <h3>Icon</h3>
  <button x-style class="icon">♥</button>
  <button x-style class="icon primary">♥</button>
  <button x-style class="icon accent">♥</button>
  <button x-style class="icon" disabled>♥</button>
  <button x-style class="no-style">♥</button>
  <button x-style class="no-style" disabled>♥</button>
  <x-highlight language="css">${buttonCss}</x-highlight>
`;

export const Tooltip = () => /*html*/ `
  <span data-tooltip-left="This is a left tooltip">Help</span>
  <span data-tooltip="This is a tooltip">Help</span>
  <span data-tooltip="This is a tooltip with focus" tabindex="0">Help</span>
  <br/><br/><br/>
  <x-highlight language="css">${tooltipCss}</x-highlight>
`;

export const Checkbox = () => /*html*/ `
  <label>
    <input x-style type="checkbox" checked/> Hello Checkbox
  </label>
  <x-highlight language="css">${checkboxCss}</x-highlight>
`;

export const Radio = () => /*html*/ `
  <label>
    <input x-style type="radio" name="yes" checked>Yes</x-input>
  </label>
  <label>
    <input x-style type="radio" name="yes">No</x-input>
  </label>
  <br/>
  <label>
    <input x-style type="radio" name="yes2" checked disabled>Yes</x-input>
  </label>
  <label>
    <input x-style type="radio" name="yes2" disabled>No</x-input>
  </label>
  <x-highlight language="css">${radioCss}</x-highlight>
`;

export const Switch = () => /*html*/ `
  <input x-style type="checkbox" role="switch" id="ms1" />
  <label for="ms1">Custom Setting 1</label>

  <br/><br/>
  <label>
    <input x-style type="checkbox" role="switch" checked />
    <span>Custom Setting 2</span>
  </label>

  <br/><br/>
  <label>
    <input x-style type="checkbox" role="switch" disabled />
    <span>Disabled 1</span>
  </label>

  <br/><br/>
  <label>
    <input x-style type="checkbox" role="switch" checked disabled />
    <span>Disabled 2</span>
  </label>
  <x-highlight language="css">${switchCss}</x-highlight>
`;

export const Table = () => /*html*/ `
<table x-style>
  <tr>
    <th>Name</th> <th>Type</th> <th>Data</th> <th>Description</th>
  </tr>
  <tr>
    <td>blur</td> <td>CustomEvent</td> <td></td> <td>Fired when out of focus</td>
  </tr>
  <tr>
    <td>change</td> <td>CustomEvent</td> <td>Object with detail</td> <td>Fired when content changes</td>
  </tr>
  <tr>
    <td>copy</td> <td>CustomEvent</td> <td>Object with detail</td> <td>Fired when contents copied</td>
  </tr>
  <tr>
    <td>focus</td> <td>CustomEvent</td> <td>Focus Event</td> <td>Fired when focused</td>
  </tr>
  <tr>
    <td>load</td> <td>CustomEvent</td> <td>ACE editor instance</td> <td>Fired when starts</td>
  </tr>
  <tr>
    <td>paste</td> <td>CustomEvent</td> <td>Object with detail</td> <td>Fired when contents pasted</td>
  </tr>
</table>
<x-highlight language="css">${tableCss}</x-highlight>
`;

