/*
 * @author: wsx
 * @Date: 2019-08-07 14:12:01
 * @description:
 */
import Vue from 'vue';
import Router from 'vue-router';
// 引入各个模块的路由
// 楼盘侧，楼盘对比和报错页面展示
import buildingSige from '@/pages/propertySide/buildingDictionary/route';
// 渠道侧
import bankRepayment from '@/pages/channelSide/bankRepayment/route';
// 楼盘管理
import houseManage from '@/pages/propertySide/houseManage/route';
// 微信托管，用于离职咨询师微信利用
import wechatCollocation from '@/pages/oldPassengerOperation/wechatCollocation/route';
// 城市开站配置
import cityConfiguration from '@/pages/propertySide/cityConfiguration/route';
// 城市费率
import rateSetting from '@/pages/rateSetting/route';
// 楼盘管理
import riskManage from '@/pages/consultor/riskManage/route';
// 老客运营，包括咨询师微信好友管理
import addressBook from '@/pages/oldPassengerOperation/addressBook/route';
// 楼盘侧-人工审核-图片审核页面
import ManualReview from '@/pages/propertySide/manualReview/route';
// 评价
import Evaluate from '@/pages/consultor/evaluate/route';
// sop模块路由
import sopRoute from '@/pages/consultor/sop/route'
// 移动端楼盘侧
import mHouseSide from '@/pages/mobile/house/route';
// 移动端咨询师侧
import mConsultorSide from '@/pages/mobile/consultor/route';
// 咨询师侧 找房工具
import searchTool from '@/pages/consultor/house/route';

// 纸质地图
import PaperMap from '@/pages/materials/paperMap/route';
const Login = () => import('@/pages/Login')
const Main = () => import('@/pages/Main')
const NoPermissions = () => import('@/pages/NoPermissions')

Vue.use(Router);


let router = new Router({
    mode: 'history',
    base: process.env.NODE_ENV == 'production'? '/dist' : '/',
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
            children: [
                // sop路由
                sopRoute,
                /* 楼盘侧所有路由 */
                buildingSige,
                /* 渠道侧所有路由 */
                bankRepayment,
                houseManage, // 楼盘管理路由
                /* 微信托管 */
                wechatCollocation,
                /* 城市开站配置 */
                cityConfiguration,
                /* 风控 业绩相关 */
                riskManage,
                /* 老客运营的微信好友管理所有路由 */
                addressBook,
                /* 城市费率 */
                rateSetting,
                /* 人工审核 */
                ManualReview,
                // 评价
                Evaluate,
                // 纸质地图
                PaperMap
            ]
        },
        /* 找房工具 */
        searchTool,
        /* 移动端楼盘侧 */
        mHouseSide,
        /* 移动端咨询师侧 */
        mConsultorSide,
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
