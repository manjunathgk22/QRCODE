const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { GenerateSW, InjectManifest } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    plugins: [
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.7,
        }),
        new BrotliPlugin({
            filename: "[path].br[query]",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.7,
        }),
        // new GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true,
        //     exclude: [/\.ico$/],
        //     swDest: "wi-sw.js",
        //     runtimeCaching: [
        //         {
        //             urlPattern: /assets\/*/,
        //             handler: "CacheFirst",
        //             options: {
        //                 cacheName: "wrkind-assets",
        //                 fetchOptions: {
        //                     mode: "cors",
        //                 },
        //                 expiration: {
        //                     maxEntries: 50,
        //                     maxAgeSeconds: 365 * 24 * 60 * 60, // 1year
        //                 },
        //                 cacheableResponse: {
        //                     statuses: [0, 200],
        //                 },
        //             },
        //         },
        //         {
        //             urlPattern: /.*(\.)(js)/,
        //             handler: "CacheFirst",
        //             options: {
        //                 cacheName: "wrkind-js",
        //                 fetchOptions: {
        //                     mode: "cors",
        //                 },
        //                 expiration: {
        //                     maxEntries: 50,
        //                     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        //                 },
        //                 cacheableResponse: {
        //                     statuses: [0, 200],
        //                 },
        //             },
        //         },
        //         {
        //             urlPattern: /.*(\.)(css)/,
        //             handler: "CacheFirst",
        //             options: {
        //                 cacheName: "wrkind-css",
        //                 fetchOptions: {
        //                     mode: "cors",
        //                 },
        //                 expiration: {
        //                     maxEntries: 50,
        //                     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        //                 },
        //                 cacheableResponse: {
        //                     statuses: [0, 200],
        //                 },
        //             },
        //         },
        //         {
        //             urlPattern: /api/,
        //             // Apply a network-first strategy.
        //             handler: "NetworkFirst",
        //             options: {
        //                 // Fall back to the cache after 5 seconds.
        //                 networkTimeoutSeconds: 5,
        //                 // Use a custom cache name for this route.
        //                 cacheName: "wrkind-api",
        //                 // Configure custom cache expiration.
        //                 expiration: {
        //                     maxEntries: 10,
        //                     maxAgeSeconds: 86400,
        //                 },
        //                 // Configure which responses are considered cacheable.
        //                 cacheableResponse: {
        //                     statuses: [0, 200],
        //                 },
        //                 matchOptions: {
        //                     ignoreSearch: true,
        //                 },
        //             },
        //         },
        //     ],
        //     cleanupOutdatedCaches: true,
        // }),
        new InjectManifest({
            swSrc: path.join(process.cwd(), '/src/sworker.js'),
            swDest: 'wi-sw.js',
            exclude: [
                /\.map$/,
                /manifest$/,
                /\.htaccess$/,
                /sworker\.js$/,
                /\.js$/,
            ],
        }),
        new WebpackPwaManifest({
            name: "Workindia",
            short_name: "Workindia",
            description: "Workindia",
            background_color: "#ffffff",
            crossorigin: "use-credentials", //can be null, use-credentials or anonymous
            icons: [
                {
                    src: path.resolve("src/assets/wi_icon.png"),
                    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                },
            ],
        }),
    ],
    optimization: {
        moduleIds: "hashed",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    chunks: "all",
                    name: "vendor",
                    test: /node_modules/,
                },
                //CREATE MULTIPLE VENDORS (if size > 243Kb)
                // 'vendor-react': {
                //     name: 'vendor-react',
                //     test: /[\\/]node_modules[\\/]react.*?[\\/]/,
                //     chunks: 'initial',
                //     priority: 1
                // },
                common: {
                    name: "common",
                    minChunks: 2,
                    chunks: "async",
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true,
                },
            },
        },
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
            }),
        ],
    },
});
