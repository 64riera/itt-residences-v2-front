<template>
  <v-app id="app">
    <v-app-bar dark flat dense :color="colors.primary" app>
      Portal ITT
      <v-spacer></v-spacer>
      <v-btn @click="logout()" v-if="isLogged" icon>
        <v-icon dark>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch('userModule/logout');
      this.$notiflix.Notify.Success('Te esperamos pronto!');
      this.$router.push({ name: 'Login' });
    },
  },
  mounted() {
    this.$store.dispatch('userModule/verifyAuth');
  },
  updated() {
    if (this.isLogged) {
      this.$store.dispatch('userModule/getInfo');
    }
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
    isLogged() {
      return this.$store.state.userModule.isLogged;
    },
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
