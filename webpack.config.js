const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'bundle.css',
});

const jsLoader = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env'],
    },
  },
};

const lessLoader = {
  test: /\.less$/,
  use: extractSass.extract({
    use: [{
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
    }],
  }),
};

const vueLoader = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    extractCSS: true,
  },
};

const fileLoader = {
  test: /\.svg$/,
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
    outputPath: 'public/',
  },
};

const widgetBundle = {
  entry: path.resolve(__dirname, 'widget/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'widget/dist'),
  },
  module: {
    rules: [jsLoader, lessLoader, vueLoader, fileLoader],
  },
  plugins: [
    extractSass,
  ],
};

const creatorBundle = {
  entry: path.resolve(__dirname, 'widget/src/creator.js'),
  output: {
    filename: 'exchange-widget.js',
    path: path.resolve(__dirname, 'widget/dist'),
  },
  module: {
    rules: [jsLoader],
  },
};

module.exports = [widgetBundle, creatorBundle];
