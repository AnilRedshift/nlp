const webpack = require('webpack');
const path = require('path');

const getBaseConfig = () => ({
	entry: './src/index',
  mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			}
		]
	},
});

const clientOverrides = {
  target: 'web',
  output: {
    filename: 'nlp.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};

const client = Object.assign({}, getBaseConfig(), clientOverrides);

const serverOverrides = {
  target: 'node',
  output: {
    filename: 'nlp.node.js',
    path: path.resolve(__dirname, 'dist')
  },
};
const server = Object.assign({}, getBaseConfig(), serverOverrides);

module.exports = [client, server];
