/// <binding ProjectOpened='Watch - Development' />
const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );

var MonacoExtractText = new ExtractTextPlugin( 'monaco.css', { allChunks: true } );
var LessExtractText = new ExtractTextPlugin( 'core.css', { allChunks: true } );

const SpeedMeasurePlugin = require( "speed-measure-webpack-plugin" );
const smp = new SpeedMeasurePlugin();

var outputPath = path.resolve( __dirname, 'Client-Release' );

module.exports = smp.wrap({
  mode: 'development',
  entry: {
    bundle: './build/app.ts' // must be single entry for single page app, or we'll get multiple copies of dependancies (i.e. Angular/React)
  },
  optimization: {
    splitChunks: {
      // filtering all node_module dependancies to their own file
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          priority: -10
        }
      }
    }
  },
  output: {
    path: outputPath,
    // Adding a chunkhash is an option for cache busting, however need to solve how this gets into the cshtml file: filename: '[name].[chunkhash].js',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      // reroute jquery-ui onto compiled source
      'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
    },
    modules: [
      path.resolve( __dirname, 'node_modules' ),
      path.resolve( __dirname, './' ) // allows resharper's dependancy mapping to route to work
    ]
  },
  module: {
    rules: [
      {
        // js file processing
        test: /.*\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react']
            }
          }
          //{
          //  loader: 'awesome-typescript-loader'
          //}
        ]
      },
      {
        // Html imports only currently used for TS files as JS files map 
        // directly to build path and not currently included in webpack
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        // TS conversion using the angular2 template loading to import the html 
        // files into webpack
        test: /Client.*\.ts$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve( __dirname, 'tsconfig.json' ),
              useCache: true
            }
          }
        ]
      },
      {
        // style processing
        test: /\.less$/,
        exclude: /node_modules/,
        use: LessExtractText.extract( {
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]',
                importLoaders: 1
              }
            },
            {
              loader: 'less-loader',
              options: {
                //strictMath: true, // conflicts with bootstraps span generation
                noIeCompat: true
              }
            }
          ]
        } )
      },
      {
        // style processing
        test: /\.css$/,
        include: /monaco/,
        use: MonacoExtractText.extract( {

          fallback: 'style-loader',
          use: ['css-loader']
          //use: [
          //  {
          //    loader: 'css-loader',
          //    options: {
          //      modules: true,
          //      localIdentName: '[local]',
          //      importLoaders: 1
          //    }
          //  }]
        } )
      },
      {
        // Font processing
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, // Match woff2 in addition to patterns like .woff?v=1.1.1.
        use: {
          loader: "url-loader",
          options: {
            // Limit at 50k. Above that it emits separate files
            limit: 50000,

            // url-loader sets mimetype if it's passed.
            // Without this it derives it from the file extension
            mimetype: "application/font-woff",

            // Output below fonts directory
            name: "./fonts/[name].[ext]",
          }
        }
      },
      {
        // Image processing
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              //bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  plugins: [
    MonacoExtractText,
    LessExtractText,
    new webpack.ProvidePlugin( {
    } ),
    new CopyPlugin( [
      { from: 'node_modules/jquery/dist/jquery.js', to: outputPath },
      { from: 'node_modules/signalr/jquery.signalR.js', to: outputPath }
    ] )
  ],

  externals: {
    'jQuery': 'jQuery',
    'window.jquery': 'jQuery',
    'jquery': 'jQuery',
    '$': 'jQuery'
  },

  stats: { children: false }
});