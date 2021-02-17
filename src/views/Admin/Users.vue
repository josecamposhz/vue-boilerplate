<template>
  <v-container>
    <h1 class="mb-4">Usuarios</h1>
    <v-col cols="12">
      <v-row>
        <v-spacer />
        <AdminNewUser />
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="users"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      ></v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import userService from "@/services/user.service";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "Nombres",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "Apellidos", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "Rol", value: "role" },
      ],
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      userService
        .all()
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
  },
};
</script>
