const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// For simplicity, support development only
// And not include any optimization
const mode = 'development';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (webpackConfigEnv, argv) => {
  return {
    mode,
    entry: path.resolve(process.cwd(), 'src/index.tsx'),
    output: {
      filename: 'static/js/bundle.js',
      // libraryTarget: "system",
      path: undefined,
      jsonpFunction: `webpackJsonp_carousel`,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
          },
        },
        {
          test: /\.(scss|sass|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          sideEffects: true,
        },
        {
          test: /\.(png|jpe?g|gif|woff(2)?|ttf|eot|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    devtool: 'sourcemap',
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      disableHostCheck: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: resolveApp('public/index.html'),
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.wasm', '.json', '.web.ts', '.web.tsx'],
      alias: {
        '~': resolveApp('src'),
      },
    },
  };
};
