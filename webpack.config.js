const path = require('path');

module.exports = async function (env, argv) {
	const config = {};
	config.mode = env.prod ? 'production' : 'development';
	config.watch = true;
	config.optimization = {
		minimize: false
	};
	config.resolve = { fallback: { fs: false } };
	config.entry = {
		sw: path.resolve(__dirname, './src/sw.js'),
		contentScript: path.resolve(__dirname, './src/contentScript.js')
	};
	config.output = {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js'
	};
	config.devtool = 'source-map';

	return config;
};
