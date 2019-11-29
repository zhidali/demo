import moment from 'moment'
import config from './config'
import {
    axios
} from './axios'
const OSS = require('ali-oss')
class Methods {
    install(Vue, options) {
        this.installPrototype(Vue)
        this.filters(Vue)
    }
    /* ------------------添加vue实例方法------------------ */
    installPrototype(Vue) {
        /**
         * 上传文件
         * @param url 文件对象
         * @param dir 文件目录名
         * @param option 文件具体 file 文件 needUrl 需要文件完整路径
         * @returns {Promise.<TResult>}
         */
        Vue.prototype.ossUploadFile = (option, dir) => {
            return new Promise((resolve, reject) => {
                let file = option.file
                let date = moment().format('YYYYMMDD') // 当前时间
                let dateTime = moment().format('YYYYMMDDhhmmss') // 当前时间
                let randomStr = Vue.prototype.randomString(4) //  4位随机字符串
                let extensionName = file.name.substr(file.name.indexOf('.')) // 文件扩展名
                let fileName = '/' + dir + '/' + date + '/' + dateTime + '_' + randomStr + extensionName // 文件名字（相对于根目录的路径 + 文件名）
                // 执行上传
                Vue.prototype.createOssClient(dir).then(client => {
                    // 上传处理
                    // 分片上传文件
                    client.multipartUpload(fileName, file, {
                        progress: function (p) {
                            let e = {}
                            e.percent = Math.floor(p * 100)
                            if (option.onProgress) {
                                option.onProgress(e)
                            }
                        }
                    }).then((val) => {
                        if (val.res.statusCode === 200) {
							if(option.needUrl){
								val.res.requestUrls[1]=val.res.requestUrls[0].split('?')[0]
							}
                            if (val.res.requestUrls[0].indexOf('?') > -1) {
                                val.res.requestUrls[0] = '/' + dir + val.res.requestUrls[0].split('?')[0].split('/' + dir)[1]
                            } else {
                                val.res.requestUrls[0] = '/' + dir + val.res.requestUrls[0].split('/' + dir)[1]
                            }
                            if (option.onSuccess) {
                                option.onSuccess(val)
                            } else {
                                console.log('上传成功')
							}
                            resolve(val.res.requestUrls)
                        } else {
                            console.log('上传失败')
                        }
                    }, err => {
                        console.log('上传失败')
                        reject(err)
                    })
                })
            })
        };
		/**
		 * 创建阿里云oss 实例
		 */
		Vue.prototype.createOssClient = (dir) => {
			let client
			return new Promise((resolve, reject) => {
				axios.post('/backend-api/bk-api-upload/get-upload-sign', {
						cate: '/' + dir
					})
					.then(res => {
						let region = ''
						let bucket = ''
						let mockData = res.data
						if (mockData.data.host !== '') {
							bucket = mockData.data.host.split('.')[0].split('//')[1]
							region = mockData.data.host.split('.')[1]
						}
						client = new OSS({
							region: region,
							accessKeyId: config.OSS_ACCESS_ID,
							accessKeySecret: config.OSS_ACCESS_KEY,
							policy: mockData.data.policy,
							signature: mockData.data.signature,
							bucket: bucket
						})
						resolve(client)
					})
			})
		};
		/**
		 * 创建随机字符串
		 * @param num
		 * @returns {string}
		 */
		Vue.prototype.randomString = (num) => {
			let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
			let res = ''
			for (let i = 0; i < num; i++) {
				var id = Math.ceil(Math.random() * 35)
				res += chars[id]
			}
			return res
		}
	}
	filters(Vue) {
		/**
		 * @param {type} value 传入数字类型 例如 1000223
		 * @param {type} currency 金额前面符号 默认¥
		 * @param {type} decimals 保留小数位数 默认2位
		 * @description: 格式化金额
		 * @return 格式化后的 例如 ¥1,000,223.00
		 */
		Vue.filter('currency', function (value, currency, decimals) {
			const digitsRE = /(\d{3})(?=\d)/g
			currency = currency || '¥'
			decimals = decimals || 2
			value = parseFloat(value)
			if (!isFinite(value) || (!value && value !== 0)) {
				return ''
			}
			let stringified = Math.abs(value).toFixed(decimals)
			let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
			let i = _int.length % 3
			let head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : ''
			let _float = decimals ? stringified.slice(-1 - decimals) : ''
			let sign = value < 0 ? '-' : ''
			return sign + currency + head +
				_int.slice(i).replace(digitsRE, '$1,') +
				_float
		})
	}
}
export default new Methods()
