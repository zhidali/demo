/*
 * @Name: sop路由文件
 * @Description: 存放sop所有页面组件路径
 * @Author: xiejiaxin
 * @Date: 2019-12-18
 */
const ExecutionDetail = () => import('./ExecutionDetail')
const LabelList = () => import('./LabelList')
const LabelHome = () => import('./LabelHome')
const AppealManage = () => import('./AppealManage')
const SopDetail = () => import('./SopDetail')
const SopIndex = () => import('./SopIndex')
export default {
	path: '/',
    name: '',
    component: SopIndex,
    children: [
		{
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
		}
    ]
}
