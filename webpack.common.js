const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const AsyncChunkNames = require("webpack-async-chunk-names-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
var webpack = require('webpack');

module.exports = {
    entry: {
        app: ["babel-regenerator-runtime", "./src/index.js"],
    },
    plugins: [
        new webpack.ProvidePlugin({
            h: ['preact', 'h'],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html",
            filename: "index.html",
            inject: "body",
        }),
        new AsyncChunkNames(),
        // new BundleAnalyzerPlugin(),
        
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".jsx"],
        "alias": {
            "react": "preact/compat",
            "react-dom": "preact/compat"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use:[{
                    loader: 'string-replace-loader',
                    options: {
                        search: '__STATIC__',
                        replace: process.env.NODE_ENV === 'development'? 'http://localhost:2017/':'prod here',
                        flags: 'g'
                    }
                },{
                    loader: "babel-loader",
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: "file-loader?name=assets/[name].[ext]!static",
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                            //hmr: process.env.NODE_ENV === 'development',
                        },
                    },

                    {
                        loader: "css-loader",
                    },
                    { loader: "sass-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [autoprefixer({})],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader:
                    "file-loader?limit=10000&name=assets/[name].[contenthash].[ext]",
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
};
