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
        <v-form ref="registerForm" class="mx-auto mt-2" style="max-width: 80%;">
          <v-text-field
            append-icon="mdi-email"
            outlined
            v-model="email"
            :rules="emailRules"
            dense
            rounded
            label="Correo electónico"
            type="email"
          ></v-text-field>
          <v-text-field
            outlined
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            counter
            dense
            v-model="password"
            :rules="passwordRules"
            rounded
            label="Contraseña"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-account"
            outlined
            v-model="name"
            :rules="nameRules"
            dense
            rounded
            label="Nombre"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-account-details"
            outlined
            v-model="lastName"
            :rules="lastNameRules"
            dense
            rounded
            label="Apellidos"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-counter"
            outlined
            v-model="controlNumber"
            :rules="controlNumberRules"
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
                v-model="birthdate"
                :rules="birthdateRules"
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
            <v-date-picker v-model="birthdate" @input="menu2 = false"></v-date-picker>
          </v-menu>
          <v-text-field
            append-icon="mdi-map-marker"
            v-model="address"
            :rules="addressRules"
            outlined
            dense
            rounded
            label="Dirección"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-phone"
            v-model="phone"
            :rules="phoneRules"
            outlined
            dense
            rounded
            label="Teléfono"
          ></v-text-field>
          <v-select
            class="mb-0 pb-0"
            append-icon="mdi-account"
            outlined
            :loading="loadingTypeUsers"
            :disabled="loadingTypeUsers"
            :items="typeUsers"
            v-model="typeUser"
            :rules="typeUserRules"
            dense
            rounded
            label="Seleccione su tipo de usuario"
          ></v-select>
          <v-select
            class="mb-0 pb-0"
            append-icon="mdi-account-tie"
            outlined
            :loading="loadingAreas"
            :disabled="loadingAreas"
            :items="careersAndAreas"
            v-model="career"
            :rules="careerRules"
            dense
            rounded
            label="Seleccione su área"
          ></v-select>
          <v-row class="text-center px-6 py-0 mt-0 mb-6">
            <v-checkbox
              dense
              v-model="showMyMail"
              class="mt-0"
              hide-details
              label="Mostrar mi correo a los demás"
            ></v-checkbox>
            <v-checkbox
              dense
              v-model="showMyPhone"
              hide-details
              class="mt-0"
              label="Mostrar mi teléfono a los demás"
            ></v-checkbox>
          </v-row>
          <v-btn
            @click="registerUser()"
            class="mx-auto"
            small
            :disabled="loadingRegister"
            :loading="loadingRegister"
            rounded
            depressed
            :color="colors.primary"
          >
            <v-icon left small>
              mdi-check
            </v-icon>
            Listo!
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click="redirectToLogin()"
            class="mx-auto mt-4"
            x-small
            text
            :color="colors.primary"
          >
            <v-icon left small>
              mdi-arrow-left
            </v-icon>
            Regresa a iniciar sesión
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
      email: '',
      emailRules: [
        (v) => !!v || 'Ingrese su email para continuar',
        (v) => /.+@.+\..+/.test(v) || 'Ingrese un email válido',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Ingrese una clave para continuar',
        (v) => (v && v.length >= 8) || 'La clave debe ser al menos de 8 caracteres',
      ],
      name: '',
      nameRules: [
        (v) => !!v || 'Ingrese su nombre para continuar',
      ],
      lastName: '',
      lastNameRules: [
        (v) => !!v || 'Ingrese sus apellido para continuar',
      ],
      controlNumber: '',
      controlNumberRules: [
        (v) => !!v || 'Ingrese su # de control para continuar',
      ],
      birthdate: '',
      birthdateRules: [
        (v) => !!v || 'Ingrese su fecha de nacimiento para continuar',
      ],
      address: '',
      addressRules: [
        (v) => !!v || 'Ingrese su dirección para continuar',
      ],
      phone: '',
      phoneRules: [
        (v) => !!v || 'Ingrese su teléfono para continuar',
        (v) => (v && v.length >= 8) || 'Ingrese al menos 8 digitos para su teléfono',
      ],
      showMyPhone: true,
      showMyMail: true,
      career: '',
      careerRules: [
        (v) => !!v || 'Seleccione su área para continuar',
      ],
      typeUser: 2,
      typeUserRules: [
        (v) => !!v || 'Seleccione su tipo de usuario para continuar',
      ],
      showPassword: false,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      loadingAreas: false,
      loadingTypeUsers: false,
      loadingRegister: false,
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push({ name: 'Login' });
    },
    registerUser() {
      if (this.$refs.registerForm.validate()) {
        this.loadingRegister = true;
        this.$store.dispatch('userModule/register', this)
          .then(() => {
            this.$notiflix.Notify.Success('Te has registrado correctamente!');
            this.loadingRegister = false;
            this.$router.push({ name: 'Login' });
          })
          .catch(() => {
            this.loadingRegister = false;
            this.$notiflix.Notify.Failure('Ocurrió un error al enviar tus datos, por favor, reintenta');
          });
      }
    },
    getCareersAndAreas() {
      this.loadingAreas = true;
      this.$store.dispatch('careerModule/getAll')
        .then(() => {
          this.loadingAreas = false;
        })
        .then(() => {
          this.loadingAreas = false;
        });
      this.$store.dispatch('areaModule/getAll')
        .then(() => {
          this.loadingAreas = false;
        })
        .then(() => {
          this.loadingAreas = false;
        });
    },
    getTypeUsers() {
      this.loadingTypeUsers = true;
      this.$store.dispatch('typeUserModule/getAll')
        .then(() => {
          this.loadingTypeUsers = false;
        })
        .catch(() => {
          this.loadingTypeUsers = false;
        });
    },
  },
  mounted() {
    this.getTypeUsers();
    this.getCareersAndAreas();
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
    typeUsers() {
      const typeUsers = [];
      this.$store.state.typeUserModule.typeUsers.forEach((typeUser) => {
        const tmpTypeUser = { text: typeUser.name, value: typeUser.id };
        typeUsers.push(tmpTypeUser);
      });
      return typeUsers;
    },
    careersAndAreas() {
      const careers = [];
      this.$store.state.careerModule.careers.forEach((career) => {
        const tmpCareer = { text: career.name, value: career.id };
        careers.push(tmpCareer);
      });

      const areas = [];
      this.$store.state.areaModule.areas.forEach((area) => {
        const tmpArea = { text: area.name, value: area.id };
        areas.push(tmpArea);
      });

      if (this.typeUser === 2) {
        return careers;
      }

      return areas;
    },
  },
};
</script>

<style scoped></style>
