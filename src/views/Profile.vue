<template>
  <v-container class="fill-height" fluid>
    <h1>Perfil</h1>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <div>
              <div class="display-1 font-weight-light mb-2">
                Editar Perfil
              </div>
            </div>

            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="user.firstName" label="Nombre" />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="user.lastName" label="Apellido" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="user.email" label="Email" />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <ProfilePasswordDialog />
                    <v-btn
                      color="success"
                      rounded
                      class="mr-0"
                      @click="updateProfile()"
                    >
                      Actualizar Perfil
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <ProfileAvatar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  computed: {
    ...mapState({ currentUser: (state) => state.user }),
  },
  mounted() {
    this.setForm();
  },
  methods: {
    ...mapMutations(["setUser", "setSnack"]),
    setForm() {
      // Seteamos nuestro formulario con los datos del usuario
      const { firstName, lastName, email } = this.currentUser;
      this.user = { firstName, lastName, email };
    },
    updateProfile() {
      authService
        .updateProfile(this.user, this.currentUser.id)
        .then(({ data }) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          this.setUser(data.user);
          this.setSnack({
            isOpen: true,
            text: "Usuario actualizado con éxito",
            color: "success",
          });
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
