<!--
 * @Name: 编辑评价配置页
 * @Description: 编辑评价配置页
 * @Author: zhengchao
 * @Date: 2019-12-03
 -->
<template>
    <div class="edit-auto-group">
        <!--面包屑-->
        <el-breadcrumb
            class="bread-crumb-box"
            separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
                <a href="/">首页</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{pageTitle}}评价标签</el-breadcrumb-item>
        </el-breadcrumb >
        <!-- 评价配置 -->
        <div class="v-box group-config">
            <div class="hd">
            <h2>{{pageTitle}}评价标签{{oldTagName}}</h2>
            </div>
            <div class="bd">
                <ul class="s-query">
                    <li class="auto">
                        <div class="th required">评价：</div>
                        <div class="td">
                            <el-radio-group
                                v-model="editData.evaluateType"
                                @change="formControlChangeText('evaluateType')">
                                <el-radio
                                    v-for="(item, index) in evaluateTypeOpts"
                                    :key="`radio-${index}`"
                                    :label="item.id"
                                    :disabled="configId !== '0'">{{item.text}}</el-radio>
                            </el-radio-group>
                            <p
                                class="error-tips"
                                v-show="validateTxt.evaluateType !== ''">
                                {{validateTxt.evaluateType}}
                            </p>
                        </div>
                    </li>
                    <li class="auto">
                        <div class="th required">类型：</div>
                        <div class="td">
                            <el-radio-group
                                v-model="editData.type"
                                @change="typeChange">
                                <el-radio
                                    v-for="(item, index) in typeOpts"
                                    :key="`radio-${index}`"
                                    :label="item.id"
                                    :disabled="configId !== '0'">{{item.text}}</el-radio>
                            </el-radio-group>
                            <p
                                class="error-tips"
                                v-show="validateTxt.type !== ''">
                                {{validateTxt.type}}
                            </p>
                        </div>
                    </li>
                    <li class="auto">
                        <div class="th required">星级：</div>
                        <div class="td">
                            <el-checkbox
                                :label="0"
                                v-model="allStar"
                                @change="allStarChange">
                                全部星级
                            </el-checkbox>
                            <el-checkbox-group
                                v-model="editData.stars"
                                @change="starsChange">
                                <el-checkbox
                                    v-for="(channel, index) in starOpts"
                                    :key="`channel-${index}`"
                                    :label="channel.id">
                                    {{channel.text}}
                                </el-checkbox>
                            </el-checkbox-group>
                            <p
                                class="error-tips"
                                v-show="validateTxt.stars !== ''">
                                {{validateTxt.stars}}
                            </p>
                        </div>
                    </li>
                    <li class="auto">
                        <div class="th required">{{editData.type === '2' ?'问题' : ''}}文案：</div>
                        <div class="td">
                            <el-input
                                v-model.trim="editData.title"
                                @input="formControlChangeText('title')"
                                :placeholder="'请输入文案'"></el-input>
                            <p
                                class="error-tips padding-top"
                                v-show="validateTxt.title !== ''">
                                {{validateTxt.title}}
                            </p>
                        </div>
                    </li>
                    <!-- 问题子选项 -->
                    <template v-if="editData.type === '2'">
                        <li class="auto">
                            <div class="th required">答案：</div>
                            <div class="td">
                                <div class="flex-box ansower-box">
                                    <div class="flex-start">
                                        <span class="label-tit">正向</span>
                                        <div class="label-icon-wrap">
                                            <img
                                                src="./images/img-yesv.png"
                                                alt="正向答案" />
                                        </div>
                                    </div>
                                    <div class="flex-center">
                                        <span class="label-tit">文案</span>
                                        <el-input
                                            v-model.trim="editData.yesText"
                                            @input="formControlChangeText('yesText')"
                                            :placeholder="'请输入正向文案'"></el-input>
                                        <p
                                            class="error-tips padding-left padding-top"
                                            v-show="validateTxt.yesText !== ''">
                                            {{validateTxt.yesText}}
                                        </p>
                                    </div>
                                    <div class="flex-end">
                                        <el-select
                                            filterable
                                            clearable
                                            v-model="editData.yesTagId"
                                            placeholder="请选择关联标签">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.tag_config_id"
                                                :label="`${item.tag_name}${item.tag_config_id === '0' ? '' : '_' + item.tag_config_id}`"
                                                :value="item.tag_config_id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="flex-box ansower-box">
                                    <div class="flex-start">
                                        <span class="label-tit">负向</span>
                                        <div class="label-icon-wrap">
                                            <img
                                                src="./images/img-nov.png"
                                                alt="负向答案" />
                                        </div>
                                    </div>
                                    <div class="flex-center">
                                        <span class="label-tit">文案</span>
                                        <el-input
                                            v-model.trim="editData.noText"
                                            @input="formControlChangeText('noText')"
                                            :placeholder="'请输入负向文案'"></el-input>
                                        <p
                                            class="error-tips padding-left padding-top"
                                            v-show="validateTxt.noText !== ''">
                                            {{validateTxt.noText}}
                                        </p>
                                    </div>
                                    <div class="flex-end">
                                        <el-select
                                            v-model="editData.noTagId"
                                            clearable
                                            filterable
                                            placeholder="请选择关联标签">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.tag_config_id"
                                                :label="`${item.tag_name}${item.tag_config_id === '0' ? '' : '_' + item.tag_config_id}`"
                                                :value="item.tag_config_id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="auto">
                            <div class="th required">图片：</div>
                            <div class="td">
                                <el-radio-group
                                    v-model="editData.imgShow"
                                    @change="formControlChangeText('imgShow')">
                                    <el-radio :label="1">无图</el-radio>
                                    <el-radio :label="2">有图</el-radio>
                                </el-radio-group>
                            </div>
                        </li>
                        <li
                            class="auto"
                            v-show="editData.imgShow === 2">
                            <div class="th required">图片预览：</div>
                            <div class="td">
                                <div
                                    class="img-wrap"
                                    v-if="imgSrc !== ''">
                                        <i
                                            class="btn-close"
                                            @click="delImg">
                                            -
                                        </i>
                                        <div class="img">
                                            <img
                                                alt="预览图片"
                                                :src="imgSrc"
                                                @error="errorUploadImgFn" />
                                        </div>
                                </div>
                                <el-upload
                                    v-else
                                    ref="uploadBtn"
                                    class="upload-demo"
                                    action
                                    :before-upload="beforeUpload"
                                    :show-file-list="false">
                                    <el-button
                                        size="small"
                                        plain>
                                        <i class="el-icon-upload"></i>点击上传
                                    </el-button>
                                </el-upload>
                                <p
                                    class="error-tips"
                                    v-show="validateTxt.imgUrl !== ''">
                                    {{validateTxt.imgUrl}}
                                </p>
                            </div>
                        </li>
                    </template>
                    <!-- 标签子选项 -->
                    <li
                        class="auto"
                        v-else>
                        <div class="th required">排序：</div>
                        <div class="td">
                            <el-input
                                v-model.trim="editData.level"
                                @input="sortInput"
                                :placeholder="'请输入排序数字'"></el-input>
                            <p
                                class="error-tips padding-top"
                                v-show="validateTxt.level !== ''">
                                {{validateTxt.level}}
                            </p>
                        </div>
                    </li>
                    <li class="auto">
                        <div class="th required">是否显示：</div>
                        <div class="td">
                            <el-radio-group v-model="editData.isShow">
                                <el-radio
                                    v-for="(item, index) in showOpts"
                                    :key="`radio-${index}`"
                                    :label="item.id">{{item.text}}</el-radio>
                            </el-radio-group>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-area">
                <el-button
                    type="primary"
                    @click="saveConfig">
                    保存
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { EVALUATE_TYPE, EVALUATE_SET_TYPE, STAR_LEVEL, SHOW_HIDDEN } from './config/dataConfig';
    import apiObj from './api/evaluate';
    import URL from '@/config/config';
    import { mapState } from 'vuex';
    export default {
        name: 'editSetting',
        data() {
            return {
                // 评价类型筛选项
                evaluateTypeOpts: EVALUATE_TYPE,
                // 配置类型筛选项
                typeOpts: EVALUATE_SET_TYPE,
                // 星级筛选项
                starOpts: STAR_LEVEL,
                // 是否展示
                showOpts: SHOW_HIDDEN,
                // 问题答案标签下拉列表
                options: [],
                // 配置id
                configId: '0',
                // 编辑信息
                editData: {
                    // 星级
                    stars: [],
                    // 评价类型
                    evaluateType: '',
                    // 配置类型
                    type: '',
                    // 文案（问题文案）
                    title: '',
                    // 排序
                    level: '',
                    // 选项文本正向
                    yesText: '',
                    // 配置标签正向
                    yesTagId: '',
                    // 选项文本负向
                    noText: '',
                    // 配置标签负向
                    noTagId: '',
                    // 是否展示 1展示 2隐藏
                    isShow: '1',
                    // 是否有图
                    imgShow: 1,
                    // 图的url
                    imgUrl: ''
                },
                // 错误信息文案
                validateTxt: {
                    // 星级
                    stars: '',
                    // 评价类型
                    evaluateType: '',
                    // 配置类型
                    type: '',
                    // 文案（问题文案）
                    title: '',
                    // 排序
                    level: '',
                    // 选项文本正向
                    yesText: '',
                    // 配置标签正向
                    yesTagId: '',
                    // 选项文本负向
                    noText: '',
                    // 配置标签负向
                    noTagId: '',
                    // 是否展示
                    isShow: 1,
                    // 是否有图
                    imgShow: 1,
                    // 图的url
                    imgUrl: ''
                },
                // 图片预览路径/base64
                imgUrl: '',
                // 图片预览路径/base64
                imgSrc: '',
                // 图片上传数据
                fileOpts: {
                    // 图片文件
                    file: null
                },
                // 选中所有星星
                allStar: false,
                // 标签标题
                oldTagName: ''
            }
        },
        created () {
            // 如果用户权限是 总管理员；
            if (this.role === 'admin') {
                this.pageInit();
            }
        },
        computed: {
            ...mapState({
                // 权限： 总管理员
                role: state => state.role
            }),
            // 页面标题 新增/编辑
            pageTitle() {
               return this.configId !== '0' ? '编辑' : '新增';
            }
        },
        methods: {
            // 页面初始化处理
            pageInit() {
                // 配置id
                this.configId = this.$route.query.setId;
                // 判断是编辑时查询配置详情
                if (this.configId !== '0') {
                    this.initData();
                }
                // 获取与答案关联标签下拉菜单
                this.initTagOpts();
            },
            // 保存配置数据
            async saveConfig() {
                let valideForm = this.valideForm();
                try {
                    if (valideForm) {
                        // 如果配置问题 并且 有图片 需要处理图片的情况
                        if (this.editData.type === '2' && this.editData.imgShow === 2) {
                            if (typeof this.fileOpts.file !== 'string') {
                                // 如果是一个待提交数据是个file文件
                                var ossUrl = await this.fnUploadRequest(this.fileOpts);
                                // 数据成功后给图片路径数据赋值
                                this.editData.imgUrl = ossUrl[0];
                            } else if (typeof this.fileOpts.file === 'string') {
                                // 如果是一个url字符串
                                this.editData.imgUrl = this.fileOpts.file;
                            } else {
                                this.validateTxt.imgUrl = '请选择上传的图片';
                                this.fileOpts.file = null;
                                this.editData.imgUrl = '';
                                return false;
                            }
                        } else {
                            // 其他情况 提交图片url 为空
                            this.editData.imgUrl = '';
                        }
                    } else {
                        return false;
                    }
                    let tempData = this.editData;
                    // 提交的数据 进行赋值
                    let upData = {
                        type: tempData.evaluateType,
                        name: tempData.title,
                        grade_levels: tempData.stars.join(','),
                        is_show: tempData.isShow,
                        sort: tempData.level,
                        config_type: tempData.type,
                        img_url: tempData.imgUrl,
                        yes_text: tempData.yesText,
                        no_text: tempData.noText,
                        yes_tag_config_id: tempData.yesTagId === '0' ? '' : tempData.yesTagId,
                        no_tag_config_id: tempData.noTagId === '0' ? '' : tempData.noTagId
                    };
                    if (this.configId !== '0') {
                        upData.id = this.configId;
                    }
                    let {data} = await apiObj.evaluateSettingSub(upData);
                    if (data.code === 0) {
                        this.$router.push({ path: '/evaluate/settingList' });
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            // 初始化数据
            async initData() {
                try {
                    let params = {
                        id: this.configId
                    };
                    let { data } = await apiObj.getEvaluateSettingDetail(params);
                    if (data.code === 0) {
                        let apiData = data.data;
                        // 标签类型：1带看评价 2无意向评价
                        this.editData.evaluateType = apiData.type;
                        // 配置类型 1标签 2问题
                        this.editData.type = apiData.config_type;
                        // 标题 标签名称
                        this.editData.title = apiData.name;
                        this.oldTagName = `：${apiData.name}`;
                        // 星级 0非常不满意 1不满意 3一般 4满意 5非常满意
                        this.editData.stars = apiData.grade_levels === '' ? [] : apiData.grade_levels.split(',');
                        // 是否默认显示：1显示 2隐藏
                        this.editData.isShow = apiData.is_show;
                        // 排序
                        this.editData.level = Number(apiData.sort);
                        // 图片
                        if (apiData.img_url === '') {
                            this.fileOpts.file = null;
                            this.imgSrc = '';
                        } else {
                            this.editData.imgShow = 2;
                            this.fileOpts.file = apiData.img_url;
                            if (apiData.host_img_url) {
                                // 有完整路径的时候，预览图片显示完整url
                                this.imgSrc = apiData.host_img_url;
                            } else if (!apiData.host_img_url && process.env.NODE_ENV === 'production') {
                                // 没有完整路径的时候且是生产环境的时候，预览图片显示完整url
                                this.imgSrc = `https://comjia-sandbox.oss-cn-beijing.aliyuncs.com${apiData.img_url}`;
                            } else if (process.env.NODE_ENV === 'development') {
                                // 本地测试环境下预览图片显示的是拼接url
                                this.imgSrc = `https://${URL.OSS_IMG_DOMAIN_HTTPS}${apiData.img_url}`;
                            }
                        }
                        // 正向文案
                        this.editData.yesText = apiData.yes_text;
                        // 负向文案
                        this.editData.noText = apiData.no_text;
                        // 正向标签配置id
                        this.editData.yesTagId = apiData.yes_tag_config_id === '0' ? '' : apiData.yes_tag_config_id;
                        // 负向标签配置id
                        this.editData.noTagId = apiData.no_tag_config_id === '0' ? '' : apiData.no_tag_config_id;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            // 初始化与答案相关联标签下拉菜单数据
            async initTagOpts() {
                let {data} = await apiObj.selectTag();
                if (data.code === 0) {
                    this.options = data.data;
                }
            },
            /**
             * @description: 表单元素数据改变后对应提示语句
             * @param {string} name 检验数据字段名
             * @return {string} 返回具体文案
             */
            formControlChangeText(name) {
                let tempData = this.editData[name];
                let tempText = '';
                switch (name) {
                    // 验证评价类型
                    case 'evaluateType':
                        tempText = tempData === '' ? '评价类型至少选择一项' : '';
                        break;
                    // 验证配置类型
                    case 'type':
                        tempText = tempData === '' ? '配置类型至少选择一项' : '';
                        break;
                    // 验证星级选项
                    case 'stars':
                        tempText = tempData.length === 0 ? '至少选择一个星级' : '';
                        break;
                    case 'title':
                        if (tempData === '') {
                            tempText = '请输入标题文案';
                        } else if (tempData.length > 15 && this.editData.type === '2') {
                            // 文案是问题类型
                            tempText = '请控制在15个字内';
                        } else if (tempData.length > 10 && this.editData.type === '1') {
                            // 文案是标签类型
                            tempText = '请控制在10个字内';
                        } else {
                            tempText = '';
                        }
                        break;
                    // 配置类型为标签时
                    case 'level':
                        if (this.editData.type !== '2') {
                            tempText = tempData === '' ? '请输入排序' : '';
                        } else {
                            tempText = '';
                        }
                        break;
                    // 正向答案文案
                    case 'yesText':
                        tempText = tempData === '' ? '请输入正向答案文案' : tempData.length > 6 ? '最多输入6个字' : '';
                        break;
                    // 负向答案文案
                    case 'noText':
                        tempText = tempData === '' ? '请输入负向答案文案' : tempData.length > 6 ? '最多输入6个字' : '';
                        break;
                    // 是否需要上传图片
                    case 'imgShow':
                        // 只要变化检测 提示文案消失
                        tempText = '';
                        break;
                    default:
                        // 图片路径
                        if (name === 'imgUrl' && this.editData.imgShow !== 1) {
                            tempText = this.imgSrc === '' ? '请选择上传的图片' : '';
                        } else {
                            tempText = '';
                        }
                }
                // 如果是 是否需要上传图片 改变为 imgUrl
                if (name === 'imgShow') {
                   name = 'imgUrl';
                }
                this.validateTxt[name] = tempText;
            },
            /**
             * @description: 验证表单
             * @return {Boolean} 显示验证结果 true false
             */
            valideForm() {
                let tempData = this.editData;
                // 验证评价类型
                this.formControlChangeText('evaluateType');

                // 验证配置类型
                this.formControlChangeText('type');

                // 验证星级选项
                this.formControlChangeText('stars');

                // 验证文案
                this.formControlChangeText('title');
                // 配置类型为标签时
                this.formControlChangeText('level');
                if (tempData.type === '2') {
                    // 配置类型为问题时
                    // 正向答案文案
                    this.formControlChangeText('yesText');
                    // 负向答案文案
                    this.formControlChangeText('noText');
                    // 图片
                    this.formControlChangeText('imgUrl');
                }
                // 配置类型为标签时的必填字段
                let requredArr = ['evaluateType', 'type', 'stars', 'title', 'level'];
                if (tempData.type === '2') {
                    // 配置类型为问题时的必填字段
                    requredArr = ['evaluateType', 'type', 'stars', 'title', 'yesText', 'noText'];
                    // 如果有图 必须上传图片
                    if (tempData.imgShow !== 1) {
                        requredArr.push('imgUrl');
                    }
                }
                // 判断是否有不满足tips 就能判断是否满足所有条件
                return requredArr.every((val) => {
                    return this.validateTxt[val] === '';
                });
            },
            // 配置类型修改 表单变化
            typeChange() {
                if (this.editData.type === '1') {
                    // 文案提示初始化
                    this.validateTxt.title = '';
                    // 选项文本正向
                    this.validateTxt.yesText = '';
                    // 配置标签正向
                    this.validateTxt.yesTagId = '';
                    // 选项文本负向
                    this.validateTxt.noText = '';
                    // 配置标签负向
                    this.validateTxt.noTagId = '';
                    // 图片预览url
                    this.validateTxt.imgUrl = '';
                } else {
                    // 排序
                    this.validateTxt.level = '';
                }
                this.formControlChangeText('type');
            },
            // 星级选项出现变化
            starsChange() {
                // 星级多选项不是全部时 全部星级取消选中状态
                if (this.editData.stars.length < 5) {
                    this.allStar = false;
                }
                this.formControlChangeText('stars');
            },
            /**
             * @description: 全部星级 选中/取消选中事件
             * @param {string} val 选中状态
             */
            allStarChange(val) {
                this.editData.stars = val ? ['0', '1', '3', '4', '5'] : [];
            },
            /**
             * @description: 排序字段数据监听事件
             * @param {string} val 排序输入框数据
             */
            sortInput(val) {
                this.editData.level = val.replace(/[^0-9]+/, '');
                this.formControlChangeText('level');
            },
            /**
             * @description: 上传文件前预览
             * @param {file} file 上传的文件
             */
            beforeUpload(file) {
                let isLt2M = file.size / 1024 / 1024 <= 10;
                let excelfileExtend = ".png,.jpg,.jpeg,.gif";
                let fileExtend = file.name.split(".")[1].toLowerCase();
                if (excelfileExtend.indexOf(fileExtend) <= -1) {
                    this.$message.error("只能上传jpg、png、jpeg、gif格式文件！");
                    return false;
                }
                this.changOrderLoading = true;
                if (!isLt2M) {
                    this.$message.error("图片大小最多10M！");
                    return false;
                }
                let FR = new FileReader();
                FR.readAsDataURL(file);
                // 生成预览文件
                FR.onload = () => {
                    var img = new Image();
                    img.src = FR.result;
                    img.onload = () => {
                        // 判断长宽
                        let height = img.height;
                        let width = img.width;
                        if (height !== width) {
                            this.validateTxt.imgUrl = `请上传正方形图片，本次上传的图片高度为${height}，图片宽度为${width}。`;
                        } else {
                            this.validateTxt.imgUrl = '';
                            // 显示图片
                            this.imgSrc = FR.result;
                            // 将带上传图片保存在变量里
                            this.fileOpts.file = file;
                            // 检验图片
                            this.formControlChangeText('imgUrl');
                        }
                    };
                }
                return false;
            },
            // 删除图片
            delImg() {
                this.imgSrc = '';
            },
            /**
             * @description: 上传文件
             * @param {file} option 上传的文件
             */
            async fnUploadRequest(option) {
                // 提交methods
                return this.ossUploadFile(option, "evaluateSet");
            },
            // 上传的图片出现显示错误时
            errorUploadImgFn() {
                this.$nextTick(() => {
                    this.imgSrc = '';
                    this.fileOpts.file = null;
                    this.editData.imgUrl = '';
                    this.validateTxt.imgUrl = '已上传的图片丢失，请重新上传';
                });
            }
        },
        watch: {
            // role 是异步调取的，所以监听role的改变
            role: {
                handler: function (val, oldval) {
                    // 总管理员 页面初始化
                    if (val === 'admin') {
                        this.pageInit();
                    } else {
                        // 非总管理员跳转权限页面
                        this.$router.push({path: '/noPermissions'});
                    }
                },
                deep: true
            }
        }
    };
</script>

<style lang="less" scoped>
.edit-auto-group {
    padding: 0 20px 30px;
    .group-config {
        .bd {
            .auto {
                float: none;
                .th {
                    width: 140px;
                    &.key-word {
                        line-height: 20px;
                    }
                }
                .text-hint {
                    font-size: 14px;
                    line-height: 20px;
                    margin-bottom: 10px;
                }
                /deep/.el-input {
                    float: left;
                    width: 300px;
                }
                /deep/.el-select {
                    float: left;
                    width: 300px;
                }
                .td {
                    /deep/.el-input {
                        float: none;
                        width: 300px;
                    }
                    .flex-box {
                        display: flex;
                        .flex-start {
                           padding-right: 20px;
                        }
                        .flex-center {
                           padding-right: 20px;
                        }
                        .label-tit {
                            margin-right: 10px;
                        }
                    }
                    .ansower-box {
                        margin-bottom: 20px;
                    }
                    .add-btn {
                        color: #ff5c47;
                    }
                    .edit-btn {
                        color: #33a1ff;
                    }
                    .surplus {
                        float: left;
                        margin-left: 10px;
                        line-height: 40px;
                        cursor: pointer;
                    }
                    .key-word-list {
                        .key-word {
                            margin-bottom: 5px;
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                    .label-icon-wrap {
                        width: 23px;
                        height: 23px;
                        overflow: hidden;
                        vertical-align: -6px;
                        display: inline-block;
                        img {
                            width: 100%;
                        }
                    }
                    .img-wrap {
                        position: relative;
                        width: 80px;
                        height: 80px;
                        .btn-close {
                            background-color: #f00;
                            display: block;
                            width: 15px;
                            height: 15px;
                            line-height: 15px;
                            text-align: center;
                            color: #fff;
                            border-radius: 50%;
                            font-size: 19px;
                            font-weight: bold;
                            position: absolute;
                            cursor: pointer;
                            right: 0;
                            top: 0;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 4px;
                            object-fit: fill;
                        }
                    }
                    .error-tips {
                        font-size: 12px;
                        color: #ff6d6f;
                        line-height: 1;
                        &.padding-left {
                            padding-left: 42px;
                        }
                        &.padding-top {
                            padding-top: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
