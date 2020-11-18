<template>
  <div class="mt-2">
    <v-btn to="/home" small text :color="colors.primary">
      <v-icon left small> mdi-arrow-left </v-icon>
      Regresar a inicio
    </v-btn>
    <v-btn
      @click="sheet = true"
      class="float-right"
      depressed
      small
      :color="colors.success"
    >
      <v-icon left small> mdi-plus </v-icon>
      Crear proceso
    </v-btn>
    <v-card class="mt-4" flat outlined>
      <v-card-title>
        <h4 class="font-weight-light">Procesos</h4>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :loading="loadingProcesses"
        :headers="headers"
        :items="processes"
        :search="search"
      ></v-data-table>
    </v-card>
    <v-bottom-sheet v-model="sheet" inset>
      <v-sheet class="text-center" height="25rem">
        <div class="pt-6">
          <v-card :loading="savingProcess"
            :disabled="savingProcess" max-width="40rem" class="mx-auto" flat
          >
            <v-card-title>
              <h4 class="font-weight-light">Añadir nuevo proceso</h4>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pt-3">
              <v-text-field
                @keydown.enter="createProcess()"
                v-model="processName"
                outlined
                rounded
                dense
                label="Escriba el nombre de su proceso"
                append-icon="mdi-form-textbox"
              ></v-text-field>
              <v-text-field
                @keydown.enter="createProcess()"
                v-model="processDescription"
                outlined
                rounded
                dense
                label="Escriba la descripción de su proceso"
                append-icon="mdi-card-text"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </div>
        <v-btn
          :loading="savingProcess"
          :disabled="savingProcess"
          @click="createProcess()"
          text
          :color="colors.success"
        >
          Guardar
          <v-icon right>
            mdi-check
          </v-icon>
        </v-btn>
        <v-btn text :color="colors.error" @click="sheet = !sheet">
          Cerrar
          <v-icon right>
            mdi-close
          </v-icon>
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      savingProcess: false,
      loadingProcesses: false,
      sheet: false,
      search: '',
      processName: '',
      processDescription: '',
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          filterable: false,
          value: 'name',
        },
        { text: 'Descripción', value: 'description' },
        { text: 'Actualmente activo', value: 'is_active' },
      ],
    };
  },
  methods: {
    getAllProcesses() {
      this.loadingProcesses = true;
      this.$store.dispatch('processModule/getAll')
        .then(() => { this.loadingProcesses = false; })
        .catch(() => { this.loadingProcesses = false; });
    },
    createProcess() {
      if (!this.processName.trim() || !this.processDescription.trim()) {
        return this.$notiflix.Notify.Warning('Ingrese un nombre y descripción válidos para continuar');
      }

      this.savingProcess = true;
      this.$store.dispatch('processModule/saveNew', {
        name: this.processName,
        description: this.processDescription,
      })
        .then(() => {
          this.savingProcess = false;
          this.sheet = false;
          this.processName = '';
          this.processDescription = '';
          this.getAllProcesses();
          this.$notiflix.Notify.Success('Yeah! El proceso se ha guardado con éxito');
        })
        .catch(() => {
          this.savingProcess = false;
          this.$notiflix.Notify.Failure('Algo no salió bien, reintenta por favor :(');
        });

      return true;
    },
  },
  mounted() {
    this.getAllProcesses();
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
    processes() {
      return this.$store.state.processModule.processes;
    },
  },
};
</script>

<style lang="stylus"></style>
