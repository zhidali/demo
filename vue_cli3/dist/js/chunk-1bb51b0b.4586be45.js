(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1bb51b0b"],{"0628":function(a,t,e){"use strict";e.r(t);var i=e("e7a4"),o=e("c152");for(var n in o)"default"!==n&&function(a){e.d(t,a,(function(){return o[a]}))}(n);e("e318");var l=e("5511"),r=Object(l["a"])(o["default"],i["a"],i["b"],!1,null,"68d54ca2",null);t["default"]=r.exports},"541c":function(a,t,e){var i=e("cd23");"string"===typeof i&&(i=[[a.i,i,""]]),i.locals&&(a.exports=i.locals);var o=e("85cb").default;o("9947b710",i,!0,{sourceMap:!1,shadowMode:!1})},"856e":function(a,t,e){"use strict";var i=e("2eb1");e("af82"),e("4045"),e("c1b0"),e("c354"),e("f4a0"),e("b3f9"),e("d780"),e("3e5e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("63ff");var o=i(e("57f0")),n=e("2af9"),l=i(e("fc7f")),r=e("f946"),s=e("7223"),c=e("edfb"),p={name:"PerformanceRiskList",data:function(){var a=this,t=function(a,t,e){if(!s.commonFun.verifyTelNum(t)&&""!==t)return e(new Error(""));e()},e=function(a,t,e){if(!s.commonFun.verifyEmail(t)&&""!==t)return e(new Error(""));e()},i=function(t,e,i){var o=["phone","email","qq","wechat"];if(""!==e)a.hasLink||(a.hasLink=!0,o.forEach((function(e){t.field!=e&&a.$refs.complainForm.validateField(e)}))),i();else{if(a.hasLink=!1,o.forEach((function(t){""!==a.complainData[t]&&(a.hasLink=!0)})),!a.hasLink)return i(new Error(""));i()}},o=function(a,t,e){if(t.length>9)return e(new Error(""));e()},n=function(a,t,e){if(t.length>10)return e(new Error(""));e()},l=function(a,t,e){if("NaN"===String(Number(t)))return e(new Error(""));e()};return{complainData:{channel:"",title:"",cityId:"",employeeName:"",joiner:"",insider:"",dateTime:"",content:"",investigationProposal:"",name:"",phone:"",email:"",qq:"",wechat:"",orderId:"",handleResult:"",imgUrls:[],soundUrls:[]},showImgUrls:[],showSoundUrls:[],hasLink:!1,rules:{channel:[{required:!0,message:"请选择举报途径"}],title:[{required:!0,message:"请输入投诉标题"},{min:1,max:20,message:"标题长度不能大于20个字"}],cityId:[{required:!0,message:"请选择投诉发生的城市"}],employeeName:[{required:!0,message:"请输入被举报员工"},{min:1,max:20,message:"员工姓名不能大于20个字"}],joiner:[{min:0,max:20,message:"不能大于20个字"}],insider:[{min:0,max:20,message:"不能大于20个字"}],dateTime:[{required:!0,message:"请选择问题发生时间"}],content:[{required:!0,message:"请输入问题的详情描述"},{min:1,max:3e3,message:"不能大约3000字"}],investigationProposal:[{required:!0,message:"请输入调查建议"},{min:1,max:300,message:"不能大约300字"}],name:[{min:0,max:20,message:"举报人姓名不能大于20个字"}],phone:[{validator:i,message:"联系方式至少要填写一项",trigger:"change"},{validator:t,message:"请输入正确格式的手机号"}],email:[{validator:i,message:"联系方式至少要填写一项",trigger:"change"},{validator:e,message:"请输入正确格式的email地址"}],qq:[{validator:i,message:"联系方式至少要填写一项",trigger:"change"}],wechat:[{validator:i,message:"联系方式至少要填写一项",trigger:"change"}],handleResult:"",imgUrls:[{validator:o,message:"不能超过9张图"}],soundUrls:[{validator:n,message:"不能超过10个音频"}],orderId:[{validator:l,message:"需要输入为数字"},{min:1,max:20,message:"订单号不能大于20个数字"}]},showImgUpbtn:!0,showSoundUpbtn:!0,contentLoading:!1,cityList:[],progress:c.COMPLAIN_PROGRESS,complainChannels:c.COMPLAIN_CHANNELS,dialogData:{show:!1,title:"保存失败",cnt:"保存失败，请重试！"},imgUploadData:{uploadNumPrev:0,maxNum:9,maxSize:5,fileTypeString:".bmp,.jpg,.jpeg,.gif,.png"},audioUploadData:{uploadNumPrev:0,maxNum:10,maxSize:100,fileTypeString:".amr,.mp3,.wav,.mp4,.m4a"}}},components:{ImageSwiperViewer:n.ImageSwiperViewer},created:function(){try{this.getCityList()}catch(a){console.log(a)}},methods:{getCityList:function(){var a=this;return(0,o.default)(regeneratorRuntime.mark((function t(){var e,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.getCity)(1);case 2:e=t.sent,i=e.data,0===i.code&&(i.data.splice(0,1),a.cityList=i.data);case 5:case"end":return t.stop()}}),t)})))()},validSub:function(){var a=this;this.$refs.complainForm.validate((function(t){if(!t)return!1;a.subComplaint()}))},imgUploadRequest:function(a){var t=this;if(!this.showImgUpbtn)return!1;this.imgUploadData.uploadNumPrev++;var e=this.imgUploadData,i=e.uploadNumPrev,o=e.maxNum,n=e.fileTypeString,l=e.maxSize;if(i>o)return this.$message.error("最多上传".concat(o,"张图片!")),this.imgUploadData.uploadNumPrev--,this.showImgUpbtn=!1,!1;var r=a.file.name&&a.file.name.split(".")?a.file.name.split(".")[1]:"",s=n.indexOf(r.toLowerCase())>0,c=a.file.size/1024/1024<l;if(!s)return this.$message.error("上传图片凭证只能是图片格式!"),this.imgUploadData.uploadNumPrev--,!1;if(!c)return this.$message.error("上传图片凭证大小不能超过 ".concat(l,"MB!")),this.imgUploadData.uploadNumPrev--,!1;try{this.ossUploadFile({file:a.file,needUrl:!0},"complain").then((function(a){a&&0!==a.length?t.showImgUrls.length<o?(t.complainData.imgUrls.push(a[0]),t.showImgUrls.push(a[1])):t.showImgUpbtn=!1:t.imgUploadData.uploadNumPrev--}))}catch(p){this.imgUploadData.uploadNumPrev--,console.log(p)}},fnUploadSoundRequest:function(a){var t=this;if(!this.showSoundUpbtn)return!1;this.audioUploadData.uploadNumPrev++;var e=this.audioUploadData,i=e.uploadNumPrev,o=e.maxNum,n=e.fileTypeString,l=e.maxSize;if(i>o)return this.$message.error("最多上传".concat(o,"个音频!")),this.audioUploadData.uploadNumPrev--,this.showSoundUpbtn=!1,!1;var r=a.file.name&&a.file.name.split(".")?a.file.name.split(".")[1]:"",s=n.indexOf(r.toLowerCase())>0,c=a.file.size/1024/1024<l;if(!s)return this.$message.error("上传音频凭证只能是音频格式!"),this.audioUploadData.uploadNumPrev--,!1;if(!c)return this.$message.error("上传音频凭证大小不能超过 ".concat(l,"MB!")),this.audioUploadData.uploadNumPrev--,!1;try{this.ossUploadFile({file:a.file,needUrl:!0},"complain").then((function(a){a&&0!==a.length?t.showSoundUrls.length<o?(t.complainData.soundUrls.push(a[0]),t.showSoundUrls.push(a[1])):t.showSoundUpbtn=!1:t.audioUploadData.uploadNumPrev--}))}catch(p){this.audioUploadData.uploadNumPrev--,console.log(p)}},subComplaint:function(){var a=this;return(0,o.default)(regeneratorRuntime.mark((function t(){var e,i,o,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=a.complainData,i={complaint_channel:e.channel,title:e.title,city_id:e.cityId,employee_name:e.employeeName,participant:e.joiner,insider:e.insider,complaint_time:e.dateTime,content:e.content,investigation_proposal:e.investigationProposal,voucher_arr:{img:e.imgUrls,audio:e.soundUrls},customer_name:e.name,customer_mobile:e.phone,customer_email:e.email,customer_qq:e.qq,customer_wechat:e.wechat,order_id:e.orderId,handle_result:e.handleResult},t.next=4,l.default.addComplaint(i);case 4:o=t.sent,n=o.data,0==n.code?a.goback():(a.dialogData.show=!0,a.dialogData.cnt=n.msg);case 7:case"end":return t.stop()}}),t)})))()},goback:function(){this.$router.replace({path:"/performance/complainList"})},delUpelm:function(a,t){"img"==a?(this.complainData.imgUrls.splice(t,1),this.showImgUrls.splice(t,1),this.imgUploadData.uploadNumPrev=this.showImgUrls.length):(this.complainData.soundUrls.splice(t,1),this.showSoundUrls.splice(t,1),this.audioUploadData.uploadNumPrev=this.showSoundUrls.length)},closeDialog:function(){this.dialogData.show=!1,this.dialogData.cnt=""}},watch:{showImgUrls:function(a){var t=this.imgUploadData.maxNum-a.length;this.showImgUpbtn=t>0},showSoundUrls:function(a){var t=this.audioUploadData.maxNum-a.length;this.showSoundUpbtn=t>0}}};t.default=p},c152:function(a,t,e){"use strict";e.r(t);var i=e("856e"),o=e.n(i);for(var n in i)"default"!==n&&function(a){e.d(t,a,(function(){return i[a]}))}(n);t["default"]=o.a},cd23:function(a,t,e){var i=e("abd8");t=i(!1),t.push([a.i,".content-main[data-v-68d54ca2]{padding:0 15px}.form-table-box[data-v-68d54ca2]{background-color:#fff}.form-table-box .filter-link-more[data-v-68d54ca2]{float:right;padding:9px 20px;margin-top:6px}.form-tip-box[data-v-68d54ca2]{color:#999}.form-table-box .batch-btn-area[data-v-68d54ca2]{text-align:right;position:absolute;right:20px;top:10px}.box-relative[data-v-68d54ca2]{position:relative}.box-absolute[data-v-68d54ca2]{position:absolute}.form-tit[data-v-68d54ca2]{font-size:16px;font-weight:700}.form-btn-wrap[data-v-68d54ca2]{text-align:center}.complain-form-wrap[data-v-68d54ca2]{width:50%}.box-width-100[data-v-68d54ca2]{width:100%}.uploadlist-wrap[data-v-68d54ca2]{min-width:800px;padding-left:80px;-webkit-box-sizing:border-box;box-sizing:border-box}.updata-wrap[data-v-68d54ca2]{position:relative;width:100px;height:100px;display:inline-block;margin-right:10px}.updata-wrap.sound-wrap[data-v-68d54ca2]{width:auto}.updata-wrap .close[data-v-68d54ca2]{position:absolute;cursor:pointer;right:2px;top:2px;background-color:#f56c6c;color:#fff;width:25px;height:25px;line-height:25px;text-align:center;border-radius:50%;font-weight:700;opacity:0;-webkit-transition:all .3s;transition:all .3s}.updata-wrap:hover .close[data-v-68d54ca2]{opacity:1}",""]),a.exports=t},e318:function(a,t,e){"use strict";var i=e("541c"),o=e.n(i);o.a},e7a4:function(a,t,e){"use strict";var i=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:a.contentLoading,expression:"contentLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"el-row"},[e("el-col",{staticClass:"content-main",attrs:{span:24}},[e("el-breadcrumb",{staticClass:"bread-crumb-box",attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",[e("a",{attrs:{href:"/"}},[a._v("首页")])]),e("el-breadcrumb-item",{attrs:{to:{path:"/performance/complainList"}}},[a._v("投诉管理")]),e("el-breadcrumb-item",[a._v("新建投诉")])],1),e("div",{staticClass:"v-box form-table-box box-relative"},[e("div",{staticClass:"bd"},[e("div",{staticClass:"complain-form-wrap"},[e("p",{staticClass:"form-tit"},[a._v("举报内容：")]),e("el-form",{ref:"complainForm",attrs:{model:a.complainData,rules:a.rules,"label-width":"130px"}},[e("el-form-item",{attrs:{label:"举报途径：",prop:"channel"}},[e("el-select",{staticClass:"box-width-100",attrs:{placeholder:"请选择举报途径",filterable:""},model:{value:a.complainData.channel,callback:function(t){a.$set(a.complainData,"channel",t)},expression:"complainData.channel"}},a._l(a.complainChannels,(function(a){return e("el-option",{key:a.id,attrs:{label:a.text,value:a.id}})})),1)],1),e("el-form-item",{attrs:{label:"标题：",prop:"title"}},[e("el-input",{attrs:{placeholder:"请输入投诉标题"},model:{value:a.complainData.title,callback:function(t){a.$set(a.complainData,"title","string"===typeof t?t.trim():t)},expression:"complainData.title"}})],1),e("el-form-item",{attrs:{label:"问题发生城市：",prop:"cityId"}},[e("el-select",{staticClass:"box-width-100",attrs:{filterable:"",placeholder:"请输入城市"},model:{value:a.complainData.cityId,callback:function(t){a.$set(a.complainData,"cityId",t)},expression:"complainData.cityId"}},a._l(a.cityList,(function(a){return e("el-option",{key:a.id,attrs:{label:a.text,value:a.id}})})),1)],1),e("el-form-item",{attrs:{label:"被举报员工：",prop:"employeeName"}},[e("el-input",{attrs:{placeholder:"请输入被举报员工"},model:{value:a.complainData.employeeName,callback:function(t){a.$set(a.complainData,"employeeName","string"===typeof t?t.trim():t)},expression:"complainData.employeeName"}})],1),e("el-form-item",{attrs:{label:"参与人：",prop:"joiner"}},[e("el-input",{attrs:{placeholder:"请输入参与人"},model:{value:a.complainData.joiner,callback:function(t){a.$set(a.complainData,"joiner","string"===typeof t?t.trim():t)},expression:"complainData.joiner"}})],1),e("el-form-item",{attrs:{label:"知情人：",prop:"insider"}},[e("el-input",{attrs:{placeholder:"请输入知情人"},model:{value:a.complainData.insider,callback:function(t){a.$set(a.complainData,"insider","string"===typeof t?t.trim():t)},expression:"complainData.insider"}})],1),e("el-form-item",{attrs:{label:"问题发生时间：",prop:"dateTime"}},[e("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date","value-format":"yyyy-MM-dd",format:"yyyy-MM-dd",placeholder:"请选择日期"},model:{value:a.complainData.dateTime,callback:function(t){a.$set(a.complainData,"dateTime",t)},expression:"complainData.dateTime"}})],1),e("el-form-item",{attrs:{label:"问题详情描述：",prop:"content"}},[e("el-input",{attrs:{type:"textarea",placeholder:"请输入问题的具体情况",maxlength:"3000",autosize:{minRows:2,maxRows:10},"show-word-limit":""},model:{value:a.complainData.content,callback:function(t){a.$set(a.complainData,"content",t)},expression:"complainData.content"}})],1),e("el-form-item",{attrs:{label:"调查建议：",prop:"investigationProposal"}},[e("el-input",{attrs:{type:"textarea",placeholder:"请输入调查建议",maxlength:"300",autosize:{minRows:2,maxRows:10},"show-word-limit":""},model:{value:a.complainData.investigationProposal,callback:function(t){a.$set(a.complainData,"investigationProposal","string"===typeof t?t.trim():t)},expression:"complainData.investigationProposal"}})],1),e("el-form-item",{attrs:{label:"上传图片凭证：",prop:"imgUrls"}},[a.showImgUpbtn?e("el-upload",{ref:"imgUpload",attrs:{action:"",accept:a.imgUploadData.fileTypeString,"http-request":a.imgUploadRequest,"show-file-list":!1,multiple:""}},[e("div",{staticClass:"img"},[e("i",{staticClass:"el-icon-plus add_img"})])]):a._e()],1),e("div",{staticClass:"uploadlist-wrap"},a._l(a.showImgUrls,(function(t,i){return e("div",{key:"img"+i,staticClass:"updata-wrap"},[e("image-swiper-viewer",{attrs:{url:t,urlList:a.showImgUrls,ids:i}}),e("div",{staticClass:"close",on:{click:function(t){return a.delUpelm("img",i)}}},[a._v(" X ")])],1)})),0),e("el-form-item",{attrs:{label:"上传音频凭证：",prop:"soundUrls"}},[a.showSoundUpbtn?e("el-upload",{ref:"upload",attrs:{accept:a.audioUploadData.fileTypeString,action:"","http-request":a.fnUploadSoundRequest,"show-file-list":!1,multiple:""}},[e("div",{staticClass:"sound"},[e("i",{staticClass:"el-icon-plus add_img"})])]):a._e()],1),e("div",{staticClass:"uploadlist-wrap"},a._l(a.showSoundUrls,(function(t,i){return e("div",{key:"sound"+i,staticClass:"updata-wrap sound-wrap"},[e("audio",{attrs:{src:t,controls:"controls"}}),e("div",{staticClass:"close",on:{click:function(t){return a.delUpelm("audio",i)}}},[a._v(" X ")])])})),0),e("p",{staticClass:"form-tit"},[a._v("举报人信息：")]),e("el-form-item",{attrs:{label:"举报人姓名：",prop:"name"}},[e("el-input",{attrs:{placeholder:"请输入举报人姓名"},model:{value:a.complainData.name,callback:function(t){a.$set(a.complainData,"name","string"===typeof t?t.trim():t)},expression:"complainData.name"}})],1),e("el-form-item",{attrs:{label:"举报人手机：",prop:"phone"}},[e("el-input",{attrs:{placeholder:"联系方式至少选填一项"},model:{value:a.complainData.phone,callback:function(t){a.$set(a.complainData,"phone","string"===typeof t?t.trim():t)},expression:"complainData.phone"}})],1),e("el-form-item",{attrs:{label:"举报人邮箱：",prop:"email"}},[e("el-input",{attrs:{placeholder:"联系方式至少选填一项"},model:{value:a.complainData.email,callback:function(t){a.$set(a.complainData,"email","string"===typeof t?t.trim():t)},expression:"complainData.email"}})],1),e("el-form-item",{attrs:{label:"举报人qq：",prop:"qq"}},[e("el-input",{attrs:{placeholder:"联系方式至少选填一项"},model:{value:a.complainData.qq,callback:function(t){a.$set(a.complainData,"qq","string"===typeof t?t.trim():t)},expression:"complainData.qq"}})],1),e("el-form-item",{attrs:{label:"举报人微信：",prop:"wechat"}},[e("el-input",{attrs:{placeholder:"联系方式至少选填一项"},model:{value:a.complainData.wechat,callback:function(t){a.$set(a.complainData,"wechat","string"===typeof t?t.trim():t)},expression:"complainData.wechat"}})],1),e("el-form-item",{attrs:{label:"订单ID：",prop:"orderId"}},[e("el-input",{attrs:{placeholder:"请输入订单ID"},model:{value:a.complainData.orderId,callback:function(t){a.$set(a.complainData,"orderId","string"===typeof t?t.trim():t)},expression:"complainData.orderId"}})],1),e("p",{staticClass:"form-tit"},[a._v("处理结果：")]),e("el-form-item",{attrs:{label:"请填写处理结果：",prop:"handleResult"}},[e("el-input",{attrs:{type:"textarea",placeholder:"请输入处理结果"},model:{value:a.complainData.handleResult,callback:function(t){a.$set(a.complainData,"handleResult","string"===typeof t?t.trim():t)},expression:"complainData.handleResult"}})],1)],1)],1),e("div",{staticClass:"form-btn-wrap"},[e("el-button",{attrs:{type:"primary"},on:{click:a.validSub}},[a._v("提交")])],1)])])],1),e("el-dialog",{attrs:{visible:a.dialogData.show,title:a.dialogData.title,width:"30%",center:!0},on:{"update:visible":function(t){return a.$set(a.dialogData,"show",t)}}},[e("div",{staticClass:"dialog-content"},[e("p",{staticClass:"content-tex save-warn-tex"},[a._v(a._s(a.dialogData.cnt))])]),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:a.closeDialog}},[a._v("确定")])],1)])],1)},o=[];e.d(t,"a",(function(){return i})),e.d(t,"b",(function(){return o}))},edfb:function(a,t,e){"use strict";e("af82"),e("9a14"),Object.defineProperty(t,"__esModule",{value:!0}),t.DataConfig=t.COMPLAIN_CHANNELS_INCLUD_ONLINE=t.COMPLAIN_CHANNELS=t.COMPLAIN_PROGRESS=void 0;var i=[{id:1,text:"未处理"},{id:2,text:"已处理"}];t.COMPLAIN_PROGRESS=i;var o=[{id:1,text:"邮箱举报"},{id:2,text:"电话举报"},{id:3,text:"信涵举报"}];t.COMPLAIN_CHANNELS=o;var n=[{id:1,text:"邮箱举报"},{id:2,text:"电话举报"},{id:3,text:"信涵举报"},{id:4,text:"线上举报"}];t.COMPLAIN_CHANNELS_INCLUD_ONLINE=n;var l={COMPLAIN_PROGRESS:i,COMPLAIN_CHANNELS:o,COMPLAIN_CHANNELS_INCLUD_ONLINE:n,getConfig:function(){var a=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e={};return t.forEach((function(t){e[t.toUpperCase()]=a[t.toUpperCase()]?a[t.toUpperCase()]:[]})),e}};t.DataConfig=l},fc7f:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=e("23f7"),o="/backend-api/bk-api-adjust-risk/list",n="/backend-api/bk-api-adjust-risk/initialize",l="/backend-api/bk-api-adjust-risk/detail",r="/backend-api/bk-api-adjust-risk/audit",s="/backend-api/complaint/list",c="/backend-api/complaint/add-complaint",p="/backend-api/complaint/complaint-handling",m="/backend-api/complaint/update-complaint-handling",d=function(a){return i.axios.get(o,{params:a})},u=function(){return i.axios.post(n)},f=function(a){return i.axios.post(l,a)},h=function(a){return i.axios.post(r,a)},g=function(a){return i.axios.get(s,{params:a})},v=function(a){return i.axios.post(c,a)},b=function(a){return i.axios.post(p,a)},w=function(a){return i.axios.post(m,a)},x={getPerformanceManageList:d,getRiskInitialize:u,getRiskInitDetail:f,getRiskAudit:h,getComplaintList:g,addComplaint:v,getComplaintDetail:b,updateComplaint:w},D=x;t.default=D}}]);