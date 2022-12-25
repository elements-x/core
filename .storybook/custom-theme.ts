import { create } from '@storybook/theming';

const primary =  '#3751B5';
const secondary = '#D13101';
const lightBg = '#FAFAFA';
const lightBgText = '#202020';
const lightBgText2 = '#3F3F3F';
const lightBgLightText = '#707070';
const darkBg = '#202020';
const darkBgText = '#FFFFFF';
const darkBgLightText = '#707070';
const accentBg = '#FFDF6C';
const accentText = '#202020';
const accentLightText = '#707070';

export default create({
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  base: 'light',
  colorPrimary: lightBgText, 
  colorSecondary: lightBgText2,

  // UI
  appBg: lightBg,
  appContentBg: '#FFFFFF',
  appBorderColor: lightBgLightText,
  appBorderRadius: 4,
  // layoutMargin: 10,

  // Text colors
  textColor: lightBgText,
  textInverseColor: darkBgLightText,

  // Toolbar default and active colors
  barBg: primary, 
  barTextColor: '#CCCCCC',
  barSelectedColor: darkBgText,

  // Form colors
  inputBg: lightBg,
  inputBorder: '#CCCCCC',
  inputTextColor: lightBgText,
  inputBorderRadius: 4,
  // buttonBg: '#CCCCCC',
  // buttonBorder: 4,
  // booleanBg: lightBgText2,
  // booleanSelectedBg: '#FFFFFF',

  // Brand
  brandTitle: 'The simplest custom elements library',
  brandUrl: '/',
  brandImage: '/logo.png',
  brandTarget: '_self',
});