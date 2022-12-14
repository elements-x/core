const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  staticDirs: ['../public'],
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/html",
  webpackFinal: async (config, { configType: string }) => { // configType: 'DEVELOPMENT' or 'PRODUCTION'

    config.resolve = {
      ...config.resolve,
      plugins: [new TsconfigPathsPlugin()],
      fallback: {
          ...(config.resolve || {}).fallback,
          fs: false,
          stream: false,
          os: false,
      },
    };

    config.module.rules.push(
      { test: /\.scss$/, use: ['raw-loader', 'sass-loader']},
      // sass-loader(Compiles Sass to CSS)
      // css-loader(Translates CSS into CommonJS), 
      // style-loader(Creates `style` nodes from JS strings)
      // raw-loader(for string or binary)
    );

    return config;
  },
}