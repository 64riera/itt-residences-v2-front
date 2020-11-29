const stepModule = {
  namespaced: true,
  state: {},
  actions: {
    saveUserStep({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/user/step`);
        const body = {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: localStorage.getItem('AUTH_TOKEN'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload.body),
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
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getStudentSteps({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/process/${payload.processId}/student/steps`);
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
            if (!errorMessage) {
              resolve(data.data);
            } else {
              reject(data);
            }
          });
      });
    },
    getStudentStepsForAdmin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/process/${payload.processId}/student/${payload.studentId}/steps`);
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
            if (!errorMessage) {
              resolve(data.data);
            } else {
              reject(data);
            }
          });
      });
    },
    getAdminSteps({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/process/${payload.processId}/admin/steps`);
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
            if (!errorMessage) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getOfProcess({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(
          `${process.env.VUE_APP_BACKEND_HOST}/api/process/${payload.processId}/steps`,
        );
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
            if (!errorMessage) {
              resolve(data.data);
            } else {
              reject(data);
            }
          });
      });
    },
    saveOfProcess({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const url = new URL(`${process.env.VUE_APP_BACKEND_HOST}/api/process/steps`);
        const body = {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('AUTH_TOKEN'),
          },
          body: JSON.stringify({
            processId: payload.processId,
            steps: payload.steps,
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
            if (!errorMessage) {
              resolve(data.data);
            } else {
              reject(data);
            }
          });
      });
    },
  },
  mutations: {},
};

module.exports = stepModule;
