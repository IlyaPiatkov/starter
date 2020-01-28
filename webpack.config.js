const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const config = {
  output: {
    publicPath: '/frontend/public/static/js/',
    // filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js',
    filename: isDevelopment ? '[name].js' : '[name].js',
  },

  watch: isDevelopment,

  devtool: isDevelopment ? 'cheap-module-inline-source-map' : 'source-map',

  mode: isDevelopment ? 'development' : 'production',

  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'app/js'),
      use: {
        loader: 'babel-loader',
      },
    },],
  },

  plugins: [
    new AssetsPlugin({
      filename: 'webpack.json',
      path: './manifest',
    })
  ],
}

module.exports = config