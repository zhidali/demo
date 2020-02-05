/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

// webpack管理iconfont,支持热更新
const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs')
const dir = 'src/assets/fonts/iconfontNew'

let dataUrlDev = 'http://testbackendapi.comjia.com'
// let dataUrlDev = 'http://testbackendapi.comjia.com'
// let dataUrlDev = 'http://test33backend.comjia.com'
let dataUrlSandBox = '//backend.julive.com'

module.exports = {
    // transpileDependencies: ['element-ui'],
    publicPath: process.env.NODE_ENV == 'production' ? '/dist/' : './',
    productionSourceMap: false,
    devServer: {
        port: 8888,
        open: false,
        proxy: {
            '/backend-api/api-user': {
                target: dataUrlDev,
                changeOrigin: true
            },
            '/backend-api/bk-api-tag-manage': {
                target: dataUrlDev,
                changeOrigin: true
            },
            '/backend-api': {
                target: dataUrlDev,
                changeOrigin: true
            },
            '/send-data': {
                target: 'http://api.comjia.com',
                changeOrigin: true
            },
            '/backend-api/bk-map': {
                target: dataUrlDev,
                changeOrigin: true
            },
            '/backend-api/project': {
                target: dataUrlDev,
                changeOrigin: true
            },
            '/api': {
                target: dataUrlDev,
                changeOrigin: true
            }
        }
    },
    css: {
        extract: false
    },
    configureWebpack: {
        externals: {
            'BMap': 'BMap'
        },
        resolve: {
            extensions: ['.js', '.vue', '.json']
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require('./public/vendor/vendor-manifest.json')
            }),
            // 配置iconfont
            new WebpackIconfontPluginNodejs({
                fontName: 'icon',
                cssPrefix: 'icon',
                svgs: path.join(dir, 'svgs/*.svg'),
                fontsOutput: path.join(dir, 'fonts/'),
                cssOutput: path.join(dir, 'fonts/font.css')
            }),
            // dll文件位置
            // dll文件位置
            // dll最终输出的目录
            new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, './public/vendor/*.js'),
                publicPath: process.env.NODE_ENV == 'production' ? '/dist/vendor': './vendor',
                outputPath: './vendor'
            })
        ]
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', path.join(__dirname, './src'))
    }
}
