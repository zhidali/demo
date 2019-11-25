const webpack = require("webpack");
const fs = require('fs')
const glob = require('glob')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const forkTs = require('fork-ts-checker-webpack-plugin')

const {CheckerPlugin} = require('awesome-typescript-loader')
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
                // loader: 'ts-loader',
                loader: 'awesome-typescript-loader',
                options: {
                    // 开启失去类型检查
                    transpileOnly: true
                }
            }],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CheckerPlugin()
        // new forkTs()
    ],
    devServer: {
        compress: true,
        port: 8888
    }
}