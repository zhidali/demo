import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 引入找房工具vuex
import house from '../pages/consultor/house/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		house
	}
});
