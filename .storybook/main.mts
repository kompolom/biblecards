import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-webpack5';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  async webpackFinal(config) {
    // @ts-ignore
    config.resolve.plugins = config.resolve?.plugins || [];
    // @ts-ignore
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      })
    );

    return config;
  },

  docs: {
    autodocs: true
  }
}

export default config;