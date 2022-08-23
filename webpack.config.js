const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const miniSVGDataURI = require('mini-svg-data-uri');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'project-name.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        fallback: {
            "fs": false,
            "os": false,
            "path": require.resolve("path-browserify"),
            "assert": require.resolve("assert/")
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
                    generator: {
                         dataUrl(content) {
                           content = content.toString();
                           return miniSVGDataURI(content);
                         }
                   },
                use: 'svgo-loader'
            },
            {
                test: /\.(png|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ]
};


// node ./node_modules/.bin/webpack
