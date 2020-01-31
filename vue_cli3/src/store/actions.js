import {
  GET_TRACK_INFO,
  GET_EMPLOYEE_NAME,
  GET_UID,
  NET_TIMEOUT,
  GET_CITYINFO,
  GET_TRACKMESSAGES,
  GET_ROLE,
  GET_BACKEND_API,
  GET_ROLE_LIST,
  GET_ARTICLE_INFO,
  GET_TRACK_COMMON
} from './mutation-types';
import {axios} from '../assets/js/http/axios';
import { getTrackInfo } from '@/api/commonApi';

export default {
  // 存入state埋点信息
  getTrackCommon({commit}) {
    getTrackInfo().then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = {
          info: res.data.data.result,
          backendApi: res.data.data.www_backend_api
        };
        commit(GET_TRACK_COMMON, {data});
      }
    });
  },
  // test
  getTrackInfo ({commit}, data) {
    commit(GET_TRACK_INFO, {data});
  },
  get_employee_name ({commit}, data) {
    commit(GET_EMPLOYEE_NAME, data);
  },
  get_uid ({commit}, data) {
    commit(GET_UID, data);
  },
  get_role ({commit}, data) {
    commit(GET_ROLE, data);
  },
  net_timeout ({commit}, data) {
    commit(NET_TIMEOUT, data);
  },
  get_cityinfo ({commit}, data) {
    commit(GET_CITYINFO, data);
  },
  get_trackmessages ({commit}, data) {
    commit(GET_TRACKMESSAGES, data);
  },
  get_backend_api ({commit}, data) {
    commit(GET_BACKEND_API, data);
  },
  // 获取用户角色列表信息
  get_role_list({commit}, data) {
      commit(GET_ROLE_LIST, data);
  }
};
