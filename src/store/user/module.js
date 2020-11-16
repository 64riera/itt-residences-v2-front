const userModule = {
  namespaced: true,
  state: {
    user: {},
  },
  actions: {
    login({ commit }) {
    },
    logout({ commit }) {},
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
            user_type: 1,
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
    setLoginData(state, payload) {},
    unsetUserData(state, payload) {},
  },
};

module.exports = userModule;
