/**
 * In development we assume that the code generated is going to be consumed by
 * webpack dev server and we are bundling into a single js file.
 */

import webpack from 'webpack';
import webpackConfigBase from './webpack.base.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const plugins = [
  new HtmlWebpackPlugin({
    template: `index.html`
  }),
  new webpack.EnvironmentPlugin([
    `CISCOSPARK_ACCESS_TOKEN`,
    `CISCOSPARK_CLIENT_ID`,
    `CISCOSPARK_CLIENT_SECRET`
  ])
];

export default webpackConfigBase({
  entry: `./altocloud-demo.js`,
  plugins,
  devtool: `cheap-module-eval-source-map`,
  devServer: {
    port: 8000,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    }
  }
});
