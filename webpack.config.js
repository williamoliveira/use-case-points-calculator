/* global __dirname */

// Dependencies
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {

    var outputPath = path.resolve(__dirname, './dist');
    var srcDir = path.resolve(__dirname, './src');
    var servePath = path.resolve(__dirname, './.tmp/serve');

    var webpackConfig = {

        debug: true,

        entry: {
            app: path.join(srcDir, 'app.js')
        },

        //devtool: 'eval', //sourcemap, eval ...
        output: {
            path: outputPath,
            filename: '[name].js'
        },

        module: {

            noParse: '/node_modules/',

            loaders: [

                // Src JS
                {
                    test: /\.js$/,
                    loaders: ['ng-annotate'],
                    include: [srcDir]
                },

                //CSS
                {
                    test: /\.css$/,
                    loaders: ['style', 'css']
                },

                // LESS
                {
                    test: /\.less$/,
                    loaders: ['style', 'css', 'less']
                },

                // HTML Cached (concatenet in js)
                {
                    test: /\.tpl.html$/,
                    loader: 'ngtemplate?relativeTo=' + srcDir + '/!html'
                },

                // HTML
                {
                    test: /\.tpl-async.html$/,
                    loader: 'file-loader?name=tpls/[name].[ext]'
                },

                // Fonts
                {
                    test: /\.(woff|woff2|svg|ttf|eot)([\?]?.*)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },

                // Static Imgs
                {
                    test: /\.jpe?g$|\.gif$|\.png$|\.ico$/,
                    loader: 'file-loader?name=imgs/[name].[ext]'
                },

                // json
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },

        resolve: {
            modulesDirectories: ['node_modules']
        },

        plugins: [

            //Remove duplicates
            new webpack.optimize.DedupePlugin(),

            new HtmlWebpackPlugin({
                pkg      : require('./package.json'),
                template : path.join(srcDir, 'index.html')
            })

        ],

        devServer: {
            contentBase: servePath,
            noInfo: false, //  --no-info option
            hot: false
        }
    };

    if (options.production) {
        webpackConfig.debug = false;
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
    }

    return webpackConfig;

};