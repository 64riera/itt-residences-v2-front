<template>
  <v-container class="text-center">
    <h1 class="font-weight-light">
      Al parecer no tienes permitido estar aquí...
    </h1>
    <v-btn to="/" class="mt-4" depressed :color="colors.primary">
      Ir a inicio
      <v-icon right>
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  computed: {
    colors() {
      return this.$store.state.colors;
    },
  },
};
</script>

* Modulo para subir archivo OK
* Funcion para obtener el archivo OK

* Administrador de ver progreso de sus alumnos y editarlo (Eliminarlo)
* Vista de no autorizado OK
* Vista para convertir un usario en Administrador

* Filtro por procesos activos / inactivos (Backend - frontend)