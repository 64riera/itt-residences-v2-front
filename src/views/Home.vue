<template>
  <div class="mt-2">
    <v-btn v-if="userType === ADMIN_TYPE" to="/processes" depressed small :color="colors.success">
      <v-icon left small>
        mdi-debug-step-over
      </v-icon>
      Administrar Procesos
    </v-btn>
    <v-card class="mt-4" flat outlined>
      <v-card-title>
        <h4 class="font-weight-light">
          Historial de procesos
        </h4>
      </v-card-title>
      <v-data-table
        :loading="loadingProcesses"
        :headers="headers"
        :items="processes"
        :search="search"
      >
        <template v-slot:item.name="{ item }">
          <span>
            {{ item.name }}
          </span>
        </template>

        <template v-slot:item.description="{ item }">
          <span>
            {{ item.description }}
          </span>
        </template>

        <template v-slot:item.actions="{ item }">
          <template>
            <v-btn
              @click="seeProcessDetails(item)"
              class="mr-2"
              depressed
              small
              :color="colors.primary"
            >
              <v-icon small left>
                mdi-arrow-right
              </v-icon>
              Ver detalles
            </v-btn>
          </template>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ADMIN_TYPE: 1,
      STUDENT_TYPE: 2,
      loadingProcesses: false,
      search: '',
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          filterable: false,
          value: 'name',
        },
        { text: 'Descripción', value: 'description' },
        { text: 'Acciones', value: 'actions' },
      ],
    };
  },
  methods: {
    seeProcessDetails(process) {
      if (parseInt(this.userType, 10) === 1) {
        this.$router.push(`/admin/process/${process.id}/steps`);
      } else {
        this.$router.push(`/student/process/${process.id}/steps`);
      }
    },
    getAllProcesses() {
      this.loadingProcesses = true;
      this.$store.dispatch('processModule/getAll')
        .then(() => { this.loadingProcesses = false; })
        .catch(() => { this.loadingProcesses = false; });
    },
  },
  mounted() {
    this.getAllProcesses();
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
