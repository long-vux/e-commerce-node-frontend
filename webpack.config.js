// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    setupMiddlewares: (middlewares, devServer) => {
      middlewares.push({
        name: 'my-middleware',
        path: '/api',
        middleware: (req, res, next) => {
          console.log('My middleware is running!');
          next();
        },
      });
      return middlewares;
    },
  },
};