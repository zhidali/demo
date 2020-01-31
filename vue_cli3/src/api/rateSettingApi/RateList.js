import { axios } from '@/assets/js/http/axios';
const getRateListApi = '/backend-api/expand/ex-target-rate/index'; // 获取费率数据列表信息
const getEditRateApi = '/backend-api/expand/ex-target-rate/edit'; // 编辑目标费率获取初始数据
const getSaveRateApi = '/backend-api/expand/ex-target-rate/edit'; // 编辑目标费率保存数据

/**
 * 获取费率数据列表信息
 * @return {Promise} promise对象
 */
const getRateListData = pageIndex => axios.get(getRateListApi, {params: {pageIndex}});

/**
 * 编辑目标费率获取初始数据
 * @param {String} cityId 城市ID
 * @return {Promise} promise对象
 */
const getEditRateData = cityId =>
    axios.get(getEditRateApi, {params: {city_id: cityId}});

/**
 * 编辑目标费率保存数据
 * @param {Object} params 请求参数
 * @param {string} city_id 城市ID
 * @param {string} cj_object_field_config_id 业态配置ID
 * @param {string} rate 费率
 * @return {Promise} promise对象
 */
const getSaveRateData = params =>
    axios.post(getSaveRateApi, params);

export default {
    getRateListData,
    getEditRateData,
    getSaveRateData
}
