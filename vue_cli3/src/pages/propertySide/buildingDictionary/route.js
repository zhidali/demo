/*
 * 楼盘侧路由
* */
const BuildingIndex = () => import('./BuildingIndex');
const BuildingCompare = () => import('./BuildingCompare');
const HouseContrast = () => import('./HouseContrast');
const BuildInfoContrast = () => import('./BuildInfoContrast');
const Changedetails = () => import('./Changedetails');
const BuildMessageAudit = () => import('./BuildMessageAudit');
// 变更通知录入页
const ChangeInfoEntering = () => import('./ChangeInfoEntering');
// 楼盘信息更新详情页
const HousesInfoUpdateDetail = () => import('./HousesInfoUpdateDetail');
// 楼盘动销更新列表
const BuildSalesInfoUpdate = () => import('./BuildSalesInfoUpdate');
const BuildHouseDynamicInfo = () => import('./BuildHouseDynamicInfo');

export default {
  path: 'building',
  name: 'buildingIndex',
  component: BuildingIndex,
  children: [
    {
      path: 'buildingCompare',
      name: 'BuildingCompare',
      component: BuildingCompare,
      meta: {
        tit: '楼盘信息对比页'
      }
    },
    {
      path: 'houseContrast',
      name: 'HouseContrast',
      component: HouseContrast,
      meta: {
        tit: '户型信息对比页'
      }
    },
    {
      path: 'buildInfoContrast',
      name: 'BuildInfoContrast',
      component: BuildInfoContrast,
      meta: {
        tit: '楼栋信息对比页'
      }
    },
    /* 运营楼盘信息审核>>>变更详情页面 */
    {
      path: 'changedetails',
      name: 'Changedetails',
      component: Changedetails,
      meta: {
        tit: '变更详情'
      }
    },
    // 运营楼盘信息审核
    {
      path: 'buildMessageAudit',
      name: 'BuildMessageAudit',
      component: BuildMessageAudit,
      meta: {
        tit: '楼盘动销信息审核'
      }
    },
    // 商务变更信息录入页面
    {
        path: 'changeInfoEntering',
        name: 'ChangeInfoEntering',
        component: ChangeInfoEntering,
        meta: {
          tit: '信息录入'
        }
    },
    // 楼盘信息更新详情页
    {
        path: 'housesInfoUpdateDetail',
        name: 'HousesInfoUpdateDetail',
        component: HousesInfoUpdateDetail,
        meta: {
          tit: '楼盘信息更新详情'
        }
    },
    // 楼盘动销信息更新列表
    {
      path: 'buildSalesInfoUpdate',
      name: 'BuildSalesInfoUpdate',
      component: BuildSalesInfoUpdate,
      meta: {
        tit: '楼盘动销信息更新列表'
      }
    }
  ]
};
