<template>
  <div class="mt-2 pb-8">
    <v-btn to="/processes" text small :color="colors.primary">
      <v-icon left small>
        mdi-arrow-left
      </v-icon>
      Regresar a procesos
    </v-btn>
    <v-card class="mt-4" flat>
      <v-card-title>
        <h3 class="font-weight-light">
          Pasos
        </h3>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text v-if="steps.length === 0" class="text-center">
        <i>No hay ningun paso por aquí... Agrega uno para comenzar!</i>
      </v-card-text>
    </v-card>

    <template v-for="(step, stepIndex) of steps">
      <v-card
        :key="stepIndex"
        max-width="120rem"
        class="mt-2 mx-auto"
        color="primary" dark flat
      >
        <v-card-title>
          <v-text-field
            v-model="step.title"
            label="Escribe el título de este paso"
            outlined dense
          ></v-text-field>
          <v-btn @click="removeStep(stepIndex)" class="mb-6 ml-3" dark icon>
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-textarea
            label="Describe la función de este paso"
            v-model="step.description"
          ></v-textarea>
          <v-textarea
            label="Aquí escribe las instrucciones a seguir en este paso"
            v-model="step.instructions"
          ></v-textarea>
          <v-checkbox
            label="Requiere subir archivo"
            v-model="step.includes_file"
          ></v-checkbox>
          <div class="text-right">
            <strong>
              Paso #{{ stepIndex + 1 }}
            </strong>
          </div>
        </v-card-text>
      </v-card>
    </template>
      <v-btn
        @click="saveSteps()"
        :color="colors.success"
        fab
        fixed
        v-if="steps.length > 0"
        :loading="savingSteps"
        :disabled="savingSteps"
        depressed
        dark
        bottom
        right
        class="mr-2"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>

      <v-btn
        @click="addStep()"
        :color="colors.success"
        fab
        fixed
        :loading="loadingSteps"
        :disabled="loadingSteps"
        depressed
        dark
        bottom
        left
        class="ml-2"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingSteps: false,
      savingSteps: false,
      steps: [],
    };
  },
  methods: {
    getStepsOfProcess() {
      this.loadingSteps = true;
      this.$store.dispatch('stepModule/getOfProcess', { processId: this.$route.params.processId })
        .then((data) => {
          this.loadingSteps = false;
          this.steps = data;
        })
        .catch((err) => {
          this.loadingSteps = false;
          console.log(err);
        });
    },
    addStep() {
      this.steps.push({
        title: '',
        description: '',
        instructions: '',
        includes_file: false,
      });
    },
    removeStep(stepIndex) {
      this.steps.splice(stepIndex, 1);
    },
    saveSteps() {
      const tmpSteps = [];

      let missingParams = false;
      this.steps.forEach((step, stepIndex) => {
        if (!step.title.trim() || !step.description.trim() || !step.instructions.trim()) {
          missingParams = true;
        }
        step.includesFile = step.includes_file;
        step.order = stepIndex + 1;
        tmpSteps.push(step);
      });

      if (missingParams) {
        return this.$notiflix.Notify.Warning('Escriba un título, descripción e instrucciones por paso para continuar');
      }

      this.savingSteps = true;
      this.$store.dispatch('stepModule/saveOfProcess', {
        processId: this.$route.params.processId,
        steps: tmpSteps,
      })
        .then(() => {
          this.$notiflix.Notify.Success('Pasos guardados con éxito!');
          this.savingSteps = false;
        })
        .catch(() => {
          this.$notiflix.Notify.Failure('Ocurrió un error al guardar los pasos');
          this.savingSteps = false;
        });
      return true;
    },
  },
  mounted() {
    this.getStepsOfProcess();
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
  },
};
</script>
