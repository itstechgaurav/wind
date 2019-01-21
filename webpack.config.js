let path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const output = {
    js: "",
    css: "css/main.css"
}

module.exports = (env, args) => {
    let isDev = args.mode === 'development' ? true : false;
    return {
        entry: {
            main: ["./src/scss/main.scss", "./src/js/app.js"],
        },
        output: {
            filename: "js/[name].js",
            path: path.resolve(__dirname, "./dist"),
            publicPath: "/"
        },
        devServer: {
            contentBase: "dist",
            bonjour: true,
            watchContentBase: true
        },
        devtool: isDev ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
            },
                {
                    test: /\.(scss|sass)/,
                    use: [
                        {
                            loader: isDev ? MiniCssExtractPlugin.loader : MiniCssExtractPlugin.loader,
                    },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDev
                            }
                    },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: isDev
                            }
                    },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDev
                            }
                    }
                ]
            },
                {
                    test: /\.(jpg|jpeg|png)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
            }, 
                {
                    test: /\.(ttf|eot|woff|woff2|svg)$/,
                    use: isDev ? "url-loader" : {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]"
                        }
                    }
                }
        ]
        },
        plugins: [
//        new BrotliGzipPlugin({
//                asset: '[path].br[query]',
//                algorithm: 'brotli',
//                test: /\.(js|css|html|svg|ttf|eot|woff|woff2)$/,
////                threshold: 100,
//                minRatio: 0.8,
//                quality: 11
//            }),
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|ttf|eot|woff|woff2|svg)$/,
                threshold: 100,
                minRatio: 0.99
            }),
            new MiniCssExtractPlugin({
                filename: output.css,
            }),
        ]
    }
}
