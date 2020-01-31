(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02877aa2"],{"13d3":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sales-box"},[a("el-breadcrumb",{staticClass:"bread-crumb-box",attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[a("a",{attrs:{href:"/"}},[e._v("首页")])]),a("el-breadcrumb-item",[e._v("楼盘分级任务列表")])],1),a("div",{staticClass:"sales-content"},[a("el-form",{ref:"searchForm",attrs:{inline:!0,model:e.searchForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"城市：",prop:"selCityVal"}},[a("el-select",{attrs:{placeholder:"请选择",filterable:"",clearable:""},on:{change:e.cityChangeList},model:{value:e.searchForm.selCityVal,callback:function(t){e.$set(e.searchForm,"selCityVal",t)},expression:"searchForm.selCityVal"}},e._l(e.searchForm.selCityOpations,(function(e){return a("el-option",{key:e.id,attrs:{label:e.text,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"楼盘名称：",prop:"selBuildingNameVal"}},[a("el-select",{attrs:{placeholder:"请选择",filterable:"",remote:"","remote-method":e.getProjectNameSelectList,loading:e.searchForm.searchLoading},on:{focus:e.focusGetSelList},model:{value:e.searchForm.selBuildingNameVal,callback:function(t){e.$set(e.searchForm,"selBuildingNameVal",t)},expression:"searchForm.selBuildingNameVal"}},e._l(e.searchForm.selBuildingNameOpations,(function(e){return a("el-option",{key:e.id,attrs:{label:e.text,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"楼盘ID：",prop:"buildingIdVal"}},[a("el-input",{attrs:{placeholder:"请输入楼盘ID"},model:{value:e.searchForm.buildingIdVal,callback:function(t){e.$set(e.searchForm,"buildingIdVal",t)},expression:"searchForm.buildingIdVal"}})],1),a("el-form-item",{attrs:{label:"合作状态：",prop:"selIsCooperationVal"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{focus:e.getProjectConfigList},model:{value:e.searchForm.selIsCooperationVal,callback:function(t){e.$set(e.searchForm,"selIsCooperationVal",t)},expression:"searchForm.selIsCooperationVal"}},e._l(e.searchForm.selIsCooperationOpations,(function(e){return a("el-option",{key:e.id,attrs:{label:e.text,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"楼盘等级：",prop:"selBuildingRankVal"}},[a("el-select",{attrs:{placeholder:"请选择",multiple:""},on:{focus:e.getProjectConfigList},model:{value:e.searchForm.selBuildingRankVal,callback:function(t){e.$set(e.searchForm,"selBuildingRankVal",t)},expression:"searchForm.selBuildingRankVal"}},e._l(e.searchForm.selBuildingRankOpations,(function(e){return a("el-option",{key:e.id,attrs:{label:e.text,value:e.id}})})),1)],1),a("div",{staticClass:"btn-box"},[a("el-button",{on:{click:function(t){return e.resetForm("searchForm")}}},[e._v("重置")]),a("el-button",{attrs:{type:"primary"},on:{click:e.searchList}},[e._v(" 搜索 ")])],1)],1),a("div",{staticClass:"table-box"},[a("div",{staticClass:"data-show-box"},[a("span",[e._v("共"+e._s(e.pageList.totalNum)+"条数据,第"+e._s(e.pageList.startNum)+"-"+e._s(e.pageList.endNum)+"条数据")]),a("el-button",{attrs:{type:"text"},on:{click:e.onlyLookFirstProject}},[e._v(" 仅看1、2级的合作和外联楼盘 ")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.projectTableData,border:""}},[a("el-table-column",{attrs:{prop:"city_text",label:"城市",width:"80"}}),a("el-table-column",{attrs:{prop:"project_name",label:"楼盘名称"}}),a("el-table-column",{attrs:{prop:"project_id",label:"楼盘ID",width:"100"}}),a("el-table-column",{attrs:{label:"合作状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[e._v(e._s(t.row.cooperate_status_text))])]}}])}),a("el-table-column",{attrs:{prop:"project_level_text",label:"楼盘等级",width:"100"}}),a("el-table-column",{attrs:{prop:"uv_update_time",label:"分级更新时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[e._v(e._s(e.filterDate(t.row.uv_update_time,"YYYY-MM-DD HH:mm:ss")))])]}}])}),a("el-table-column",{scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:e.sortList}},[e._v(" 本周信息更新度 ")])]}},{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.updateInfoPage(t.row.project_id)}}},[e._v(" "+e._s(t.row.update_rate)+" ")])]}}])}),a("el-table-column",{attrs:{width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.updateInfoPage(t.row.project_id)}}},[e._v(" "+e._s(t.row.business_update_rate)+" ")])]}}])},[a("template",{slot:"header"},[a("el-button",{attrs:{type:"text"},on:{click:e.businessUpdateSortList}},[e._v(" 本周信息商务更新度 ")])],1)],2),a("el-table-column",{attrs:{prop:"dongtai_update_num",label:"近30天动态更新量"}}),a("el-table-column",{attrs:{label:"本月缺少的动态更新量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(Number(t.row.lack_dongtai_update_num)<0?"超出要求"+Math.abs(t.row.lack_dongtai_update_num)+"个":t.row.lack_dongtai_update_num)+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.businessChange(t.row.project_id)}}},[e._v(" 商务变更 ")])],1),a("p",[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.dynamicChange(t.row.project_id)}}},[e._v(" 动态更新 ")])],1)]}}])})],1),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":e.pageList.pageSize,"hide-on-single-page":!0,total:e.pageList.totalNum,"current-page":e.pageList.scurrentPage},on:{"update:currentPage":function(t){return e.$set(e.pageList,"scurrentPage",t)},"update:current-page":function(t){return e.$set(e.pageList,"scurrentPage",t)},"current-change":e.currentChange}})],1)],1)],1)},s=[];a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return s}))},"19d2":function(e,t,a){var r=a("a435");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var s=a("85cb").default;s("225ed607",r,!0,{sourceMap:!1,shadowMode:!1})},"1cd1":function(e,t,a){"use strict";var r=a("2eb1");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("63ff");var s=r(a("57f0")),o=r(a("6bf2")),n=r(a("4b55")),i={name:"BuildSalesInfoUpdate",data:function(){return{searchForm:{selCityVal:"",selCityOpations:[],selBuildingNameVal:"",selBuildingNameOpations:[],buildingIdVal:"",selIsCooperationVal:"",selIsCooperationOpations:[],selBuildingRankVal:[],selBuildingRankOpations:[],searchLoading:!1},pageList:{totalNum:0,pageSize:20,scurrentPage:1,startNum:0,endNum:0},sortVal:"asc",businessUpdateSortVal:"asc",projectTableData:[]}},mounted:function(){this.getCitySelectList(),this.currentChange(1),this.getProjectConfigList()},methods:{updateInfoPage:function(e){this.$router.push({path:"/building/HousesInfoUpdateDetail",query:{projectId:e}})},businessChange:function(e){var t=this.$router.resolve({path:"/building/changeInfoEntering",query:{projectId:e}});window.open(t.href)},dynamicChange:function(e){window.open("/index.php?r=cj-project-dynamic-info%2Findex&project_id=".concat(e,"&page_tag=dynamic-info&show=1"))},onlyLookFirstProject:function(){this.searchForm.selBuildingRankVal=[1,2],this.searchForm.selIsCooperationVal=4;var e={project_level:this.searchForm.selBuildingRankVal,is_cooperate:this.searchForm.selIsCooperationVal};this.getProjectLevelList(e)},sortList:function(){var e;"asc"==this.sortVal?(this.sortVal="desc",e={u_sort:"asc"}):(this.sortVal="asc",e={u_sort:"desc"}),this.getProjectLevelList(e)},businessUpdateSortList:function(){var e;"asc"==this.businessUpdateSortVal?(this.businessUpdateSortVal="desc",e={b_u_sort:"asc"}):(this.businessUpdateSortVal="asc",e={b_u_sort:"desc"}),this.getProjectLevelList(e)},currentChange:function(e){var t={page:e,city_id:this.searchForm.selCityVal,project_id:this.searchForm.buildingIdVal||this.searchForm.selBuildingNameVal,project_level:this.searchForm.selBuildingRankVal,is_cooperate:this.searchForm.selIsCooperationVal};e>1?(this.pageList.startNum=1===e?1:20*(e-1)+1,this.pageList.endNum=Math.ceil(this.pageList.totalNum/this.pageList.pageSize)===e?this.pageList.totalNum:20*e):(this.pageList.startNum=1,this.pageList.endNum=20),this.getProjectLevelList(t)},searchList:function(){var e={city_id:this.searchForm.selCityVal,project_id:this.searchForm.buildingIdVal||this.searchForm.selBuildingNameVal,project_level:this.searchForm.selBuildingRankVal,is_cooperate:this.searchForm.selIsCooperationVal};this.getProjectLevelList(e),this.currentChange(1)},getProjectLevelList:function(e){var t=this;return(0,s.default)(regeneratorRuntime.mark((function a(){var r,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,!e){a.next=7;break}return a.next=4,n.default.getProjectLevelListData(e);case 4:r=a.sent,a.next=10;break;case 7:return a.next=9,n.default.getProjectLevelListData();case 9:r=a.sent;case 10:s=r,o=s.data,0===o.code&&(t.projectTableData=o.data.project_level_info,t.pageList.totalNum=o.data.total_count),a.next=17;break;case 14:a.prev=14,a.t0=a["catch"](0),console.log(a.t0);case 17:case"end":return a.stop()}}),a,null,[[0,14]])})))()},getProjectConfigList:function(){var e=this;return(0,s.default)(regeneratorRuntime.mark((function t(){var a,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={type:[29,26],city_id:e.searchForm.selCityVal},t.prev=1,t.next=4,n.default.getProjectConfigListData(a);case 4:r=t.sent,s=r.data,0===s.code&&(e.searchForm.selIsCooperationOpations=s.data.cooperate_type,e.searchForm.selBuildingRankOpations=s.data.project_level),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,9]])})))()},getCitySelectList:function(){var e=this;return(0,s.default)(regeneratorRuntime.mark((function t(){var a,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={q:""},t.next=3,n.default.getProjectLevelCityListData(a);case 3:r=t.sent,s=r.data,0===s.code&&(e.searchForm.selCityOpations=s.data);case 6:case"end":return t.stop()}}),t)})))()},cityChangeList:function(){this.searchForm.selBuildingNameVal="",this.searchForm.selBuildingNameOpations=[]},focusGetSelList:function(){this.getProjectNameSelectList("")},getProjectNameSelectList:function(e){var t=this;return(0,s.default)(regeneratorRuntime.mark((function a(){var r,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.searchForm.searchLoading=!0,r={q:e,city_id:t.searchForm.selCityVal>"0"?t.searchForm.selCityVal:""},a.prev=2,a.next=5,n.default.getProjectNameListData(r);case 5:s=a.sent,o=s.data,0===o.code?(t.searchForm.searchLoading=!1,t.searchForm.selBuildingNameOpations=o.data):t.searchForm.searchLoading=!1,a.next=14;break;case 10:a.prev=10,a.t0=a["catch"](2),console.log(a.t0),t.searchForm.searchLoading=!1;case 14:case"end":return a.stop()}}),a,null,[[2,10]])})))()},filterDate:function(e,t){return""===e?"":(0,o.default)(1e3*e).format("YYYY-MM-DD HH:mm:ss")},resetForm:function(e){this.$refs[e].resetFields(),this.pageList={totalNum:0,pageSize:20,startNum:1,endNum:20,scurrentPage:1},this.getProjectLevelList()}}};t.default=i},"33a2":function(e,t,a){"use strict";var r=a("19d2"),s=a.n(r);s.a},"4b55":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("23f7"),s="/backend-api/project/cj-project-level/city-list",o="/backend-api/project/get-project-name-list",n="/backend-api/common/get-project-config",i="/backend-api/project/cj-project-level/index",l=function(e){return r.axios.get(s,{params:e})},c=function(e){return r.axios.get(o,{params:e})},u=function(e){return r.axios.get(i,{params:e})},d=function(e){return r.axios.post(n,e)},p={getProjectLevelCityListData:l,getProjectNameListData:c,getProjectConfigListData:d,getProjectLevelListData:u};t.default=p},"4ed5":function(e,t,a){"use strict";a.r(t);var r=a("13d3"),s=a("e8f4");for(var o in s)"default"!==o&&function(e){a.d(t,e,(function(){return s[e]}))}(o);a("33a2");var n=a("5511"),i=Object(n["a"])(s["default"],r["a"],r["b"],!1,null,"c32ebeb4",null);t["default"]=i.exports},a435:function(e,t,a){var r=a("abd8");t=r(!1),t.push([e.i,".sales-box[data-v-c32ebeb4],.sales-box .sales-content[data-v-c32ebeb4]{padding:20px;-webkit-box-sizing:border-box;box-sizing:border-box}.sales-box .sales-content[data-v-c32ebeb4]{width:100%;background:#fff}.sales-box .sales-content .btn-box[data-v-c32ebeb4]{margin-top:40px;text-align:center}.sales-box .sales-content .btn-box[data-v-c32ebeb4] .el-button{width:120px;margin-right:20px}.sales-box .sales-content .table-box[data-v-c32ebeb4]{margin-top:40px}.sales-box .sales-content .table-box[data-v-c32ebeb4] .el-pagination{text-align:center;margin-top:30px}.sales-box .sales-content .table-box .data-show-box span[data-v-c32ebeb4]{font-size:14px}",""]),e.exports=t},e8f4:function(e,t,a){"use strict";a.r(t);var r=a("1cd1"),s=a.n(r);for(var o in r)"default"!==o&&function(e){a.d(t,e,(function(){return r[e]}))}(o);t["default"]=s.a}}]);