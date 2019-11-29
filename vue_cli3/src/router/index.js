/*
 * @author: wsx
 * @Date: 2019-08-07 14:12:01
 * @description:
 */
import Vue from 'vue';
import Router from 'vue-router';
// 引入各个模块的路由
// 楼盘侧，楼盘对比和报错页面展示
// import buildingSige from '@/pages/propertySide/buildingDictionary/route';
// 渠道侧
// import bankRepayment from '@/pages/channelSide/bankRepayment/route';
// 楼盘管理
// import houseManage from '@/pages/propertySide/houseManage/route';
// 微信托管，用于离职咨询师微信利用
// import wechatCollocation from '@/pages/wechatCollocation/route';
// 城市开站配置
// import cityConfiguration from '@/pages/propertySide/cityConfiguration/route';
// 城市费率
// import rateSetting from '@/pages/rateSetting/route';
// 楼盘管理
// import Performance from '@/pages/performance/route';
// 老客运营，包括咨询师微信好友管理
// import addressBook from '@/pages/oldPassengerOperation/addressBook/route';
// 楼盘侧-人工审核-图片审核页面
// import ManualReview from '@/pages/propertySide/manualReview/route';


const Login = () => import('@/pages/Login')
// TODO
const ExecutionDetail = () => import('@/pages/executive/ExecutionDetail')
const LabelList = () => import('@/pages/executive/LabelList')
const LabelHome = () => import('@/pages/executive/LabelHome')
const AppealManage = () => import('@/pages/executive/AppealManage')
const SopDetail = () => import('@/pages/executive/SopDetail')
const Main = () => import('@/pages/Main')
// TODO
const NoPermissions = () => import('@/pages/NoPermissions')
const ScreenPage = () => import('@/pages/searchTools/ScreenPage')
const SingleHouseShare = () => import('@/pages/searchTools/SingleHouseShare')
const MoreHouseShare = () => import('@/pages/searchTools/MoreHouseShare')
const ChooseHouseContrast = () => import('@/pages/searchTools/ChooseHouseContrast')
const HouseContrasts = () => import('@/pages/searchTools/HouseContrast')
const AppAnswerQuestion = () => import('@/pages/mobile/AppAnswerQuestion')
const AppAnswerDetail = () => import('@/pages/mobile/AppAnswerDetail')
const ServiceVoucherList = () => import('@/pages/mobile/service/ServiceVoucherList');
const ServiceVoucherDetail = () => import('@/pages/mobile/service/ServiceVoucherDetail');
const MobileLogin = () => import('@/pages/mobile/service/MobileLogin');
const UserSign = () => import('@/pages/mobile/service/UserSign');
const HousePurchaseKnowledge = () => import('@/pages/searchTools/HousePurchaseKnowledge');
// 纸质地图
const CutoutIndex = () => import('@/pages/searchTools/adminPage/CutoutIndex')
Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: '/dist',
    routes: [{
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                tit: '登录'
            }
        },
        {
            path: '/noPermissions',
            name: 'NoPermissions',
            component: NoPermissions,
            meta: {
                tit: '无权限'
            }
        },
        {
            path: '/',
            name: 'main',
            component: Main,
            children: [{
                    path: 'executionDetail',
                    name: 'executionDetail',
                    component: ExecutionDetail,
                    meta: {
                        tit: '执行力详情'
                    }
                },
                {
                    path: 'labelList',
                    name: 'labelList',
                    component: LabelList,
                    meta: {
                        tit: '标签列表页'
                    }
                },
                {
                    path: 'sopDetail',
                    name: 'sopDetail',
                    component: SopDetail,
                    meta: {
                        tit: 'SOP申诉详情页面'
                    }
                },
                {
                    path: 'labelHome',
                    name: 'labelHome',
                    component: LabelHome,
                    meta: {
                        tit: '标签首页'
                    }
                },
                {
                    path: 'appealManage',
                    name: 'AppealManage',
                    component: AppealManage,
                    meta: {
                        tit: '申诉管理页'
                    }
                },
                /* 楼盘侧所有路由 */
                // buildingSige,
                /* 渠道侧所有路由 */
                // bankRepayment,
                // 楼盘管理路由
                // houseManage,
                /* 微信托管 */
                // wechatCollocation,
                /* 城市开站配置 */
                // cityConfiguration,
                /* 风控 业绩相关 */
                // Performance,
                /* 老客运营的微信好友管理所有路由 */
                // addressBook,
                /* 城市费率 */
                // rateSetting,
                /* 人工审核 */
                // ManualReview
            ]
        },
        /* 找房工具---------------start */
        {
            path: '/screenPage',
            name: 'screenPage',
            component: ScreenPage,
            meta: {
                tit: '地图找房'
            }
        },
        {
            path: '/cutoutIndex',
            name: 'cutoutIndex',
            component: CutoutIndex,
            meta: {
                tit: '纸质地图'
            }
        },
        {
            path: '/singleHouseShare',
            name: 'singleHouseShare',
            component: SingleHouseShare,
            meta: {
                tit: '单楼盘分享'
            }
        },
        {
            path: '/moreHouseShare',
            name: 'moreHouseShare',
            component: MoreHouseShare,
            meta: {
                tit: '多楼盘分享'
            }
        },
        {
            path: '/chooseHouseContrast',
            name: 'chooseHouseContrast',
            component: ChooseHouseContrast,
            meta: {
                tit: '选择楼盘对比'
            }
        },
        {
            path: '/houseContrasts',
            name: 'houseContrasts',
            component: HouseContrasts,
            meta: {
                tit: '楼盘对比'
            }
        },
        {
            path: '/housePurchaseKnowledge',
            name: 'housePurchaseKnowledge',
            component: HousePurchaseKnowledge,
            meta: {
                tit: '购房知识'
            }
        },
        /* 支撑系统移动端页面 */
        {
            path: '/appAnswerQuestion',
            name: 'AppAnswerQuestion',
            component: AppAnswerQuestion,
            meta: {
                tit: '问题回答页'
            }
        },
        {
            path: '/appAnswerDetail',
            name: 'AppAnswerDetail',
            component: AppAnswerDetail,
            meta: {
                tit: '问题详情页'
            }
        },
        {
            path: '/mobileLogin',
            name: 'mobileLogin',
            component: MobileLogin,
            meta: {
                tit: '钉钉登录页'
            }
        },
        {
            path: '/serviceVoucherList',
            name: 'serviceVoucherList',
            component: ServiceVoucherList,
            meta: {
                tit: '服务确认单'
            }
        },
        {
            path: '/serviceVoucherDetail',
            name: 'serviceVoucherDetail',
            component: ServiceVoucherDetail,
            meta: {
                tit: '服务确认单'
            }
        },
        {
            path: '/userSign',
            name: 'userSign',
            component: UserSign,
            meta: {
                tit: '用户签字'
            }
        },
        /* 支撑系统移动端页面-----------end */
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 设置网页title
    if (to.meta) {
        document.title = to.meta.tit || '';
    }
    // 区分线上和测试环境，如果是正式环境，login路由无法使用
    let environment = process.env.NODE_ENV;
    if (environment === 'production') {
        if (to.path === '/login') {
            next({
                path: '/'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
router.afterEach((to, from) => {
    window.scrollTo(0, 0);
});
export default router;
