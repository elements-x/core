import { customElement  } from "../custom-element";
import buttonCss from './button.scss';
import tableCss from './table.scss';
import tooltipCss from './tooltip.scss';
import checkboxCss from './checkbox.scss';
import radioCss from './radio.scss';
import switchCss from './switch.scss';

export default {
  title: 'customElement()/css-only'
};

customElement({debug: true, tagName: 'button', css: buttonCss});
customElement({debug: true, tagName: 'table', css: tableCss});
customElement({debug: true, tagName: 'tooltip', css: tooltipCss});
customElement({debug: true, tagName: 'checkbox', css: checkboxCss});
customElement({debug: true, tagName: 'radio', css: radioCss});
customElement({debug: true, tagName: 'switch', css: switchCss});

export const Button = () => `
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
`;

export const Tooltip = () => `
  <span data-tooltip-left="This is a left tooltip">Help</span>
  <span data-tooltip="This is a tooltip">Help</span>
  <span data-tooltip="This is a tooltip with focus" tabindex="0">Help</span>
`;

export const Checkbox = () => `
  <label>
    <input x-style type="checkbox" checked/> Hello Checkbox
  </label>
`;

export const Radio = () => `
  <label>
    <input x-style type="radio" name="yes" checked>Yes</x-input>
  </label>
  <label>
    <input x-style type="radio" name="yes">No</x-input>
  </label>
`;

export const Switch = () => `
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
`;

export const Table = () => `
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
</table>`;

