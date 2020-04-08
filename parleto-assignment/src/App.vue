<template>
  <v-app>
    <v-app-bar app elevate-on-scroll flat>
      <div class="d-flex align-center">
        <v-img
          alt="Parleto Logo"
          class="mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="parletoLogo"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data() {
    return {
      parletoLogo: require("../src/assets/parleto_logo.png")
    };
  }
};
</script>
