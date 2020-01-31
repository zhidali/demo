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
} from './mutation-types'

export default {
  // 存储埋点地址
  [GET_TRACK_COMMON](state, {data}) {
    state.trackCommon = data
  },
  [GET_TRACK_INFO] (state, {data}) {
    state.trackInfos = data
  },
  [GET_EMPLOYEE_NAME] (state, data) {
    state.employeeName = data
  },
  [GET_UID] (state, data) {
    state.uid = data
  },
  [NET_TIMEOUT] (state, data) {
    state.netTimeOut = data
  },
  [GET_CITYINFO] (state, data) {
    state.cityInfo = data
  },
  [GET_TRACKMESSAGES] (state, data) {
    state.trackMessages = data
  },
  [GET_ROLE] (state, data) {
    state.role = data
  },
  [GET_BACKEND_API] (state, data) {
    state.backendApi = data
  },
  // 更新用户角色列表信息
  [GET_ROLE_LIST] (state, data) {
      state.roleList = data
  }
}
