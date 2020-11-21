import Vue from 'vue';
import Vuex from 'vuex';
import colors from '@/constants/constants';
import * as userModule from '@/store/user/module';
import * as careerModule from '@/store/career/module';
import * as areaModule from '@/store/area/module';
import * as typeUserModule from '@/store/typeUser/module';
import * as processModule from '@/store/process/module';
import * as stepModule from '@/store/step/module';

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
    areaModule,
    typeUserModule,
    processModule,
    stepModule,
  },
});
