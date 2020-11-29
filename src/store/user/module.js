const userModule = {
  namespaced: true,
  state: {
    user: {},
    isLogged: false,
  },
  actions: {
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        let url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/auth/user`);
        let body = {
          headers: {
            'Content-Type': 'application/json',
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
            if (!errorMessage) {
              localStorage.setItem('USER_TYPE', data.data.user_type);
              commit('setInfo', data.data);
              resolve(data.data);
            } else {
              reject(data);
            }
          });
      });
    },
    verifyAuth({ commit }) {
      const auth = localStorage.getItem('AUTH_TOKEN');
      if (auth) {
        return commit('setIsLogged', true);
      }

      return commit('setIsLogged', false);
    },
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/auth/login`);
        const body = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
          }),
        };

        let resOk;
        fetch(url, body)
          .then((res) => {
            if (res.ok) {
              resOk = true;
            } else {
              resOk = false;
            }
            return res.json();
          })
          .then((data) => {
            if (resOk) {
              localStorage.setItem('AUTH_TOKEN', `${data.token_type} ${data.access_token}`);
              commit('setIsLogged', true);
              resolve(data);
            } else {
              reject(data);
            }
          });
      });
    },
    logout({ commit }) {
      commit('unsetUserData');
    },
    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/auth/signup`);
        const body = {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: payload.name,
            last_name: payload.lastName,
            control_number: payload.controlNumber,
            birthdate: payload.birthdate,
            phone: payload.phone,
            visible_mail: payload.showMyMail,
            visible_phone: payload.showMyPhone,
            area_id: payload.career,
            user_type: payload.typeUser,
            email: payload.email,
            password: payload.password,
            is_active: true,
          }),
        };
        fetch(url, body).then((res) => {
          if (res.ok) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    },
  },
  mutations: {
    setInfo(state, payload) {
      state.user = payload;
    },
    setIsLogged(state, payload) {
      state.isLogged = payload;
    },
    unsetUserData(state) {
      state.isLogged = false;
      localStorage.removeItem('AUTH_TOKEN');
      localStorage.removeItem('USER_TYPE');
    },
  },
};

module.exports = userModule;
