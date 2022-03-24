const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'eval-source-map',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
};