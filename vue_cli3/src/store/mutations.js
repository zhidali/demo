import {
  GET_TRACK_INFO,
  GET_EMPLOYEE_NAME,
  GET_UID,
  NET_TIMEOUT,
  GET_COMMU,
  GET_CITYINFO,
  GET_TRACKMESSAGES,
  GET_ROLE,
  GET_CITY_LIST,
  GET_BACKEND_API,
  GET_ARTICLE_INFO
} from './mutation-types'

export default {
  [GET_TRACK_INFO] (state, {data}) {
    state.trackInfos = data
  },
  [GET_EMPLOYEE_NAME] (state, data) {
    state.employeeName = data
  },
  [GET_UID] (state, data) {
    state.uid = data
  },
  [GET_COMMU] (state, data) {
    state.commuLoc = data
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
  [GET_CITY_LIST] (state, data) {
    state.cityList = data
  },
  [GET_ROLE] (state, data) {
    state.role = data
  },
  [GET_BACKEND_API] (state, data) {
    state.backendApi = data
  },
  // 更新找房工具文章页楼盘信息
  [GET_ARTICLE_INFO] (state, data) {
    state.articleProInfo = data
  }
}
