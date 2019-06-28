const path = require('path');
const MonacoWebpackPlugin = require( 'monaco-editor-webpack-plugin' );
var outputPath = path.resolve( __dirname, 'Client-Release' );

module.exports = {
  mode: 'development',
  entry: {
    bundle: './build/app.js'
  },
  output: {
    globalObject: 'self',
    filename: 'bundle.js',
    path: outputPath,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new MonacoWebpackPlugin( {
      languages: ['javascript', 'typescript', 'html', 'css']
    })
  ]
};