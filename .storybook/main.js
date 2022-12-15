const path = require('path');

module.exports = {
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
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/html",
  webpackFinal: async (config, { configType: string }) => { // configType: 'DEVELOPMENT' or 'PRODUCTION'

    config.resolve = {
      ...config.resolve,
      fallback: {
          ...(config.resolve || {}).fallback,
          fs: false,
          stream: false,
          os: false,
      },
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "raw-loader",
        // "style-loader", // Creates `style` nodes from JS strings
        // "css-loader",   // Translates CSS into CommonJS
        "sass-loader",   // Compiles Sass to CSS
      ],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
}