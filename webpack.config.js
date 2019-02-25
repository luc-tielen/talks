module.exports = {
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg)$/,
        use: [{ loader: "file-loader" }]
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
