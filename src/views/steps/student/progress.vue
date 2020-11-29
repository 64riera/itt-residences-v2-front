<template>
  <div>
    <div class="my-4">
        <v-btn to="/home" small text :color="colors.primary">
            <v-icon left>
                mdi-arrow-left
            </v-icon>
            Regresar a inicio
        </v-btn>
    </div>
    <h2 class="font-weight-light">{{ processData.name }}</h2>
    <template v-if="stepsData.steps">
      <v-alert
        text
        type="success"
        v-if="(stepsData.doneStepsCount > 0 && stepsData.totalStepsOfProcess > 0) && (stepsData.doneStepsCount === stepsData.totalStepsOfProcess)"
        class="mt-4 text-center"
      >
          Al parecer has completado todos los pasos!
      </v-alert>
      <template v-if="stepsData.steps.length > 0">
          <v-progress-linear
            class="mt-4"
            rounded
            light
            :color="colors.success"
            striped
            :value="stepsData.percentageOfProgress"
            height="25"
          >
            <strong>{{ stepsData.percentageOfProgress }}%</strong>
          </v-progress-linear>
          <div class="mt-6" v-for="step of stepsData.steps" :key="step.id">
              <v-card
                :disabled="savingStep"
                flat
                :color="step.currentProgress !== null ? colors.success : colors.primary" dark
              >
                  <v-card-title>
                      <h4 class="font-weight-light">
                          {{ step.title }}
                      </h4>
                  </v-card-title>
                  <v-card-text>
                      <p v-if="step.description.trim()">
                          <strong>Descripción: </strong>
                          {{ step.description }}
                      </p>
                      <p v-if="step.instructions.trim()">
                          <strong>Instrucciones: </strong>
                          {{ step.instructions }}
                      </p>
                      <template v-if="!step.blocked">
                          <v-file-input
                              v-model="currentStepForm.file"
                              v-if="step.includes_file"
                              label="Debe incluir el archivo solicitado"
                          >
                          </v-file-input>
                          <v-text-field v-model="currentStepForm.textContent"
                          label="Escriba su respuesta aquí..."></v-text-field>
                          <div class="text-right">
                              <v-btn
                                :loading="savingStep"
                                @click="sendStep(step)"
                                small
                                depressed
                                :color="colors.success"
                              >
                                  Completar paso
                                  <v-icon right>
                                      mdi-check
                                  </v-icon>
                              </v-btn>
                          </div>
                      </template>
                      <template v-else-if="step.currentProgress !== null">
                        <p>
                          <strong>Tu respuesta:</strong> {{ step.currentProgress.text_content }}
                        </p>
                        <div v-if="step.currentProgress.file_name !== null" class="text-right">
                          <v-btn
                            @click="downloadFile(step.currentProgress.file_name)"
                            small
                            text
                          >
                            Descargar archivo subido
                            <v-icon right small>
                              mdi-download
                            </v-icon>
                          </v-btn>
                        </div>
                      </template>
                  </v-card-text>
              </v-card>
          </div>
      </template>
      <template v-else>
          <v-alert text type="info" class="mt-4 text-center">
              No hay pasos actualmente registrados
          </v-alert>
      </template>
    </template>
    <template v-else>
      <v-alert text class="mt-4 text-center" type="info">
        Cargando información...
      </v-alert>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      savingStep: false,
      completedStatus: 3,
      fileSizeLimit: 150 * 1024 * 1024,
      loadingSteps: false,
      stepsData: {},
      processData: {},
      currentStepForm: {
        file: null,
        textContent: '',
      },
    };
  },
  methods: {
    downloadFile(fileName) {
      this.$store.dispatch('dropboxModule/getTemporaryDownloadLink', {
        fileName,
      })
        .then((data) => {
          const downloadButton = document.createElement('a');
          downloadButton.setAttribute('href', data.link);
          downloadButton.setAttribute('download', data.name);
          downloadButton.setAttribute('class', 'button');
          downloadButton.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async sendStep(step) {
      const stepForm = this.currentStepForm;
      const body = {
        userId: this.userInfo.id,
        stepId: step.id,
        textContent: stepForm.textContent,
        status: this.completedStatus,
      };

      if (!step.blocked) {
        // Verify text content
        if (!stepForm.textContent.trim()) {
          return this.$notiflix.Notify.Warning('Ingrese su respuesta para continuar');
        }

        // Verify if step requires file uploaded
        if (step.includes_file) {
          if (stepForm.file) {
            // Verify the file size
            if (stepForm.file.size > this.fileSizeLimit) {
              return this.$notiflix.Notify.Failure('El archivo excede del tamaño máximo permitido (150Mb)');
            }
            this.savingStep = true;
            const fileResponse = await this.$store.dispatch('dropboxModule/uploadFile', {
              file: this.currentStepForm.file,
              fileName: Date.now(),
            });
            body.fileName = fileResponse.result.name;
            body.fileUrl = fileResponse.result.path_display;
          } else {
            return this.$notiflix.Notify.Warning('Este paso require subir un archivo para continuar');
          }
        }
        this.savingStep = true;
        this.$store.dispatch('stepModule/saveUserStep', {
          body,
        })
          .then(() => {
            this.currentStepForm = {
              file: null,
              textContent: '',
            };
            this.savingStep = false;
            this.getStudentSteps();
            this.$notiflix.Notify.Success('Listo! Tu avance se registró correctamente');
          })
          .catch(() => {
            this.savingStep = false;
            this.$notiflix.Notify.Success('Hubo problemas para registrar tu avance :(');
          });
      }
      return true;
    },
    getStudentSteps() {
      this.loadingSteps = true;
      this.$store
        .dispatch('stepModule/getStudentSteps', { processId: this.$route.params.processId })
        .then((data) => {
          this.loadingSteps = false;
          this.stepsData = data;
        })
        .catch(() => {
          this.loadingSteps = false;
        });
    },
    getProcessData() {
      this.$store.dispatch('processModule/getOne',
        { processId: this.$route.params.processId })
        .then((data) => {
          this.processData = data;
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.getProcessData();
    this.getStudentSteps();
  },
  computed: {
    userInfo() {
      return this.$store.state.userModule.user;
    },
    userType() {
      return this.$store.state.userModule.user.user_type;
    },
    colors() {
      return this.$store.state.colors;
    },
    processes() {
      return this.$store.state.processModule.processes;
    },
  },
};
</script>
