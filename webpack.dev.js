const webpackMerge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = (webpackConfigEnv, argv) => {
  const config = webpackMerge.merge(common(webpackConfigEnv, argv), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      port: 3000,
      https: false,
    },
  });
  return config;
};
