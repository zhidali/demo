<template>
    <div class="image-upload-wrap">
        <div class="image-list">
            <div
                class="image-box"
                v-for="(item, index) in imgList"
                :key="item.url + index">
                <el-image
                    style="width: 100%; height: 100%"
                    :src="item.url"
                    fit="scale-down"
                    :alt="item.name"
                    @click="openPhotoViewer(item.url)" />
                <i
                    class="el-icon el-icon-error iconfont iconicon-delete"
                    @click="delImg(index)"></i>
            </div>
        </div>
        <div
            class="btn-box"
            v-if="hideBtn && imgList.length !== maxCount">
            <input
                ref="uploadImg"
                class="file-hide"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.gif"
                :id="uploadId"
                @change="fileChange">
            <label
                :for="uploadId"
                class="file-up-wrap el-button el-button--primary el-button--small">
                {{btnText}}
            </label>
            <span
                v-if="uploadHint">
                还可以上传{{count}}张图片、图片类型必须为gif,png,jpg,jpeg,大小在10M以内
            </span>
        </div>
        <!-- 图片预览查看器 -->
        <image-review
            v-if="PhotoIsShow"
            :showViewer="PhotoIsShow"
            :urlList="urlList"
            @closeViewer="closeViewer">
        </image-review>
    </div>
</template>

