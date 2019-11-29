/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

// webpack管理iconfont,支持热更新
const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs')
const dir = 'src/assets/iconfontNew'

let dataUrlDev = 'http://test24backend.comjia.com'
// let dataUrlDev = 'http://testbackendapi.comjia.com'
// let dataUrlDev = 'http://test33backend.comjia.com'
let dataUrlSandBox = '//backend.julive.com'

module.exports = {
    publicPath: process.env.NODE_ENV == 'production' ? '/dist/' : './',
    productionSourceMap: false,
    devServer: {
        port: 8888,
        open: true,
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
            // 配置iconfont
            new WebpackIconfontPluginNodejs({
                fontName: 'icon',
                cssPrefix: 'icon',
                svgs: path.join(dir, 'svgs/*.svg'),
                fontsOutput: path.join(dir, 'fonts/'),
                cssOutput: path.join(dir, 'fonts/font.css')
            }),
            // new webpack.ProvidePlugin({
            //     'BMap': 'BMap'
            // }),
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require('./public/vendor/vendor-manifest.json')
            }),
            new AddAssetHtmlPlugin({
                // dll文件位置
                filepath: path.resolve(__dirname, './public/vendor/*.js'),
                // dll 引用路径
                publicPath: './vendor',
                // dll最终输出的目录
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
