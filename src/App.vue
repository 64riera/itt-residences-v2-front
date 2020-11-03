<template>
  <v-app id="app">
    <v-app-bar dark flat dense :color="colors.primary" app>
      Residencias ITT
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon dark>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
  },
};
</script>

<style>
</style>
