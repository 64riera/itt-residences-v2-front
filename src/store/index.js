import Vue from 'vue';
import Vuex from 'vuex';
import colors from '@/constants/constants';
import * as userModule from '@/store/user/module';
import * as careerModule from '@/store/career/module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    colors,
  },
  mutations: {},
  actions: {},
  modules: {
    userModule,
    careerModule,
  },
});
