import {
    GET_ROLE_LIST
} from './mutation-types';

export default {
    // 更新用户角色列表信息
    [GET_ROLE_LIST] (state, data) {
        state.roleList = data
    }
}
