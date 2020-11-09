const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [{ loader: "file-loader" }]
      },
      {
        test: /\.svg$/,
        use: [{ loader: "file-loader" }, {loader: "svgo-loader"}]
      },
      {
        test: /\.dot$/,
        use: [
          { loader: "svg-inline-loader" },
          { loader: "svgo-loader" },
          { loader: path.resolve("loaders/dot") },
          { loader: "raw-loader" }
        ]
      },
      {
        test: /node_modules\/mdx-deck-kabisa-theme\/*\.js/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/react", "@babel/env"],
          plugins: []
        }
      }
    ]
  }
};
