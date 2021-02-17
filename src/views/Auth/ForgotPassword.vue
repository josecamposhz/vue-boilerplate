<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card v-if="!linkSent" elevation="12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title dark class="white--text">
              Restablecer contraseña
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <label>Introduce tu Correo electrónico</label>
            <v-text-field
              v-model="email"
              :error-messages="error"
              prepend-icon="mdi-person"
              placeholder="example@example.com"
            />
          </v-card-text>
          <v-card-actions class="text-center">
            <v-btn color="success" block @click="sendLink()">
              Enviar enlace de restablecimiento
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else elevation="12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title dark> Restablecer contraseña </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <span>{{ message }}</span>
          </v-card-text>
          <v-card-actions class="text-center">
            <v-btn color="primary" block @click="goHome()"
              ><v-icon class="mr-2">mdi-input</v-icon>
              Volver al Inicio
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      email: "",
      linkSent: false,
      error: "",
      message: "",
    };
  },
  methods: {
    sendLink() {
      this.error = "";
      authService.forgotPassword({ email: this.email }).then(
        (response) => {
          this.linkSent = true;
          this.message = response.data.message;
        },
        (error) => {
          this.error = error.response.data.error;
        }
      );
    },
    goHome() {
      this.$router.push("/login");
    },
  },
};
</script>
