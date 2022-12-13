import { customElement } from "./custom-element";

export default {
  title: 'customElement()/Calendar'
};

const XCalendar = customElement({
  tagName: 'x-calendar',
  debug: true,
  html: `
  `,
  css: `
  `,
  attrs: {
  },
  props : {
  },
  render: (args) => {
  }
});


export const Calendar = () => `<x-calendar></x-calendar>`;