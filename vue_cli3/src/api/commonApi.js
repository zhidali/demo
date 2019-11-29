/* 公共api */
import {axios} from '@/assets/axios';

const cityUrl = '/backend-api/select2/select2/get-city-list-select2';
// 获取咨询师
const employeeUrl = '/backend-api/select2/select2/get-employee-list-select2';
// 获取咨询师主管
const employeeLeaderApi = '/backend-api/select2/select2/get-team-leader-name-list-select2';
// 获取上传签名API
const uploadSignApi = '/backend-api/bk-api-upload/get-upload-sign'
// 登录api
const login = '/backend-api/api-user/login';
// 获取咨询师工作微信API
const zxsWxApi = '/backend-api/select2/select2/gew-wx-dropdown-list';
// 分页获取咨询师api
const newEmployeeApi = '/backend-api/select2/select2/new-get-employee-list-select2';
// 获取用户角色权限列表
const roleListApi = '/backend-api/common/get-role-list';
// 切换用户角色权限api
const switchRoleApi = '/backend-api/common/switch-role';
// 获取城市信息接口，参数type 城市类型（如需全国请传1）
export const getCity = (type) => axios.get(cityUrl, {params: {city_type: type}})

/* 获取员工，可更具不同参数筛选不同类型员工
 * options : {
 *  q: '', 输入搜索的内容
 *  role: '' 搜索的角色
 *  header_manager_id: ''	获取某个咨询师组所有成员
 *  city_id: '' 城市id
 *  department_id: '' 部门id
 *  status: '' 在职状态
 * }
 *@getEmployee 获取员工
 *@param{Object} options 参数对象集合
 *······
 *参考公共接口：http://ams.julive.com/#/home/project/inside/api/detail?groupID=-1&apiID=1911&projectName=%E6%94%AF%E6%92%91%E7%B3%BB%E7%BB%9F-%E5%85%AC%E5%85%B1%E6%8E%A5%E5%8F%A3&projectID=131
 *@return {Promise} 返回异步resolve后的Promise
*/
export const getEmployee = (options) => axios.get(employeeUrl, {params: options})

/**
 * 获取咨询师主管
 * @param {Object} option 参数
 * @param {string} option.q	搜索关键词
 * @param {string} option.city_id 城市ID
 * @return {Promise}
 */
export const getEmployeeLeader = (options) => axios.get(employeeLeaderApi, {params: options})

/**
 * 获取上传签名信息
 * @param {string} cate 上传图片文件夹
 * 参考接口：http://ams.julive.com/#/home/project/inside/api/detail?groupID=-1&apiID=1147&projectName=%E6%94%AF%E6%92%91%E7%B3%BB%E7%BB%9F-%E6%A0%87%E7%AD%BE%E4%BC%98%E5%8C%96&projectID=74
 * @return {Promise} 返回异步resolve后的Promise
 */
export const getSign = (params) => axios.post(uploadSignApi, params)

/**
 * 获取咨询师工作微信
 * @param {Object} option 参数
 * @param {string} option.q 查询关键字
 * @return {Promise}
 */
export const getZxsWx = (option) => axios.get(zxsWxApi, {params: option})

/**
 * 登录接口
 * @param {int} params.job_number 工号
 * @param {string} params.password 密码
 * 参考接口：http://ams.julive.com/#/home/project/inside/api/detail?groupID=-1&apiID=1147&projectName=%E6%94%AF%E6%92%91%E7%B3%BB%E7%BB%9F-%E6%A0%87%E7%AD%BE%E4%BC%98%E5%8C%96&projectID=74
 * @return {Promise} 返回异步resolve后的Promise
 */
const userLogin = (params) => axios.post(login, params)

/**
 * 分页获取咨询师
 * @param {Object} params 参数
 * @param {String} params.q 输入搜索的内容
 * @param {String} params.role 搜索的角色
 * @param {String} params.header_manager_id 获取某个咨询师组所有成员
 * @param {String} params.city_id 城市id
 * @param {String} params.department_id 部门id
 * @param {String} params.post_id 岗位id
 * @param {Number} params.status 在职状态
 * 参考接口：http://ams.julive.com/#/home/project/inside/api/detail?groupID=-1&apiID=2347&projectName=%E6%94%AF%E6%92%91%E7%B3%BB%E7%BB%9F-%E5%85%AC%E5%85%B1%E6%8E%A5%E5%8F%A3&projectID=131
 * @return {Promise} 返回异步resolve后的Promise
 */
const getPageEmployee = (params) => axios.get(newEmployeeApi, {params})

/**
 * 获取登录用户的角色列表
 * @param {Object} params 参数
 * 参考接口：http://ams.julive.com/#/home/project/inside/api/detail?groupID=-1&apiID=2333&projectName=%E6%94%AF%E6%92%91%E7%B3%BB%E7%BB%9F-%E5%85%AC%E5%85%B1%E6%8E%A5%E5%8F%A3&projectID=131
 * @return {Promise}
 */
const getRoleList = (params) => axios.post(roleListApi, params)

/**
 * 切换登录用户的角色
 * @param {Object} params 参数
 * @param {String} params.role_name 切换角色的标示
 * 参考接口：http://ams.julive.com/#/home/project/inside/api/detail?groupID=-1&apiID=2336&projectName=%E6%94%AF%E6%92%91%E7%B3%BB%E7%BB%9F-%E5%85%AC%E5%85%B1%E6%8E%A5%E5%8F%A3&projectID=131
 * @return {Promise}
 */
const switchRole = (params) => axios.post(switchRoleApi, params)
const apiObj = {
    userLogin,
    getSign,
    getPageEmployee,
    getRoleList,
    switchRole
};
export default apiObj;
