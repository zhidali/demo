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
import {axios} from '../assets/axios'

export default {
  // test
  getTrackInfo ({commit}, data) {
    commit(GET_TRACK_INFO, {data})
  },
  get_employee_name ({commit}, data) {
    commit(GET_EMPLOYEE_NAME, data)
  },
  get_uid ({commit}, data) {
    commit(GET_UID, data)
  },
  get_commu ({commit}, data) {
    commit(GET_COMMU, data)
  },
  get_role ({commit}, data) {
    commit(GET_ROLE, data)
  },
  net_timeout ({commit}, data) {
    commit(NET_TIMEOUT, data)
  },
  get_cityinfo ({commit}, data) {
    commit(GET_CITYINFO, data)
  },
  get_trackmessages ({commit}, data) {
    commit(GET_TRACKMESSAGES, data)
  },
  get_city_list ({commit}, data) {
    return axios.get('/backend-api/select2/select2/get-city-list-select2').then((res) => {
      if (res.data.code === 0) {
        commit(GET_CITY_LIST, res.data.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  get_backend_api ({commit}, data) {
    commit(GET_BACKEND_API, data)
  },
  // 获取找房工具文章页楼盘信息
  get_article_info ({commit}, data) {
    commit(GET_ARTICLE_INFO, data)
  }
}
