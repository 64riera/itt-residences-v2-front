<template>
  <div>
    <div class="my-4">
      <v-btn
        :to="`/admin/process/${this.$route.params.processId}/steps`"
        small
        text
        :color="colors.primary"
      >
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Regresar
      </v-btn>
    </div>
    <h2 class="font-weight-light">{{ processData.name }}</h2>
    <template v-if="stepsData.steps">
      <v-card outlined class="mt-3">
        <v-card-title>
          <v-avatar class="mr-3" :color="colors.secondary" size="48">
            <span class="white--text headline">
              {{
                stepsData.student.name[0].toUpperCase() +
                  stepsData.student.last_name[0].toUpperCase()
              }}
            </span>
          </v-avatar>
          <h4 class="font-weight-light">
            {{ stepsData.student.name }} {{ stepsData.student.last_name }}
          </h4>
        </v-card-title>
        <v-card-text>
          <p>
            <strong>
              <v-icon small>
                mdi-email
              </v-icon>
              Correo electrónico:
            </strong>
            {{ stepsData.student.email ? stepsData.student.email : "Oculto por el usuario" }}
          </p>
          <p>
            <strong>
              <v-icon small>
                mdi-phone
              </v-icon>
              Teléfono:
            </strong>
            {{ stepsData.student.phone ? stepsData.student.phone : "Oculto por el usuario" }}
          </p>
          <p>
            <strong>
              <v-icon small>
                mdi-account-tie
              </v-icon>
              Carrera:
            </strong>
            {{ stepsData.student.area.name }}
          </p>
          <p>
            <strong>
              <v-icon small>
                mdi-counter
              </v-icon>
              Número de control:
            </strong>
            {{ stepsData.student.control_number }}
          </p>
          <p v-if="stepsData.steps.length > 0">
            <strong>
              <v-icon small>
                mdi-percent
              </v-icon>
              Progreso del usuario:
            </strong>
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
          </p>
        </v-card-text>
      </v-card>
      <v-alert
        text
        type="success"
        v-if="
          stepsData.doneStepsCount > 0 &&
            stepsData.totalStepsOfProcess > 0 &&
            stepsData.doneStepsCount === stepsData.totalStepsOfProcess
        "
        class="mt-4 text-center"
      >
        El usuario ha completado todos los pasos
      </v-alert>
      <template v-if="stepsData.steps.length > 0">
        <div class="mt-6" v-for="step of stepsData.steps" :key="step.id">
          <v-card
            :disabled="savingStep"
            flat
            :color="step.currentProgress !== null ? colors.success : colors.primary"
            dark
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
              <template v-if="step.currentProgress !== null">
                <p>
                  <strong>Respuesta registrada:</strong> {{ step.currentProgress.text_content }}
                </p>
                <div v-if="step.currentProgress.file_name !== null" class="text-right">
                  <v-btn @click="downloadFile(step.currentProgress.file_name)" small text>
                    Descargar archivo registrado
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
    };
  },
  methods: {
    downloadFile(fileName) {
      this.$store
        .dispatch('dropboxModule/getTemporaryDownloadLink', {
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
    getStudentSteps() {
      this.loadingSteps = true;
      this.$store
        .dispatch('stepModule/getStudentStepsForAdmin', {
          processId: this.$route.params.processId,
          studentId: this.$route.params.studentId,
        })
        .then((data) => {
          this.loadingSteps = false;
          this.stepsData = data;
        })
        .catch(() => {
          this.loadingSteps = false;
        });
    },
    getProcessData() {
      this.$store
        .dispatch('processModule/getOne', { processId: this.$route.params.processId })
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
