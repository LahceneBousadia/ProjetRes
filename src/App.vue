<template>
  <v-app>
    <v-app-bar flat max-height="65">
      <Header />
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header
  },
};
</script>

<style></style>
