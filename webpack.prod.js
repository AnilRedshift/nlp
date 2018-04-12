const configs = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

configs.forEach((config) => {
  config.mode = 'production';
  config.plugins = config.plugins.concat([new UglifyJsPlugin()]);
});

module.exports = configs;
