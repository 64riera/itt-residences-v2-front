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
      <template v-if="stepsData.steps.length > 0">
          <div class="mt-6" v-for="step of stepsData.steps" :key="step.id">
              <v-card :disabled="step.blocked" flat :color="colors.primary" dark>
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
                              v-if="parseInt(step.includes_file)"
                              label="Debe incluir el archivo solicitado"
                          >
                          </v-file-input>
                          <v-text-field label="Escriba su respuesta aquí..."></v-text-field>
                          <div class="text-right">
                              <v-btn small depressed :color="colors.success">
                                  Completar paso
                                  <v-icon right>
                                      mdi-check
                                  </v-icon>
                              </v-btn>
                          </div>
                      </template>
                  </v-card-text>
              </v-card>
          </div>
      </template>
      <template v-else>
          <p class="mt-4 text-center">
              <i>No hay pasos actualmente registrados</i>
          </p>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingSteps: false,
      stepsData: {},
      processData: {},
    };
  },
  methods: {
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
