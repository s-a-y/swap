const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'bundle.css',
});

const widgetBundle = {
  entry: path.resolve(__dirname, 'widget/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'widget/dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
    }, {
      test: /\.less$/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }],
      }),
    }],
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
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
    }],
  },
};

module.exports = [widgetBundle, creatorBundle];
