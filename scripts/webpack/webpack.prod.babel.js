/**
 * Webpack config for building individual packages for distribution
 */
/* eslint no-sync:0 */

import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackBaseConfig from './webpack.base.babel';

const plugins = [];

// Bundle paths are used for demos only
let scriptBundle, styleBundle;
if (process.env.BUILD_BUNDLE_PUBLIC_PATH) {
  scriptBundle = `<script src="${process.env.BUILD_BUNDLE_PUBLIC_PATH}bundle.js"></script>`;
  styleBundle = `<link rel="stylesheet" href="${process.env.BUILD_BUNDLE_PUBLIC_PATH}main.css">`;
}

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
      template: `./index.html`,
      bundlePaths: {
        scriptBundle,
        styleBundle
      }
    })
  );
}

const publicPath = process.env.BUILD_PUBLIC_PATH;

export default webpackBaseConfig({
  entry: `./index.js`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(process.cwd(), `dist`),
    sourceMapFilename: `[file].map`,
    publicPath
  },
  // Full source maps for production debugging
  plugins
});
