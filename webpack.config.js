const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractStyles = new ExtractTextPlugin({
  filename: 'bundle.css',
});

const uglifyJS = new UglifyJSPlugin();

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
  use: extractStyles.extract({
    use: [{
      loader: 'css-loader',
      options: {
        minimize: true,
      },
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
    extractStyles,
    uglifyJS,
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
  plugins: [
    uglifyJS,
  ],
};

module.exports = [widgetBundle, creatorBundle];
