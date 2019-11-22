const webpack = require("webpack");
const fs = require('fs')
const glob = require('glob')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


// 多入口配置，这个函数从 entries 文件夹中读取入口文件，装配成webpack.entry配置
entries = function () {
    const entryFiles = glob.sync('./src/*.ts')
    const map = {}
    entryFiles.forEach((filePath, index) => {
        const filename = 'ts' + index
        map[filename] = filePath
    })
    return map
}
 console.log(entries());
module.exports = {
    // entry: {
    //     index: "./src/index.ts",
    //     index1: "./src/index1.ts"
    // },
    entry: entries(),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].[chunkhash:8].js"
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [{
            test: /\.tsx?$/i,
            use: [{
                loader: 'ts-loader'
            }],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        compress: true,
        port: 8888
    }
}