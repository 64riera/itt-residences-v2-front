<template>
  <div>
    <v-card flat outlined max-width="40rem" class="mx-auto mt-4">
      <v-toolbar dense flat :color="colors.primary">
        <v-toolbar-title class="white--text mx-auto">
          <h5 class="subtitle-1">
            Regístrate
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
          <v-text-field
            append-icon="mdi-account"
            outlined
            dense
            rounded
            label="Nombre"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-account-details"
            outlined
            dense
            rounded
            label="Apellidos"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-counter"
            outlined
            dense
            rounded
            label="Número de control"
          ></v-text-field>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha de nacimiento"
                append-icon="mdi-calendar"
                readonly
                outlined
                rounded
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>
          <v-text-field
            append-icon="mdi-map-marker"
            outlined
            dense
            rounded
            label="Dirección"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-phone"
            outlined
            dense
            rounded
            label="Teléfono"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-email"
            outlined
            dense
            rounded
            label="Mostrar mi número a los demás"
          ></v-text-field>
          <v-select
            class="mb-0 pb-0"
            append-icon="mdi-account-tie"
            outlined
            dense
            rounded
            label="Seleccione su carrera"
          ></v-select>
          <v-row class="text-center px-6 py-0 mt-0 mb-6">
            <v-checkbox
              dense
              class="mt-0"
              hide-details
              label="Mostrar mi correo a los demás"
            ></v-checkbox>
            <v-checkbox
              dense
              hide-details
              class="mt-0"
              label="Mostrar mi teléfono a los demás"
            ></v-checkbox>
          </v-row>
          <v-btn class="mx-auto" small rounded depressed :color="colors.primary">
            <v-icon left small>
              mdi-check
            </v-icon>
            Listo!
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
    };
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
  },
};
</script>

<style scoped></style>
