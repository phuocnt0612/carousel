const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common');

const shouldUseSourceMap = true;

module.exports = (webpackConfigEnv, argv) => {
  const withoutCompress = webpackConfigEnv && webpackConfigEnv.withoutCompress === 'true';
  const plugins = [];
  if (!withoutCompress) {
    plugins.push(
      new CompressionPlugin({
        test: /\.(js)$/i,
        filename: '[file][query]',
        algorithm: 'gzip',
        deleteOriginalAssets: true,
      }),
    );
  }

  const config = merge(common(webpackConfigEnv, argv), {
    mode: 'production',
    bail: true,
    devServer: {
      port: 3002,
      https: true,
    },
    devtool: shouldUseSourceMap ? 'source-map' : false,
    plugins,
  });
  return config;
};
