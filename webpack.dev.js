const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require('path')
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
    },
    plugins:[
        new InjectManifest({
            swSrc: path.join(process.cwd(), '/src/sworker.js'),
            swDest: 'wi-sw.js',
            exclude: [
                // /\.map$/,
                // /manifest$/,
                // /\.htaccess$/,
                // /service-worker\.js$/,
                // /sw\.js$/,
                // /\.js$/,
                /[a-zA-z0-9.]*/
            ],
        }),
    ]
});
