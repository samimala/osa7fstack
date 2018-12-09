const path = require('path')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
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
module.exports = config