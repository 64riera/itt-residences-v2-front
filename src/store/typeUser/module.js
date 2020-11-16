const typeUserModule = {
  namespaced: true,
  state: {
    typeUsers: [],
  },
  actions: {
    getAll({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/type-users`);
        const body = {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        };
        fetch(url, body)
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
            commit('setAll', data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {
    setAll(state, payload) {
      state.typeUsers = payload;
    },
  },
};

module.exports = typeUserModule;
