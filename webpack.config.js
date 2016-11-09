// Modules
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');


/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

const paths = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

module.exports = function makeWebpackConfig() {
    const config = {};

    config.entry = {
        polyfills: path.join(paths.src, 'app', 'polyfills.js'),
        vendor: path.join(paths.src, 'app', 'vendor.js'),
        app: path.join(paths.src, 'app', 'index.js')
    };

    config.output = {
        path: path.join(paths.dist),
        filename: 'js/[name].js',
        publicPath: '/'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'eval-source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    config.module = {
        loaders: [
            {
                test: /\.jsx?$/,
                include: paths.src,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss'])
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            }
        ]
    };


    config.postcss = [
        autoprefixer({
            browsers: ['last 20 version']
        })
    ];

    config.plugins = [
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ];

    config.plugins.push(
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.DedupePlugin(),

        new ExtractTextPlugin('styles/[name].css'),

        new CopyWebpackPlugin([
            {
                from: path.join(paths.src, 'index.html'),
                to: './'
            },
            {
                from: path.join(paths.src, 'assets')
            }
        ])
    );

    if (!isTest) {

    }

    if (isProd) {

    }

    config.devServer = {
        contentBase: './src',
        stats: 'minimal'
    };

    return config;
}();