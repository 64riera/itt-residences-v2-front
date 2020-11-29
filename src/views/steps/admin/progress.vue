<template>
  <div class="mt-2">
    <v-btn to="/home" text small :color="colors.primary">
      <v-icon left small>
        mdi-arrow-left
      </v-icon>
      Regresar a inicio
    </v-btn>
    <v-card class="mt-4" flat outlined>
      <v-card-title>
        <h4 class="font-weight-light">
          {{ processData.process.name }}
        </h4>
      </v-card-title>
      <v-card-text>
        <span>
          <v-icon small>
            mdi-information
          </v-icon>
          {{ processData.process.description }}
        </span>
      </v-card-text>
      <v-data-table
        :loading="loadingProcess"
        :headers="headers"
        :items="processData.students"
        :search="search"
      >
        <template v-slot:item.name="{ item }">
          <span>
            <v-icon small>
              mdi-account
            </v-icon>
            {{ item.name }} {{ item.last_name }}
          </span>
        </template>

        <template v-slot:item.email="{ item }">
          <span>
            {{ item.email ? item.email : "Oculto por usuario" }}
          </span>
        </template>

        <template v-slot:item.career="{ item }">
          <span>
            {{ item.area.name }}
          </span>
        </template>

        <template v-slot:item.percentageOfProgress="{ item }">
          <v-chip dark small :color="colors.secondary">
            <strong> {{ item.percentageOfProgress }} % </strong>
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <template>
            <v-btn
              @click="seeStudentProgress(item.id)"
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
      loadingProcess: false,
      search: '',
      headers: [
        {
          text: 'Estudiante',
          align: 'start',
          filterable: false,
          value: 'name',
        },
        { text: 'Num. de Control', value: 'control_number' },
        { text: 'Email', value: 'email' },
        { text: 'Carrera', value: 'career' },
        { text: 'Progreso', value: 'percentageOfProgress' },
        { text: 'Acciones', value: 'actions' },
      ],
      processData: {
        process: {},
        students: [],
      },
    };
  },
  methods: {
    seeStudentProgress(studentId) {
      this.$router.push(`/admin/process/${this.processData.process.id}/student/${studentId}/steps`);
    },
    getProcessData() {
      this.loadingProcess = true;
      this.$store
        .dispatch('stepModule/getAdminSteps', {
          processId: this.$route.params.processId,
        })
        .then((data) => {
          this.processData = data.data;
          this.loadingProcess = false;
        })
        .catch(() => {
          this.loadingProcess = false;
        });
    },
  },
  mounted() {
    this.getProcessData();
  },
  computed: {
    userType() {
      return this.$store.state.userModule.user.user_type;
    },
    colors() {
      return this.$store.state.colors;
    },
  },
};
</script>
