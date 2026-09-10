const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",

  output: {
    publicPath: "auto",
    filename: "[name].js",
    clean: true,
    crossOriginLoading: "anonymous",
  },

  devServer: {
  port: 3001,
  static: {
    directory: path.join(__dirname, "public"),
  },
  headers: {
    "Access-Control-Allow-Origin": "*", // ✅ REQUIRED
  },
},

  module: {
    rules: [
      {
        test: /\.js$/,   // 👈 also fixing your regex
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductList": "./src/ProductList",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};