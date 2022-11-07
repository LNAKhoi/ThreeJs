const path = require('path');

module.exports = {
  entry: './src',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  watch: true,
};