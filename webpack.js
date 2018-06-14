const {resolve} = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const __dev__ = process.env.NODE_ENV === 'development'

const config = {
  target: 'electron-renderer',
  mode: __dev__ ? 'development' : 'production',
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: {loader: resolve(__dirname, 'bin/loaders/glsl.js')}
      }, {
        test: /\.js$/,
        include: /src|node_modules\/three/,
        use: [
          {
            loader: resolve(__dirname, 'bin/loaders/use-strict.js')
          }, {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['transform-react-jsx', {pragma: 'h', useBuiltIns: true}],
                ['transform-react-constant-elements', {allowMutablePropsOnTags: []}],
                'syntax-jsx'
              ],
              // presets: __dev__ ? [] : [['minify', {
              //   booleans: false,
              //   infinity: false,
              //   removeConsole: true,
              //   removeDebugger: true,
              //   simplifyComparisons: false,
              //   undefinedToVoid: false
              // }]]
            }
          }
        ]
      }, {
        test: /\.wasm$/,
        use: {loader: resolve(__dirname, 'bin/loaders/wasm.js')}
      }
    ]
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  devtool: __dev__ ? 'inline-source-map' : false,
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      '__root__': JSON.stringify(__dirname),
      '__dev__': process.env.NODE_ENV === 'development',
      '__darwin__': process.platform === 'darwin',
      '__linux__': process.platform === 'linux',
      '__win32__': process.platform === 'win32',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__version__': JSON.stringify(require('./package.json').version),
      '__noop__': '() => {}'
    })
  ].concat(__dev__ ? [] : [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        ecma: 6,
        warnings: true,
        compress: {
          drop_console: true,
          ecma: 6,
          keep_infinity: true,
          // investigate
          toplevel: true,
          passes: 2,
          // Some code runs faster in the Chrome V8 engine if this option is disabled
          reduce_funcs: false
        }
      }
    })
  ]),
  resolve: {
    alias: {
      three$: resolve(__dirname, 'node_modules/three/src/Three.js')
    }
  }
}

const report = (err, stats) => {
  if (err) console.error(err)
  if (stats) console.log(stats.toString({chunks: false, colors: true}))
}

if (__dev__) {
  webpack(config).watch({ignored: /node_modules/}, report)
} else {
  webpack(config).run(report)
}
