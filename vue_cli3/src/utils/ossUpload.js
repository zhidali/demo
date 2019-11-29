
/**
 * @name: 阿里云直传oss 简单上传已可以使用 删除和断点分片上传还未验证 适用于较大文件上传
 * @description: 阿里云直传oss类  api 参考地址：https://help.aliyun.com/document_detail/64047.html?spm=a2c4g.11186623.4.1.1cfc2916EGsgj2
 * @author: 贺伟
 * @date: 2019-11-18
 */
import methods from './common';
let OSS = require('ali-oss');


class OssUpload {
    constructor(conf) {
        // 初始化配置信息
        this.conf = conf;
        // 初始化oss实例
        this.client = new OSS(conf);
        // 定义需要恢复上传的实例
        this.resumeClient = null;
        // 定义断点记录点
        this.tempCheckpoint = '';
    }
    /**
     * 简单上传
     * @param {String} path 上传文件路径，eg:/img/logo.png
     * @param {File Object} file 文件File对象
     * @return {Promise} resolve result
     */
    async putBlob(path, file) {
        try {
            const blob = await methods.transformFileToBlob(file);
            let result = await this.client.put(path, blob);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
    * 删除方法(暂时不可用 需要配置cors 后端)
    * @param {String} path 文件路径
    */
    async delete(path) {
        try {
            let result = await this.client.delete(path);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 上传方法(断点分片上传)
     * @param {String} name  上传的文件路径文件名
     * @param {Object<File>} file HTML5网络文件或file {Blob} Blob的数据格式
     * @param {Object} options 额外参数，可自定义分片大小、上传进度等属性，可参考文档：https://www.alibabacloud.com/help/zh/doc-detail/64047.htm?spm=a2c63.p38356.b99.616.637f386bf7aRyh
     * @return {Object<Promise>} 将上传的结果返回
     */
    async multipartUpload(name, file, options) {
        // 设置默认参数
        const defaultOpt = {
            checkpoint: this.tempCheckpoint,
            progress: async function (percentage, checkpoint) {
                // 断点记录点。 浏览器重启后无法直接继续上传，需用户手动触发进行设置。
                this.tempCheckpoint = checkpoint;
                // 上传百分比
                console.log(percentage);
            }
        };
        Object.assign(defaultOpt, options);
        try {
            let result = await this.client.multipartUpload(name, file, defaultOpt);
            console.log(result);
            return Promise.resolve(result);
        } catch (e) {
            console.log(e);
            return Promise.reject(e);
        }
    }

    // 暂停上传方法
    pauseUpload() {
        this.client.cancel();
    }

    // 恢复上传方法
    async resumeUpload() {
        this.resumeClient = new OSS(this.conf);
        try {
            let result = await this.resumeClient.multipartUpload('object-key', 'local-file', {
                progress: async function (p, checkpoint) {
                    this.tempCheckpoint = checkpoint;
                },
                checkpoint: this.tempCheckpoint,
                meta: {
                    year: 2017,
                    people: 'test'
                },
                mime: 'image/jpeg'
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }
}

export default OssUpload;
