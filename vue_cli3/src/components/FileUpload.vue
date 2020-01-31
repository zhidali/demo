<template>
  <!--
    在父组件调用init方法来进行初始化，this.$refs.XXX.init()
    uploadUrl： 要上传的路径（跟后台商量）
    fileType：允许上传的文件类型
    fileMaxSize：允许上传文件的大小
    upID：上传组件的ID写活（防止同时初始化多个pludpload）
    limit：上传的个数限制
    传出：上传成功的图片路径，为一个数组对象，里面有上传的半路径和全路径
  -->
   <div :id="upID" class="upload-box">
     <slot></slot>
   </div>
</template>

<script>
import { commonFun } from '@/assets/js/utils/utils'
import {getSign} from '@/api/commonApi'
import moment from 'moment'
window.mOxie = window.moxie = require('../../static/lib/uploads/moxie.js')
require('../../static/lib/uploads/plupload.dev')
export default {
  name: 'file-upload',
  props: {
    // 上传路径
    uploadUrl: {
      type: String,
      default: 'supporSys'
    },
    // 允许上传的文件类型
    fileType: {
      type: String,
      default: 'jpg,png,jpeg,gif'
    },
    // 允许上传文件的大小
    fileMaxSize: {
      type: String,
      default: '10mb'
    },
    // 初始化插件写入ID
    upID: {
      type: String,
      default: 'upBox'
    },
    // 上传限制个数
    limit: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      uploader: '', // 上传实例化
      upFileURL: '', // 上传成功的路径
      signs: {} // 阿里云上传签名
    }
  },
  mounted () {
  },
  methods: {
    // 暴露出去的的初始化方法
    init () {
      this.getSignCode()
    },
    // 获取阿里云上传签名
    async getSignCode () {
      let params = {
        cate: this.uploadUrl
      }
      try {
        let {data} = await getSign(params)
        // 实例化上传插件
        if (data.code === 0) {
          this.signs = data.data
          this.initUpload()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 实例化上传插件
    initUpload () {
      let that = this
      // 定义 plupload 对象
      function setUploadParam (up, filename, ret) {
        let fileName = ''
        if (filename && typeof filename == 'string') {
          fileName = commonFun.trimAll(filename)
        }
        let keyName = that.signs.dir + moment().format('X') + commonFun.random_string(6) + fileName
        let newMultipartParams = {
          key: keyName,
          policy: that.signs.policy,
          OSSAccessKeyId: that.signs.accessid,
          success_action_status: 200, // 默认是 204
          signature: that.signs.signature
        }
        up.setOption({
          'url': that.signs.host,
          'multipart_params': newMultipartParams
        })
        up.start()
        return keyName
      }
      that.uploader = new plupload.Uploader({
        multi_selection: false, // 禁止多文件上传
        browse_button: that.upID, // 触发文件上传的按钮 id（传入的参数）
        url: that.signs.host, // 服务器的地址，与提供的阿里云的地址一致
        flash_swf_url: '../../static/lib/uploads/moxie.swf',
        filters: {
          mime_types: [
            {
              title: 'Image files',
              extensions: that.fileType // 允许上传的文件类型
            }
          ],
          max_file_size: this.fileMaxSize,
          prevent_duplicates: true // 不允许上传重复文件
        },
        init: {
          // 文件添加到上传队列后
          FilesAdded: function (up, files) {
            if (!that.limit) {
              // 个数无限制
              setUploadParam(up, files[0].name, false)
            } else {
              // 有限制
              if (up.files.length <= that.limit) {
                setUploadParam(up, files[0].name, false)
              } else {
                up.removeFile(files[0].id)
                alert('最多上传' + that.limit + '个文件!')
              }
            }
          },
          FileUploaded: function (up, file, info) {
            // file 里可以得到压缩率
            if (info.status === 200) {
            } else if (info.status === 203) {
              alert('上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response)
            } else {
              alert(info.respose)
            }
          },
          BeforeUpload: function (up, file) {
            // 获取到上传路径
            file.upURL = '/' + setUploadParam(up, file.name, true)
          },
          UploadComplete: function (up, file) {
            // 上传进度为100%
            let imgArr = file.map((img) => {
              if (img.percent === 100) {
                let upFileURlObj = {
                  upURL: img.upURL,
                  imgURL: that.signs.host + '' + img.upURL,
                  upID: that.upID
                }
                return upFileURlObj
              }
            })
            // 传递给父组件
            that.$emit('getFileURL', imgArr)
          },
          // 错误信息
          Error: function (up, err) {
            if (err.code === -600) {
              alert('图片大小不能超过' + maxSize)
            } else if (err.code === -601) {
              alert('文件类型不正确')
            } else if (err.code === -602) {
              alert('已上传过')
            } else {
              alert(err)
            }
          }
        }
      })
      that.uploader.init()
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.upload-box{
  display: inline-block;
  cursor: pointer;
}
</style>
