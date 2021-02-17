<template>
  <v-card>
    <v-card-text class="text-center">
      <div
        class="mx-auto"
        style="position: relative; min-width: 164px; width: 164px;"
      >
        <v-avatar size="164" tile>
          <v-img class="rounded-circle elevation-2" :src="user.avatar" />
        </v-avatar>
        <v-fab-transition>
          <v-btn
            @click="showDialog = true"
            color="warning"
            small
            dark
            absolute
            fab
            style="right: 0px; bottom: 0px;"
          >
            <v-icon>mdi-camera</v-icon>
          </v-btn>
        </v-fab-transition>
      </div>

      <h4 class="title font-weight-light black--text">
        {{ user.firstName }} {{ user.lastName }}
      </h4>
      <h6 class="subtitle-1 mb-3 grey--text">
        {{ user.role }}
      </h6>
    </v-card-text>
    <v-dialog v-model="showDialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Avatar</span>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            fab
            small
            dark
            class="mb-2"
            @click="closeDialog()"
          >
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="mx-3" inset dark />
        <v-card-text>
          <v-form>
            <v-container py-0 fluid>
              <v-file-input
                v-model="file"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Selecciona una imagen"
                prepend-icon="mdi-camera"
              />
              <v-col cols="12" class="text-right">
                <v-btn color="success" class="mr-0" @click="sendForm()">
                  Actualizar Avatar
                </v-btn>
              </v-col>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      showDialog: false,
      file: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["setSnack", "setUser"]),
    closeDialog() {
      this.showDialog = false;
    },
    sendForm() {
      let formData = new FormData();
      formData.append("avatar", this.file);
      authService
        .updateAvatar(formData, this.user.id)
        .then(({ data }) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          this.setUser(data.user);
          this.setSnack({
            isOpen: true,
            text: "Avatar actualizado con éxito",
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

<style></style>
