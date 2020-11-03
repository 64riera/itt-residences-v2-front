<template>
  <div>
    <v-card flat outlined max-width="40rem" class="mx-auto mt-4">
      <v-toolbar dense flat :color="colors.primary">
        <v-toolbar-title class="white--text mx-auto">
          <h5 class="subtitle-1">
            Bienvenido
          </h5>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="text-center">
        <v-form class="mx-auto mt-2" style="max-width: 80%;">
          <v-text-field
            append-icon="mdi-email"
            outlined
            dense
            rounded
            label="Correo electónico"
            type="email"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-lock"
            outlined
            dense
            rounded
            label="Contraseña"
            type="password"
            ></v-text-field>
            <v-btn
                class="mx-auto"
                small
                rounded
                depressed
                :color="colors.primary"
            >
                <v-icon left small>
                    mdi-login
                </v-icon>
                Ingresar
            </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
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

<style scoped></style>
