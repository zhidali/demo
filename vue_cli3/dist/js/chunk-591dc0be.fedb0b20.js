(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-591dc0be"],{"140c":function(e,t,a){"use strict";a.r(t);var r=a("2360"),i=a.n(r);for(var n in r)"default"!==n&&function(e){a.d(t,e,(function(){return r[e]}))}(n);t["default"]=i.a},2360:function(e,t,a){"use strict";var r=a("2eb1");a("4178"),a("86dd"),a("af82"),a("3f36"),a("f4dd"),a("79dd"),a("9a14"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("63ff");var i=r(a("57f0")),n=r(a("289c")),s=a("f946"),l=r(a("c667")),o=a("08c1");function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){(0,n.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var u={name:"wx-friend-list",data:function(){return{zxsModel:"",zxsManaModel:"",zxsLeadModel:"",workWxModel:"",currentStart:"",currentEnd:"",isFinishGroup:null,isFinishBind:null,cityId:"",zxsList:[],zxsLeadList:[],zxsManaList:[],workWxList:[],tableList:[],pageLimit:20,dataSum:0,isPage:!1,tableLabel:[],page:1,tbLoading:!1,curRole:"",cityList:[]}},created:function(){this.getCityList(),this.getEmployeeList(),this.getEmployeeLeaderList(),this.getEmployeeManaList()},mounted:function(){var e=this;this.$nextTick((function(){e.doSearch(e.page),e.curRole=e.employeeName.role}))},computed:d({},(0,o.mapState)({employeeName:function(e){return e.employeeName},uid:function(e){return e.uid}})),methods:{turnToCheck:function(e){this.$router.push({path:"/weChatAddressBook/addressBookList",query:{value:1,uid:e.employee_id}})},getTableData:function(){0!==this.dataSum?(this.isPage=!0,this.pageNum=Math.ceil(this.dataSum/this.pageLimit),this.leftPage=parseInt(this.dataSum%this.pageLimit),1===this.pageNum?(this.currentStart=1,this.currentEnd=this.dataSum):1===this.page&&(this.currentStart=1,this.currentEnd=this.pageLimit)):(this.dataSum=0,this.currentStart=0,this.currentEnd=0,this.page=1,this.isPage=!1)},pageChange:function(e){this.pageUpdate(e),0===this.leftPage?(this.currentStart=(this.page-1)*this.pageLimit+1,this.currentEnd=this.page*this.pageLimit):this.page===this.pageNum?(this.currentStart=(this.page-1)*this.pageLimit+1,this.currentEnd=this.currentStart-1+this.leftPage):(this.currentStart=(this.page-1)*this.pageLimit+1,this.currentEnd=this.page*this.pageLimit)},getCityList:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,s.getCity)("1");case 3:a=t.sent,r=a.data,0===r.code&&Array.isArray(r.data)&&(e.cityList=r.data),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},getEmployeeList:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var a,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a={q:"",header_manager_id:"",city_id:"",department_id:"",role:"header",status:"1"},t.next=4,(0,s.getEmployee)(a);case 4:r=t.sent,i=r.data,0===i.code&&Array.isArray(i.data)&&(e.zxsList=i.data),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},getEmployeeLeaderList:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var a,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a={q:"",city_id:""},t.next=4,(0,s.getEmployeeLeader)(a);case 4:r=t.sent,i=r.data,0===i.code&&Array.isArray(i.data)&&(e.zxsLeadList=i.data),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},getEmployeeManaList:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var a,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a={q:"",header_manager_id:"",city_id:"",department_id:"",role:"admin",status:"1"},t.next=4,(0,s.getEmployee)(a);case 4:r=t.sent,i=r.data,0===i.code&&Array.isArray(i.data)&&(e.zxsManaList=i.data),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},getWorkWxList:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var a,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a={q:""},t.next=4,(0,s.getZxsWx)(a);case 4:r=t.sent,i=r.data,0===i.code&&Array.isArray(i.list)&&(e.workWxList=i.list),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},pageUpdate:function(e){this.page=e,this.doSearch(e)},resetSearch:function(){this.zxsModel="",this.zxsManaModel="",this.zxsLeadModel="",this.cityId="",this.workWxModel="",this.isFinishGroup=null,this.isFinishBind=null,this.doSearch(1)},tableHeaderColor:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(0===t)return"background-color: #f9f9f9;color: #333;"},doSearch:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var r,i,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.tbLoading=!0,r={city_id:t.cityId,employee_id:t.zxsModel,employee_leader_id:t.zxsLeadModel,employee_manager_id:t.zxsManaModel,employee_wx_id:t.workWxModel,is_finish_group:t.isFinishGroup,is_finish_bind:t.isFinishBind,page:parseInt(e)},a.prev=2,a.next=5,l.default.getWechatFriendList(r);case 5:i=a.sent,n=i.data,0===n.code?(t.tbLoading=!1,t.dataSum=parseInt(n.data.total),t.tableList=n.data.list,t.getTableData()):t.tbLoading=!1,a.next=14;break;case 10:a.prev=10,a.t0=a["catch"](2),console.log(a.t0),t.tbLoading=!1;case 14:case"end":return a.stop()}}),a,null,[[2,10]])})))()}}};t.default=u},8567:function(e,t,a){"use strict";var r=a("be05"),i=a.n(r);i.a},be05:function(e,t,a){var r=a("ca55");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=a("85cb").default;i("e1a47786",r,!0,{sourceMap:!1,shadowMode:!1})},bfcc:function(e,t,a){"use strict";var r=a("c0dd"),i=a.n(r);i.a},c0dd:function(e,t,a){var r=a("d3dd");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=a("85cb").default;i("77d3446a",r,!0,{sourceMap:!1,shadowMode:!1})},c30b:function(e,t,a){"use strict";a.r(t);var r=a("d90a"),i=a("140c");for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);a("8567"),a("bfcc");var s=a("5511"),l=Object(s["a"])(i["default"],r["a"],r["b"],!1,null,"624834f5",null);t["default"]=l.exports},c667:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("23f7"),i="/backend-api/we-chat-manage/chat-record",n="/backend-api/we-chat-manage/wechat-list",s=function(e){return r.axios.get(i,{params:e})},l=function(e){return r.axios.post(n,e)},o={getWechatRecord:s,getWechatFriendList:l},c=o;t.default=c},ca55:function(e,t,a){var r=a("abd8");t=r(!1),t.push([e.i,".content-main[data-v-624834f5]{padding:0 15px}.form-table-box[data-v-624834f5]{background-color:#fff}.order-search[data-v-624834f5]{overflow:hidden}.order-search[data-v-624834f5] .el-date-editor,.order-search[data-v-624834f5] .el-select{width:100%;height:40px;-webkit-box-sizing:border-box;box-sizing:border-box}.order-search[data-v-624834f5] .el-select>>>.el-input{height:40px}.order-search[data-v-624834f5] .el-range-input{background-color:#fff;font-size:12px;line-height:32px}.order-search[data-v-624834f5] .el-date-editor .el-range-separator{font-size:12px}.order-search .fixHeight[data-v-624834f5]{height:40px}.order-search[data-v-624834f5] .el-date-editor .date-tip-logo{display:none}.form-table-box .filter-link-more[data-v-624834f5]{float:right;padding:9px 20px;margin-top:6px}.order-search>.s-query>li .td[data-v-624834f5]{height:40px}.s-query>li.long-column[data-v-624834f5]{width:360px}.s-query>li.margin-next[data-v-624834f5]{margin-left:20px}.form-tip-box[data-v-624834f5]{color:#999}.form-table-box .batch-btn-area[data-v-624834f5]{text-align:right}.batch-form-box[data-v-624834f5] .el-form-item{margin-bottom:0}.data-stat[data-v-624834f5]{overflow:hidden;padding:10px 0 20px;font-size:14px}",""]),e.exports=t},d3dd:function(e,t,a){var r=a("abd8");t=r(!1),t.push([e.i,".wx-list-table[data-v-624834f5] .el-table td .cell,.wx-list-table[data-v-624834f5] .el-table th .cell{font-size:14px;color:#333;text-align:center;font-weight:400}.wx-list-table[data-v-624834f5] .el-table .opereate-cell{color:#2e9ae2;cursor:pointer}.wx-list-table .pagination[data-v-624834f5]{text-align:center;padding:20px 0;background:#fff}",""]),e.exports=t},d90a:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"el-row"},[a("el-col",{staticClass:"content-main",attrs:{span:24}},[a("el-breadcrumb",{staticClass:"bread-crumb-box",attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[a("a",{attrs:{href:"/"}},[e._v("首页")])]),a("el-breadcrumb-item",[e._v("微信好友管理")])],1),a("div",{staticClass:"v-box form-table-box"},[a("div",{staticClass:"hd"},[a("h2",[e._v("微信好友管理")])]),a("div",{staticClass:"bd"},[a("div",{staticClass:"order-search"},[a("ul",{staticClass:"s-query"},[a("li",[a("div",{staticClass:"th"},[e._v("城市：")]),a("div",{staticClass:"td"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.cityId,callback:function(t){e.cityId=t},expression:"cityId"}},e._l(e.cityList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.text,value:e.id}})})),1)],1)]),a("li",[a("div",{staticClass:"th"},[e._v("咨询师：")]),a("div",{staticClass:"td"},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.zxsModel,callback:function(t){e.zxsModel=t},expression:"zxsModel"}},e._l(e.zxsList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.text,value:e.id}})})),1)],1)]),a("li",[a("div",{staticClass:"th"},[e._v("咨询师主管：")]),a("div",{staticClass:"td"},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.zxsLeadModel,callback:function(t){e.zxsLeadModel=t},expression:"zxsLeadModel"}},e._l(e.zxsLeadList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.text,value:e.id}})})),1)],1)]),a("li",[a("div",{staticClass:"th"},[e._v("咨询经理：")]),a("div",{staticClass:"td"},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.zxsManaModel,callback:function(t){e.zxsManaModel=t},expression:"zxsManaModel"}},e._l(e.zxsManaList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.text,value:e.id}})})),1)],1)]),a("li",[a("div",{staticClass:"th"},[e._v("是否完成分组：")]),a("div",{staticClass:"td"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.isFinishGroup,callback:function(t){e.isFinishGroup=t},expression:"isFinishGroup"}},[a("el-option",{attrs:{label:"请选择",value:""}}),a("el-option",{attrs:{label:"是",value:"1"}}),a("el-option",{attrs:{label:"否",value:"0"}})],1)],1)]),a("li",[a("div",{staticClass:"th"},[e._v("是否完成绑定：")]),a("div",{staticClass:"td"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.isFinishBind,callback:function(t){e.isFinishBind=t},expression:"isFinishBind"}},[a("el-option",{attrs:{label:"请选择",value:""}}),a("el-option",{attrs:{label:"是",value:"1"}}),a("el-option",{attrs:{label:"否",value:"0"}})],1)],1)])])]),a("div",{staticClass:"btn-area"},[a("el-button",{on:{click:e.resetSearch}},[e._v("重置")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.doSearch(1)}}},[e._v("搜索")])],1)])]),a("div",{staticClass:"v-box form-table-box wx-list-table"},[a("div",{staticClass:"bd"},[a("div",{staticClass:"search-result"},[a("div",{staticClass:"data-stat"},[a("el-row",[a("el-col",{attrs:{span:10}},[e._v(" 第"+e._s(e.currentStart)+"-"+e._s(e.currentEnd)+"条，共"+e._s(e.dataSum)+"条数据 ")])],1)],1),a("div",{staticClass:"table-wrap"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tbLoading,expression:"tbLoading"}],ref:"tableFixedWrap",attrs:{border:"",data:e.tableList,size:"small","row-class-name":"row","cell-class-name":"column","highlight-current-row":!0,"header-cell-style":e.tableHeaderColor}},[a("el-table-column",{attrs:{"min-width":"150",prop:"city",label:"城市"}}),a("el-table-column",{attrs:{"min-width":"150",prop:"employee_name",label:"咨询师"}}),a("el-table-column",{attrs:{"min-width":"150",prop:"employee_leader",label:"咨询主管"}}),a("el-table-column",{attrs:{"min-width":"150",prop:"employee_manager",label:"咨询经理"}}),a("el-table-column",{attrs:{"min-width":"150",prop:"friend_count",label:"好友"}}),a("el-table-column",{attrs:{"min-width":"150",prop:"is_finish_group",label:"是否完成分组"}}),a("el-table-column",{attrs:{"min-width":"150",prop:"is_finish_bind",label:"是否完成绑定"}}),a("el-table-column",{attrs:{"min-width":"150",prop:"operate",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"opereate-cell",on:{click:function(a){return e.turnToCheck(t.row)}}},[e._v("查看好友")])]}}])})],1)],1),e.isPage?a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":e.pageLimit,"current-page":e.page,total:e.dataSum},on:{"update:currentPage":function(t){e.page=t},"update:current-page":function(t){e.page=t},"current-change":e.pageChange}})],1):e._e()])])])],1)],1)},i=[];a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return i}))}}]);