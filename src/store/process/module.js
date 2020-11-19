const processModule = {
  namespaced: true,
  state: {
    processes: [],
  },
  actions: {
    getAll({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/processes`);
        const body = {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: localStorage.getItem('AUTH_TOKEN'),
          },
        };

        let errorMessage = false;
        fetch(url, body)
          .then((res) => {
            if (!res.ok) {
              errorMessage = true;
            }
            return res.json();
          })
          .then((data) => {
            commit('setAll', data.data);
            if (errorMessage) {
              reject(data);
            } else {
              resolve(data.data);
            }
          });
      });
    },
    saveNew({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/process`);
        const body = {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: localStorage.getItem('AUTH_TOKEN'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: payload.name,
            description: payload.description,
          }),
        };

        let errorMessage = false;
        fetch(url, body)
          .then((res) => {
            if (!res.ok) {
              errorMessage = true;
            }
            return res.json();
          })
          .then((data) => {
            if (errorMessage) {
              reject(data);
            } else {
              resolve(data.data);
            }
          });
      });
    },
    updateOne({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/process`);
        let body = {
          method: 'PATCH',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: localStorage.getItem('AUTH_TOKEN'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: payload.id,
            name: payload.name,
            description: payload.description,
            isActive: payload.is_active,
          }),
        };

        let errorMessage = false;
        fetch(url, body)
          .then((res) => {
            if (!res.ok) {
              errorMessage = true;
            }

            return res.json();
          })
          .then((data) => {
            if (errorMessage) {
              reject(data);
            } else {
              resolve(data.data);
            }
          });
      });
    },
    deleteOne({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/process/${payload.id}`);
        let body = {
          method: 'DELETE',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: localStorage.getItem('AUTH_TOKEN'),
          },
        };

        let errorMessage = false;
        fetch(url, body)
          .then((res) => {
            if (!res.ok) {
              errorMessage = true;
            }

            return res.json();
          })
          .then((data) => {
            if (errorMessage) {
              reject(data);
            } else {
              resolve(data.data);
            }
          });
      });
    },
    undoEditAll({ commit }, payload) {
      commit('setUndoEditAll');
    },
  },
  mutations: {
    setAll(state, payload) {
      state.processes = payload;
    },
    setUndoEditAll(state, payload) {
      state.processes.forEach((process) => {
        process.is_editing = false;
      });
    },
  },
};

module.exports = processModule;
