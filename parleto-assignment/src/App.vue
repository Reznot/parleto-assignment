/* eslint-disable vue/no-unused-components */
<template>
  <v-app>
    <v-app-bar class="d-flex justify-start" app elevate-on-scroll color="#FFF">
      <div class="d-flex align-center">
        <v-btn href="https://www.parleto.io" target="_blank" text>
          <v-img
            alt="Parleto Logo"
            class="mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            :src="parletoLogo"
            width="150"
          />
        </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <EmployeesDataTable />
      <!-- <HelloWorld /> -->
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import EmployeesDataTable from "./components/EmployeesDataTable.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
    EmployeesDataTable
  },

  data() {
    return {
      parletoLogo: require("../src/assets/parleto_logo.png")
    };
  }
};
</script>
