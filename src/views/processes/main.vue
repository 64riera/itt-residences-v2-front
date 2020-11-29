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
    <v-card :disabled="loadingProcesses" class="mt-4" flat outlined>
      <v-card-title>
        <h4 class="font-weight-light">Procesos</h4>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :loading="loadingProcesses"
        :headers="headers"
        :items="processes"
        :search="search"
      >

        <template
          v-slot:item.name="{ item }"
        >
          <span v-if="!item.is_editing">
            {{ item.name }}
          </span>
          <v-text-field
            v-else
            v-model="processEditForm.name"
          >
          </v-text-field>
        </template>

        <template
          v-slot:item.description="{ item }"
        >
          <span v-if="!item.is_editing">
            {{ item.description }}
          </span>
          <v-text-field
            v-else
            v-model="processEditForm.description"
          >
          </v-text-field>
        </template>

        <template
          v-slot:item.is_active="{ item }"
        >
          <template v-if="!item.is_editing">
            <v-btn v-if="item.is_active" :color="colors.success" text>
              <v-icon>
                mdi-check
              </v-icon>
            </v-btn>
            <v-btn v-else :color="colors.error" text>
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-checkbox v-model="processEditForm.is_active"></v-checkbox>
          </template>
        </template>

        <template
          v-slot:item.actions="{ item }"
        >
          <template v-if="!item.is_editing">
            <v-btn @click="editProcess(item)" class="mr-2" depressed small :color="colors.primary">
              <v-icon small left>
                mdi-pencil
              </v-icon>
              Editar
            </v-btn>
            <v-btn
              class="mr-2"
              @click="confirmDeleteProcess(item)"
              depressed small :color="colors.error"
            >
              <v-icon small left>
                mdi-close
              </v-icon>
              Eliminar
            </v-btn>
            <v-btn :to="`/process/${item.id}/steps`" depressed small :color="colors.primary">
              <v-icon left>
                mdi-debug-step-over
              </v-icon>
              Pasos
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              @click="updateProcess(item.id)"
              class="mr-2"
              depressed
              small
              :color="colors.success"
            >
              <v-icon small left>
                mdi-check
              </v-icon>
              Guardar
            </v-btn>
            <v-btn
              @click="cancelEditProcess(item)"
              depressed
              small
              :color="colors.error"
            >
              <v-icon small left>
                mdi-close
              </v-icon>
              Cancelar
            </v-btn>
          </template>
        </template>

      </v-data-table>
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card :loading="deletingProcess" :disabled="deletingProcess">
        <v-card-title class="headline">
          Confirmar borrado
        </v-card-title>
        <v-card-text>
          ¿ Deseas eliminar el proceso con el nombre :
          {{ deleteProcess.name }} ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="colors.error"
            text
            @click="cancelDeleteProcess()"
          >
            Cancelar
          </v-btn>
          <v-btn
            :color="colors.success"
            text
            @click="onDeleteProcess()"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deletingProcess: false,
      deleteProcess: {
        id: 0,
        name: '',
      },
      dialog: false,
      processEditForm: {
        name: '',
        description: '',
        is_active: false,
      },
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
        { text: 'Acciones', value: 'actions' },
      ],
    };
  },
  methods: {
    confirmDeleteProcess(process) {
      this.deleteProcess = {
        id: process.id,
        name: process.name,
      };
      this.dialog = true;
    },
    cancelDeleteProcess() {
      this.deleteProcess = {
        id: 0,
        name: '',
      };
      this.dialog = false;
    },
    onDeleteProcess() {
      this.deletingProcess = true;
      this.$store.dispatch('processModule/deleteOne', { id: this.deleteProcess.id })
        .then(() => {
          this.getAllProcesses();
          this.deletingProcess = false;
          this.dialog = false;
          this.$notiflix.Notify.Success('El proceso se ha eliminado correctamente');
        })
        .catch(() => {
          this.deletingProcess = false;
          this.$notiflix.Notify.Failure('Ocurrió un error al eliminar el proceso');
        });
    },
    updateProcess(processId) {
      const { name, description, is_active } = this.processEditForm;
      if (!name.trim() || !description.trim()) {
        return this.$notiflix.Notify.Warning('Ingresa un nombre y descripción válida para continuar');
      }
      this.loadingProcesses = true;
      const updatedProcess = {
        id: processId, name, description, is_active,
      };

      this.$store.dispatch('processModule/updateOne', updatedProcess)
        .then(() => {
          this.$notiflix.Notify.Success('Los cambios se guardaron con éxito');
          this.getAllProcesses();
        })
        .catch(() => {
          this.$notiflix.Notify.Failure('Algo salió mal, por favor reintenta');
          this.loadingProcesses = false;
        });

      return true;
    },
    editProcess(process) {
      this.$store.dispatch('processModule/undoEditAll');
      this.processEditForm = { ...process };
      process.is_editing = true;
    },
    cancelEditProcess(process) {
      this.processEditForm = { name: '', description: '', is_active: false };
      process.is_editing = false;
    },
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
