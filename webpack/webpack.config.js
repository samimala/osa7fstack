const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {

  const backend_url = 'http://localhost:3002'

  return {
    entry: ['babel-polyfill','./src/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 3000      
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react'],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      ]
    }
  }
}
module.exports = config
