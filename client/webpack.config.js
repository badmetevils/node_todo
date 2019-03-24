const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules\/(?!(query-string|strict-uri-encode)\/).*/,
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                url: false,
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [new ExtractTextPlugin('styles.css'), new Dotenv({ path: path.resolve(__dirname, './.env') })],
  devServer: {
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'public')],
    inline: true,
    port: 5000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
