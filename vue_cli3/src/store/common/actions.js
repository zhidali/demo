import {
    GET_ROLE_LIST
} from './mutation-types';

export default {
    // 获取用户角色列表信息
    get_role_list({commit}, data) {
        commit(GET_ROLE_LIST, data)
    }
}