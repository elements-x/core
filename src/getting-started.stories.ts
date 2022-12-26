import { customElement } from "./lib/custom-element";

export default {
  title: 'Getting Started'
};

export const GettingStarted = () => {
  return /*html*/ `
    <p>
      <code>@elements-x</code> is available as the <code>@elements-x/core</code> package via npm.
    </p>

    <x-highlight language="shell">
      $ npm i @elements-x/core
    </x-highlight>

    <p>
      Then import into JavaScript or TypeScript files:
      Now you can use the custom element in any HTML, with any framework or none at all. 
    </p>
    <x-highlight language="shell">
      import { customElement } from '@elements-x/core';
    </x-highlight>

    <table x-style="true">
      <tr>
        <td>
          <div class="head">Without customElement() - Lit JS Example</div>
          <x-highlight>
            import {html, css, LitElement} from 'lit';
            import {customElement, property} from 'lit/decorators.js';

            @customElement('hello-custom-element')
            export class HelloCustomElement extends LitElement {
              static styles = 
                css\x60hello-custom-element { color: red; }\x60;

              @property({ attribute: 'hello' })
              hello = 'Hello';
              @property({ attribute: 'world' })
              world = 'World';

              render() {
                return html\x60&lt;h1>\$\{hello} \$\{world}&lt;/h1>\x60;
              }
            }
          </x-highlight>
          A generic way without using a web component library such as Lit JS is much more 
          compoicated than the above code to handle reactive property, css styling, and 
          observable attributes.
        </td>
        <td>
          <div class="head">With customElement()</div>
          <x-highlight>
            import {customElement} from '@elements-x/core';

            customElement('hello-custom-element', {
              html: '&lt;h1>{{hello}} {{world}}&lt;/h1>',
              css:  'hello-custom-element { color: red; }',
              attrs : {
                hello: 'Hello',
                world: 'Custom Element'
              }
            });
          </x-highlight>
        </td>
      </tr>
    </table>

    <p class="pt-4">
    For more practical use of custom element, saying you know how to use Openlayers, 
    and you want to wrap Openlayers functionality to a simple map as a &lt;x-map> tag.
    </p>

    The folowing is the process of showing an Openlayers map.
    <ol>
      <li>Load Openlayers css and Javascript.</li>
      <li>Initiazlie an Openlayers map to an element.</li>
      <li>Add graphic layers to the map</li>
      <li>Update center/zoom of the map from attribute</li>
    </ol>
    
    <p>
      The following 20 lines of code would be enough to show an Openlayers map.
      For demo. of this code, please visit <a href="/?path=/story/examples-map--map">this example</a>.
    </p>
    <x-highlight>
      customElement('x-map', {
        await: () => waitForScriptLoad('ol', [
          'https://cdn.jsdelivr.net/npm/ol@v7.2.2/dist/ol.js',
          'https://cdn.jsdelivr.net/npm/ol@v7.2.2/ol.css'
        ]),
        css: 'x-map {display: block; height: 300px;}',
        attrs: {
          center: 'Brampton Ontario, Canada',
          zoom: {type: Number, default: 11}
        },
        async connectedCallback() {
          const lonLat = await getLonLat(this._props.center);
          const map = new window.ol.Map({ target: this });
      
          map.addLayer(new window.ol.layer.Tile({source: new window.ol.source.OSM()}));
          map.getView().setCenter(window.ol.proj.fromLonLat(lonLat));
          map.getView().setZoom(this._props.zoom);
        }
      });
    </x-highlight>
  `
};



