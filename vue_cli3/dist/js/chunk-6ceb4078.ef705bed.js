(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ceb4078"],{"09ee":function(t,e,n){"use strict";var i=n("91fe"),a=n("407d").find,r=n("5751"),o=n("6885"),c="find",s=!0,l=o(c);c in[]&&Array(1)[c]((function(){s=!1})),i({target:"Array",proto:!0,forced:s||!l},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),r(c)},"43ec":function(t,e,n){var i=n("abd8");e=i(!1),e.push([t.i,".edit-config[data-v-2944347d]{padding:20px 30px 0}.edit-config .conf-form[data-v-2944347d]{margin-top:20px;padding:15px 20px;background-color:#fff}.edit-config .conf-form .btn-del[data-v-2944347d]{height:40px;margin-left:10px;color:red}.edit-config[data-v-2944347d] .el-form-item__content{display:-webkit-box;display:-ms-flexbox;display:flex}.edit-config[data-v-2944347d] .el-form-item__content .el-input{width:300px}.edit-config .warning-msg[data-v-2944347d]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;line-height:26px;margin-left:25px;color:#e6a23c}.edit-config .warning-msg.indent[data-v-2944347d]{margin-left:65px}.edit-config .warning-msg .el-icon-question[data-v-2944347d]{font-size:18px;margin-top:5px;margin-right:6px;color:#e89b28}",""]),t.exports=e},"6a18":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("23f7"),a="/backend-api/expand/ex-contract-custom-cate-condition/get-is-relation-contract",r="/backend-api/expand/ex-contract-custom-cate-condition/index",o="/backend-api/expand/ex-contract-custom-cate-condition/edit",c="/backend-api/expand/ex-contract-custom-cate-condition/delete",s="/backend-api/select2/select2/get-all-city-code",l=function(t){return i.axios.get(a,{params:t})},u=function(t){return i.axios.get(r,{params:t})},d=function(t){return i.axios.post(o,t)},f=function(t){return i.axios.get(o,{params:{id:t}})},p=function(t){return i.axios.get(c,{params:{id:t}})},m=function(t){return i.axios.get(s,{params:{q:t}})},g={getIsrelationContractData:l,getConstractList:u,setConditionCategoryData:d,getConditionCategoryData:f,deleteConstractCategory:p,getCitys:m};e.default=g},"720a":function(t,e,n){"use strict";n.r(e);var i=n("ae60"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},a677:function(t,e,n){"use strict";var i=n("91fe"),a=n("6be9").includes,r=n("5751"),o=n("6885"),c=o("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:!c},{includes:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),r("includes")},ae60:function(t,e,n){"use strict";var i=n("2eb1");n("09ee"),n("af82"),n("a677"),n("e90c"),n("1a8c"),n("c1b0"),n("c354"),n("94ec"),n("9a14"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("63ff");var a=i(n("57f0")),r=i(n("6a18")),o={name:"EditConfig",data:function(){return{breabcrubName:"新增",confForm:{name:"",options:[{value:""},{value:""},{value:""}],citys:[]},cityOps:[],nameRule:{required:!0,message:"此项为必填项！",trigger:"blur"},optionRule:[{required:!0,message:"此项为必填项！",trigger:"blur"},{max:20,message:"最多输入20个汉字",trigger:"blur"}],cityRule:[{required:!0,message:"此项为必填项！",trigger:"change"}]}},created:function(){this.id=this.$route.query.id,this.suitCityArrSelect=[],this.conditionOptionsArrSelect=[],this.getApplyCity(),""!==this.id&&(this.breabcrubName="编辑",document.title="编辑",this.getConditionCategoryInfo())},methods:{getConditionCategoryInfo:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n,i,a,o,c,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.default.getConditionCategoryData(t.id);case 3:n=e.sent,i=n.data,a=i.code,o=i.data,c=i.msg,0===a?(s=t.confForm,t.updateDatetimeCheck=o.update_datetime_check,s.name=o.category_name,t.confForm.citys=o.suitCityArrSelect.map((function(e){return t.suitCityArrSelect.push({id:e.id,value:e.city_id}),e.city_id})),t.confForm.options=[],o.conditionOptionsArrSelect.forEach((function(e){t.conditionOptionsArrSelect.push({id:e.id,value:e.option_name}),t.confForm.options.push({value:e.option_name,id:e.id})}))):t.$message(c),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()},getSaveData:function(){var t=this,e=this.confForm.options.map((function(t,e){var n={option_name:t.value.trim(),id:t.id||""};return n})),n=this.confForm.citys.map((function(e,n){var i={id:"",city_id:e};return t.suitCityArrSelect&&void 0!==t.suitCityArrSelect.find((function(t){return t.value===e.value}))&&(i.id=t.suitCityArrSelect[n].id),i}));return{id:this.id,category_name:this.confForm.name.trim(),conditionOptionsArr:e,suitCityArr:n,update_datetime_check:this.updateDatetimeCheck}},saveConditionCategoryInfo:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n,i,a,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=t.getSaveData(),e.next=4,r.default.setConditionCategoryData(n);case 4:i=e.sent,a=i.data,o=a.code,a.data,c=a.msg,0===o?(t.$message(c),t.$router.push("/payment/contractClassifyConfigList")):t.$message(c),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))()},addMoreOption:function(){this.confForm.options.length>=20?this.$message.warning("系统限制最多可添加20个选项值，如有问题请联系产品！"):this.confForm.options.push({value:""})},delOption:function(t){this.confForm.options.length<=1?this.$alert("选项值至少存在一个","提示",{confirmButtonText:"确定"}):this.confForm.options.splice(t,1)},getApplyCity:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n,i,a,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.default.getCitys();case 3:n=e.sent,i=n.data,a=i.code,o=i.data,c=i.msg,0===a?t.cityOps=o:t.$message.error(c),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()},saveConfig:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return e.$message.error("请完善必填项后提交！"),!1;var n=e.validOpsValue(),i=n.isRepeat,a=n.repeatIdxArr;if(i){var r=a.map((function(t){return t.map((function(t){return"选项值".concat(t+1)})).join("、")})).join("，");e.$message({message:"".concat(r,"存在重复，请修改后保存！"),duration:5e3})}else e.saveConditionCategoryInfo()}))},validOpsValue:function(){for(var t=this.confForm.options.map((function(t){return t.value.trim()})),e=[],n=[],i=0;i<t.length;i++){var a=t[i];if(!n.includes(a)){for(var r=[i],o=i+1;o<t.length;o++){var c=t[o];a===c&&(r.push(o),n.push(a))}r.length>1&&e.push(r)}}return{isRepeat:e.length>0,repeatIdxArr:e}},handleCancle:function(){var t=this;this.$confirm("是否放弃编辑?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$router.push("/payment/contractClassifyConfigList")}))}}};e.default=o},b613:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"edit-config"},[n("el-breadcrumb",{staticClass:"bread-nav",attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",[n("a",{attrs:{href:"/"}},[t._v("首页")])]),n("el-breadcrumb-item",{attrs:{to:{path:"/payment/contractClassifyConfigList"}}},[t._v(" 合同分类条件配置列表 ")]),n("el-breadcrumb-item",[t._v(t._s(t.breabcrubName))])],1),n("el-form",{ref:"confForm",staticClass:"conf-form",attrs:{model:t.confForm,"label-width":"140px","label-position":"right"}},[n("el-form-item",{staticClass:"form-item",attrs:{label:"合同分类条件名称",prop:"name",rules:t.nameRule}},[n("el-input",{attrs:{clearable:"",maxlength:10},model:{value:t.confForm.name,callback:function(e){t.$set(t.confForm,"name",e)},expression:"confForm.name"}}),n("div",{staticClass:"warning-msg indent"},[n("i",{staticClass:"el-icon-question"}),t._v(" 合同是按照何种条件进行分类的，请高度总结下分类的名称！名称最多录入10个汉字！ 如：合同是按照客户社保是否在某地的有无来进行分类的，则可命名为“客户社保归属地”。 ")])],1),t._l(t.confForm.options,(function(e,i){return n("el-form-item",{key:i,attrs:{label:"选项值"+(i+1),prop:"options."+i+".value",rules:t.optionRule}},[n("el-input",{attrs:{maxlength:20,clearable:""},model:{value:e.value,callback:function(n){t.$set(e,"value",n)},expression:"item.value"}}),n("el-button",{staticClass:"btn-del",attrs:{type:"text",size:"medium"},on:{click:function(e){return t.delOption(i)}}},[t._v(" 删除 ")]),0===i?n("div",{staticClass:"warning-msg"},[n("i",{staticClass:"el-icon-question"}),t._v(" 此分类条件下有开发商时如何分类的，请总结分类依次添加！选项值必须简单易懂易于区分， 字数最多可输入20个汉字。如：开发商时按照客户户口是否在某某本地进行分类，选项值可添加2个：“户口在某某”，“户口不在某某” ")]):t._e()],1)})),n("el-form-item",[n("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.addMoreOption}},[t._v(" 增加更多选项值 ")])],1),n("el-form-item",{staticClass:"two-level",attrs:{label:"适用城市",prop:"citys",rules:t.cityRule,required:""}},[n("el-select",{ref:"bandSlt",attrs:{multiple:"",filterable:"",clearable:"",placeholder:"请选择"},model:{value:t.confForm.citys,callback:function(e){t.$set(t.confForm,"citys",e)},expression:"confForm.citys"}},t._l(t.cityOps,(function(t){return n("el-option",{key:t.id,attrs:{label:t.text,value:t.id}})})),1),n("div",{staticClass:"warning-msg indent"},[n("i",{staticClass:"el-icon-question"}),t._v(" 该分类条件适用于那些楼盘的城市！ ")])],1),n("el-form-item",[n("el-button",{on:{click:t.handleCancle}},[t._v("取消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.saveConfig("confForm")}}},[t._v(" 保存 ")])],1)],2)],1)},a=[];n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return a}))},c1b0:function(t,e,n){"use strict";var i=n("91fe"),a=n("0192"),r=n("f240"),o=n("684e"),c=n("ee6f"),s=n("3132"),l=n("01d7"),u=n("b1a1"),d=n("6885"),f=u("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,g=Math.min,v=9007199254740991,h="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var n,i,u,d,f,p,b=c(this),x=o(b.length),y=a(t,x),C=arguments.length;if(0===C?n=i=0:1===C?(n=0,i=x-y):(n=C-2,i=g(m(r(e),0),x-y)),x+n-i>v)throw TypeError(h);for(u=s(b,i),d=0;d<i;d++)f=y+d,f in b&&l(u,d,b[f]);if(u.length=i,n<i){for(d=y;d<x-i;d++)f=d+i,p=d+n,f in b?b[p]=b[f]:delete b[p];for(d=x;d>x-i+n;d--)delete b[d-1]}else if(n>i)for(d=x-i;d>y;d--)f=d+i-1,p=d+n-1,f in b?b[p]=b[f]:delete b[p];for(d=0;d<n;d++)b[d+y]=arguments[d+2];return b.length=x-i+n,u}})},c91c:function(t,e,n){"use strict";var i=n("d00a"),a=n.n(i);a.a},d00a:function(t,e,n){var i=n("43ec");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("85cb").default;a("0d895a62",i,!0,{sourceMap:!1,shadowMode:!1})},e90c:function(t,e,n){"use strict";var i=n("91fe"),a=n("fee7"),r=n("8c47"),o=n("fb11"),c=[].join,s=a!=Object,l=o("join",",");i({target:"Array",proto:!0,forced:s||!l},{join:function(t){return c.call(r(this),void 0===t?",":t)}})},f0d2:function(t,e,n){"use strict";n.r(e);var i=n("b613"),a=n("720a");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("c91c");var o=n("5511"),c=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,"2944347d",null);e["default"]=c.exports}}]);