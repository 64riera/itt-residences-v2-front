const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
const Dropbox = require('dropbox');

const DEFAULT_PATH = '/dev-residences-v2/';

const dbx = new Dropbox.Dropbox({ accessToken: process.env.VUE_APP_DROPBOX_ACCESS_TOKEN });

const dropboxModule = {
  namespaced: true,
  state: {},
  actions: {
    uploadFile({ commit }, payload) {
      return new Promise((resolve, reject) => {
        if (payload.file.size < UPLOAD_FILE_SIZE_LIMIT) {
          dbx
            .filesUpload({ path: `${DEFAULT_PATH}${payload.fileName}`, contents: payload.file })
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject(
            new Error({
              msg: `El tamaño máximo permitido es: ${UPLOAD_FILE_SIZE_LIMIT}`,
            }),
          );
        }
      });
    },
    downloadFile({ commit }, payload) {
      return new Promise((resolve, reject) => {
        dbx
          .filesDownload({ path: `${DEFAULT_PATH}${payload.fileName}` })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getTemporaryDownloadLink({ commit }, payload) {
      return new Promise((resolve, reject) => {
        dbx
          .filesGetTemporaryLink({ path: `${DEFAULT_PATH}${payload.fileName}` })
          .then((response) => {
            resolve(response.result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {},
};

module.exports = dropboxModule;
