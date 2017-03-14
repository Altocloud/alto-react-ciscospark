/**
 * Webpack config for building individual packages for distribution
 */
/* eslint no-sync:0 */

import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackBaseConfig from './webpack.base.babel';

const plugins = [];

// Only create html file when one exists in src/
if (fs.existsSync(`./src/index.html`)) {
  plugins.push(
    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        collapseWhitespace: false,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true
      },
      template: `./index.html`
    })
  );
}

export default webpackBaseConfig({
  entry: `./index.js`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(process.cwd(), `dist`)
  },
  // Full source maps for production debugging
  plugins
});
