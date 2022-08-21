const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const PugPlugin = require('pug-plugin');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        fallback: {
            "fs": false,
            "os": false
        },
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'app'),
        },
        compress: true,
        port: 3000,
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
                test: /\.(png|svg|jpg|jpeg)$/,
                type: 'asset/resource',
            },
            {
                test: /.pug$/,
                use: [
                    'pug-loader'
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
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'src', 'assets'),
                    to: './assets',
                    noErrorOnMissing: true,
                },
            ],
        })
    ]
};
