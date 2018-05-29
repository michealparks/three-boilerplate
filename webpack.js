const {resolve} = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
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
        use: {loader: resolve(__dirname, 'bin/loaders/use-strict.js')}
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
  devtool: 'inline-source-map',
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
    new UglifyJSPlugin({
      parallel: true,
      extractComments: true,
      uglifyOptions: {ie8: false, ecma: 6}
    })
  ]),
  resolve: {
    alias: {
      three$: resolve(__dirname, 'node_modules/three/src/Three.js')
      // math$: resolve(__dirname, '')
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
