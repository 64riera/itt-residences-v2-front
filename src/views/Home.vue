<template>
  <div class="mt-2">
    <v-card flat outlined>
      <v-card-title>
        <h4 class="font-weight-light">
          Historial de residentes
        </h4>
        <v-spacer></v-spacer>
        <v-btn depressed small :color="colors.success">
          Exportar datos
          <v-icon right small>
            mdi-download
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Alumno',
          align: 'start',
          filterable: false,
          value: 'name',
        },
        { text: 'Email', value: 'iron' },
        { text: 'No. Control', value: 'calories' },
        { text: 'Carrera', value: 'fat' },
        { text: 'Semestre', value: 'carbs' },
        { text: 'Progreso', value: 'protein' },
      ],
      desserts: [
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
        {
          name: 'Sergio Daniel Rivera',
          iron: 'srivera@gmail.com',
          calories: 18860155,
          fat: 'Ingeniería Informática',
          carbs: '60%',
          protein: '5to',
        },
      ],
    };
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
  },
};
</script>
