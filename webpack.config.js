module.exports = {
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg)$/,
        use: [{ loader: "file-loader" }]
      }
    ]
  }
};
