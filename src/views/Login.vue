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
        <v-form ref="loginForm" class="mx-auto mt-2" style="max-width: 80%;">
          <v-text-field
            @keydown.enter="login()"
            v-model="email"
            :rules="emailRules"
            append-icon="mdi-email"
            outlined
            dense
            rounded
            label="Correo electónico"
            type="email"
          ></v-text-field>
          <v-text-field
            @keydown.enter="login()"
            v-model="password"
            :rules="passwordRules"
            outlined
            dense
            rounded
            label="Contraseña"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            counter
            ></v-text-field>
            <v-btn
                @click="login()"
                class="mx-auto"
                :loading="loadingLogin"
                :disabled="loadingLogin"
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
        <div class="text-right">
          <v-btn
          class="mt-4"
          @click="redirectToRegister()"
          text
          x-small
          :color="colors.primary"
        >
          <v-icon left x-small>
            mdi-account-plus
          </v-icon>
          No tienes cuenta? Regístrate aquí
        </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordRules: [
        (v) => (v && v.length >= 4) || 'La clave debe ser al menos de 8 caracteres',
      ],
      emailRules: [
        (v) => !!v || 'Ingrese su email para continuar',
        (v) => /.+@.+\..+/.test(v) || 'Ingrese un email válido',
      ],
      showPassword: false,
      loadingLogin: false,
    };
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.loadingLogin = true;
        this.$store.dispatch('userModule/login', { email: this.email, password: this.password })
          .then(() => {
            this.loadingLogin = false;
            this.$notiflix.Notify.Success('Bienvenido de vuelta!');
            this.$router.push({ name: 'Home' });
          })
          .catch(() => {
            this.loadingLogin = false;
            this.$notiflix.Notify.Failure('Hubo un error al ingresar, verifica tus credenciales');
          });
      }
    },
    redirectToRegister() {
      this.$router.push({ name: 'Register' });
    },
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
  },
};
</script>

<style scoped></style>
