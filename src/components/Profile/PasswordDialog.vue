<template>
  <v-dialog v-model="showDialog" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" rounded class="mr-6" v-bind="attrs" v-on="on">
        Editar Contraseña
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Editar Contraseña</span>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          fab
          small
          dark
          class="mb-2"
          @click="showDialog = false"
        >
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row class="px-2">
          <v-text-field
            v-model="passwordForm.oldPassword"
            :type="showOldPassword ? 'text' : 'password'"
            :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            placeholder="Contraseña Actual"
            prepend-icon="mdi-lock"
            @click:append="showOldPassword = !showOldPassword"
          />
          <v-text-field
            v-model="passwordForm.newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            placeholder="Nueva Contraseña"
            prepend-icon="mdi-lock"
            @click:append="showNewPassword = !showNewPassword"
          />
          <v-text-field
            v-model="passwordForm.repeatPassword"
            :type="showRepeatPassword ? 'text' : 'password'"
            :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
            placeholder="Repetir Contraseña"
            prepend-icon="mdi-lock"
            @click:append="showRepeatPassword = !showRepeatPassword"
          />
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="green darken-1" text @click="updatePassword()">
          Actualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      showDialog: false,
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      },
      showOldPassword: false,
      showNewPassword: false,
      showRepeatPassword: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["setUser", "setSnack"]),
    updatePassword() {
      authService
        .updatePassword(this.passwordForm, this.user.id)
        .then(() => {
          this.setSnack({
            isOpen: true,
            text: "Contraseña actualizada con éxito",
            color: "success",
          });
          this.showDialog = false;
        })
        .catch((error) => {
          this.setSnack({
            isOpen: true,
            text: error.response.data.error,
            color: "error",
          });
        });
    },
  },
};
</script>

<style></style>template
