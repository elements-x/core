import { customElement, waitForScriptLoad  } from '@lib';

export default {
  title: 'Examples/Map'
};

function getLonLat(address) {
  return new Promise( resolve => {
    if (typeof address === 'string' && address.match(/[-0-9.]+,\s?[-0-9.]+/)) { //'-99.99, 99'
      const lonLat = address.split(',').map(el => +(el.trim()));
      resolve(lonLat);
    } else if (typeof address === 'string') {
      const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;
      window.fetch(url).then(resp => resp.json())
        .then(resp => {
          const lonLat = resp[0] ? [resp[0].lon, resp[0].lat] : [0,0];
          resolve(lonLat);
        });
    }
  });
}

const js = /*javascript*/ ` 
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
`;

const demoHTML = (args?) => /*html*/ `
  <x-map zoom="${args?.zoom}" center="${args?.center}"></x-map>
`;

new Function('customElement', 'waitForScriptLoad', 'getLonLat', js)
  (customElement, waitForScriptLoad, getLonLat);

const Template = (args) => /*html*/ `
  <p>OpenLayers Map</p>

  <h2 class="fs-5">HTML:</h2>
  <x-highlight language="html">${demoHTML(args).replace(/</g, '&lt;')}</x-highlight>

  <h2 class="fs-5">Result:</h2>
  ${demoHTML(args)}<br/><br/>

  <h2 class="fs-5">Javascript:</h2>
  <x-highlight>${js.replace(/</g, '&lt;')}</x-highlight>
`;

export const Map = Template.bind({});
Map.args = {
  zoom: 11,
  center: 'Brampton Ontario, Canada'
}