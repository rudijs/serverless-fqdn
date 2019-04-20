const slsw = require("serverless-webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: slsw.lib.entries,
  // output: set by the plugin
  target: "node",
  optimization: {
    minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })] // mangle false else mysql blow ups with "PROTOCOL_INCORRECT_PACKET_SEQUENCE"
  },
  externals: [
    /aws-sdk/ // Available on AWS Lambda
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {}
        }
      },
      {
        test: /\.sql$/i,
        use: "raw-loader"
      }
    ]
  }
};
