const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const distPath = "/dist";
const relativeIllustrationsDistPath = "/illustrations";

const sourcePath = path.resolve(__dirname, "src");
const baseComponentsPath = path.resolve(__dirname, "src", "BaseComponents");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
    mode: mode,

    devtool: "source-map",

    output: {
        publicPath: "/",
        path: __dirname + distPath,
        filename: "[name].js",
    },

    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".json", "css", ".scss"],

        fallback: {
            os: require.resolve("os-browserify/browser"),
            http: false,
            https: require.resolve("https-browserify"),
            crypto: require.resolve("crypto-browserify"),
        },

        // keep in sync with tsconfig.json
        alias: {
            Source: sourcePath,
            BaseComponents: baseComponentsPath,
            Pages: path.resolve(__dirname, "src", "Pages"),
            Illustrations: path.resolve(__dirname, "src", "Illustrations"),
            Utils: path.resolve(__dirname, "src", "Utils"),
            State: path.resolve(__dirname, "src", "State"),
            process: "process/browser",
        },
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: `..${distPath + relativeIllustrationsDistPath}`,
                },
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
        ],
    },

    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],

    devServer: {
        static: path.resolve(__dirname + distPath),

        // Enable client side routing
        historyApiFallback: true,
    },
};
