<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card elevation="12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title dark>
              Verificar Usuario
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="credentials.password"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock"
                name="password"
                label="Contraseña"
                placeholder="********"
                @click:append="show1 = !show1"
              />
              <v-text-field
                v-model="credentials.confirmPassword"
                :type="show2 ? 'text' : 'password'"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock"
                name="password"
                label="Repetir contraseña"
                placeholder="********"
                @click:append="show2 = !show2"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="text-center">
            <v-btn color="success" block @click="verifyEmail(credentials)">
              Verificar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      show1: false,
      show2: false,
      credentials: {
        password: "",
        confirmPassword: "",
      },
      token: null,
    };
  },
  mounted() {
    this.token = this.$route.query.token;
  },
  methods: {
    ...mapMutations(["setSnack"]),
    verifyEmail() {
      authService.verifyEmail({ token: this.token, ...this.credentials }).then(
        (response) => {
          this.$router.push("/auth/login");
          this.setSnack({
            isOpen: true,
            text: response.data.message,
            color: "success",
          });
        },
        (error) => {
          this.setSnack({
            isOpen: true,
            text: error.response.data.error,
            color: "error",
          });
        }
      );
    },
  },
};
</script>
