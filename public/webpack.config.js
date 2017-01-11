var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
var bower_components_dir = "./bower_components/";
var node_modules_dir = "../node_modules/";
module.exports = {
    debug: true,

    entry: {
        main: [
            "./app.js"
        ],
        vendor: [
            bower_components_dir + 'jquery/dist/jquery.min',
            bower_components_dir + 'angular/angular.min',
            bower_components_dir + 'angular-ui-router/release/angular-ui-router',
            bower_components_dir + 'ocLazyLoad/dist/ocLazyLoad.min',
            bower_components_dir + 'angular-resource/angular-resource',
            bower_components_dir + 'nprogress/nprogress'
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
                ]
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },

    resolve: {
        modulesDirectories: [
            'node_modules',
            'app/vendor',
            'bower_components'
        ],
        alias: {
            jquery: "jquery/dist/jquery.min"
        }
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     warnings: false,
        //     mangle: {
        //         except: ['$q', '$ocLazyLoad']
        //     },
        //     sourceMap: false
        // }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName= */"vendor",
            /* filename= */"vendor.bundle.js"
        ),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devServer: {
        address: '111.111.111.111',
        port: 3000,
        proxy: {
            '/accedoapi': {
                target: 'https://demo2697834.mockable.io',
                secure: false,
                pathRewrite: {
                    '/accedoapi' : ''
                }
            }
        }
    }
};