<script>
    /**
     * 图片上传组件，图片上传后获取阿里云返回的url地址进行图片预览展示
     * @date 2019.11.18
     * @author 贺伟
     * @name {string} uploadId 上传组件的id,必传
     * @example 调用示例 <image-upload :upload-id="myId"></image-upload>
     * @update 修改回显图片为el-image组件，并添加大图预览功能
     * @updater 解彬
     */
    import moment from 'moment';
    import ossConf from '@/config/config';
    import OssUpload from '@/assets/js/upload/ossUpload';
    import reqApi from '@/api/commonApi';
    import ImageReview from '@/components/ImagePreview';
    import md5 from 'md5';
    export default {
        name: 'ImageUpload',
        props: {
            // 图片元素信息
            imageInfo: {
                type: Object,
                default: () => {}
            },
            // 预览是否可轮播
            previewSwiper: {
                type: Boolean,
                default: false
            },
            // 超过指定图片是否隐藏上传图片按钮
            hideBtn: {
                type: Boolean,
                default: false
            },
            // 上传的提示文案
            uploadHint: {
                type: Boolean,
                default: true
            },
            // 上传按钮文案
            btnText: {
                type: String,
                default: '点击上传'
            },
            // 图片数组
            imgList: {
                type: Array,
                default: () => []
            },
            // 图片上传的最大数量
            maxCount: {
                type: Number,
                default: 10
            },
            // 单文件上传限制文件大小 单位M
            size: {
                type: Number,
                default: 10
            },
            // 上传限制的类型
            imgType: {
                type: Array,
                default: () => ['jpeg', 'png', 'jpg', 'gif']
            },
            // input file的id,必传，且唯一，保证每个组件的id是唯一的
            uploadId: {
                type: String,
                required: true
            },
            // 上传的目录
            cate: {
                type: String,
                default: 'Upload/project/house_type'
            }
        },
        components: {
            ImageReview
        },
        computed: {
            // 计算剩余图片数量
            count() {
                return this.imgList.length >= 10 ? 0 : this.maxCount - this.imgList.length;
            }
        },
        data() {
            return {
                // 预览效果是否显示
                PhotoIsShow: false,
                // 预览图片地址
                urlList: [],
                // 是否达到最多上传图片的数量标识
                maxCountFlag: false
            };
        },
        methods: {
            /**
             * 点击图片打开预览
             * @param {string} imgurl 图片地址
             */
            openPhotoViewer(imgUrl) {
                if (this.previewSwiper) {
                    let arr = [];
                    this.imgList.forEach((imgItem) => {
                        arr.push(imgItem.url)
                    })
                    this.urlList = arr;
                } else {
                    this.urlList = [];
                    this.urlList.push(imgUrl);
                }
                this.PhotoIsShow = true;
                // 是否是预览状态
                this.$emit('photoViewer', true)
            },
            /**
             * 点击model关闭预览
             * @param {boolean} val 关闭预览
             */
            closeViewer(val) {
                this.PhotoIsShow = val;
                // 是否是预览状态
                this.$emit('photoViewer', false)
            },
            /**
             * 删除图片
             * @param {Number} index 当前图片的索引
             */
            delImg(index) {
                this.imgList.splice(index, 1);
                if (this.imgList.length < this.maxCount) {
                    this.maxCountFlag = false;
                }
            },
            /**
             * 上传前校验
             * @param {File} file 文件列表类数组
             */
            checkFileAllow(file) {
                const { name, size } = file;
                // 默认单位是字节
                const sizeM = size / (1024 * 1024);
                const nameArr = name.split('.');
                // 后缀名
                const extensionName = nameArr[nameArr.length - 1];
                // 限制最多上传的数量
                if (this.imgList.length >= this.maxCount) {
                    // this.$message(`最多上传${this.maxCount}张图片！`);
                    return false;
                }
                if (this.imgList.find(ele => ele.originName === name)) {
                    // this.$message(`上传的文件重复，请重新选择`);
                    return false;
                }
                // 限制文件大小
                if (sizeM > this.size) {
                    // this.$message('上传的文件不可大于3M哦~');
                    return false;
                }
                // 限制文件类型
                if (!this.imgType.includes(extensionName)) {
                    // this.$message(`请上传图片类型为${this.imgType.join()}的文件`);
                    return;
                }
                return true;
            },
            /**
            * * 文件变化事件触发 先进行校验
            * * @param {Object} evt  event事件对象
            */
            async fileChange(evt) {
                try {
                    // debugger
                    const files = evt.target.files;
                    const newFiles = Array.from(files).slice(0, 10);
                    // 定义不符合的文件
                    let inconformityFlie = [];
                    // 遍历选中的file
                    newFiles.forEach(file => {
                        // 检查文件是否通过校验
                        const isCross = this.checkFileAllow(file);
                        if (isCross) {
                            this.fileUpload(file);
                        } else {
                            inconformityFlie.push({
                                file,
                                isCross
                            })
                        }
                    });
                    // 如果有校验不通过的提示
                    if (inconformityFlie.length > 0) {
                        this.$message.error(`不符合要求的图片无法上传`);
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            /**
             * 文件上传
             * @param {Object<File>} file file对象
             */
            async fileUpload(file) {
                try {
                    // 获取阿里云直传的图片上传获取签名
                    const params = {
                        cate: this.cate
                    };
                    const { data: ossData } = await reqApi.getSign(params);
                    if (ossData.code === 0) {
                        const { host, policy, signature, dir } = ossData.data;
                        // 获取二级域名
                        const compBucket = host.split('.')[0].split('//')[1];
                        // 获取主域名
                        const region = host.split('.')[1];
                        // 创建oss上传实例
                        const ossUp = new OssUpload({
                            region: region,
                            accessKeyId: ossConf.OSS_ACCESS_ID,
                            accessKeySecret: ossConf.OSS_ACCESS_KEY,
                            policy,
                            signature,
                            bucket: compBucket
                        });
                        // 当前时间
                        const dateTime = moment().format('YYYYMMDDhhmmss');
                        const randomStr = this.randomString(4);
                        const typeName = file.name.split('.')[1];
                        // 文件名
                        const fileName = `${dir}${dateTime}_${randomStr}_${md5(file.name)}.${typeName}`;
                        // 开始上传
                        const {
                            url,
                            // 示例 resume/cssom.pdf
                            name,
                            res
                        } = await ossUp.putBlob(`${fileName}`, file);
                        // 将返回的地址赋值到图片列表
                        if (this.imgList.length < 10) {
                            let obj = {
                                url,
                                name,
                                originName: file.name
                            };
                            // 如果图片有多余选项可进行合并写入
                            let objAssign = Object.assign({}, obj, this.imageInfo);
                            this.$set(this.imgList, this.imgList.length, objAssign);
                        } else {
                            if (!this.maxCountFlag) {
                                this.$emit('hintMaxCountImg');
                            }
                            this.maxCountFlag = true;
                        }
                        if (this.$refs.uploadImg) {
                            this.$refs.uploadImg.value = '';
                        }
                        // 阿里云成功状态判断
                        if (res.statusCode === 200) {
                            // this.$message('上传成功');
                        } else {
                            this.$message('貌似上传遇到了问题，请重试~');
                        }
                    } else {
                        this.$message(ossData.msg);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            // 获取当前存储的图片地址
            getUrlList() {
                return this.imgList.map(ele => ele.name);
            }
        }
    };
</script>

<style lang="less" scoped>
    .image-upload-wrap{
        .file-hide{
            display: none;
        }
        .image-list{
            display: flex;
            flex-wrap: wrap;
            padding: 15px 10px;
        }
        .image-box{
            position: relative;
            margin: 5px;
            width: 150px;
            height: 100px;
            border: 2px solid #eee;
            .image-pre{
                width: 100%;
                height: 100%;
                object-fit: scale-down;
            }
            .el-icon-error{
                position: absolute;
                top: -6px;
                right: -8px;
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
</style>