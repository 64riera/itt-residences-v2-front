const careerModule = {
  namespaced: true,
  state: {
    careers: [],
  },
  actions: {
    getAll({ commit }, payload) {
      const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/careers`);
      const body = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      };
      fetch(url, body)
        .then((res) => res.json())
        .then((data) => {
          commit('setAll', data.data);
        });
    },
  },
  mutations: {
    setAll(state, payload) {
      state.careers = payload;
    },
  },
};

module.exports = careerModule;
