const path = require('path')
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // Webpack 在寻找相对路径的文件时会以 context 为根目录
    context: path.resolve(__dirname, ''),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash:8].js',
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.css$/, // 正则表达式，表示打包.css后缀的文件
            use: [
                MiniCssExtractPlugin.loader, //loader取代style.loader,作用，提取js中的css文件
                'css-loader'
            ],
        },
        { // 图片打包
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
                name: './images/[name].[ext]',
                limit: 8192
            }
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            } // options 在 .babelrc 定义
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name][hash:8].css', //输出的文件名字
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',    //提取出来的文件命名
                    chunks: 'initial',  //initial表示提取入口文件的公共部分
                    minChunks: 2,       //表示提取公共部分最少的文件数
                    minSize: 0          //表示提取公共部分最小的大小
                }
            }
        }
    },
    devServer: {
        hot: true
    }
}