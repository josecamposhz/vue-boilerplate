<template>
  <v-dialog v-model="showDialog" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" rounded class="mr-6" v-bind="attrs" v-on="on">
        Nuevo Usuario
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Nuevo Usuario</span>
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
        <v-form ref="form">
          <v-text-field
            v-model="user.firstName"
            placeholder="Nombre"
            prepend-icon="mdi-account"
            type="text"
          />
          <v-text-field
            v-model="user.lastName"
            placeholder="Apellidos"
            prepend-icon="mdi-account"
            type="text"
          />
          <v-text-field
            v-model="user.email"
            placeholder="Correo"
            prepend-icon="mdi-email"
            type="text"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn class="mr-2" text @click="clearForm()">Limpiar</v-btn>
        <v-btn color="green darken-1" text @click="saveUser()">
          Crear Usuario
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
import userService from "@/services/user.service";
export default {
  data() {
    return {
      showDialog: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapMutations(["setSnack"]),
    saveUser() {
      userService
        .save(this.user)
        .then((response) => {
          this.setSnack({
            isOpen: true,
            text: "Registro éxitoso",
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
    clearForm() {
      this.$refs.form.reset();
    },
  },
};
</script>
