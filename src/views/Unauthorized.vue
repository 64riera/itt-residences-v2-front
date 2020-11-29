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
