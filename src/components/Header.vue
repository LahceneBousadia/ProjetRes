<template>
  <v-main>
    <v-toolbar flat id="mainHeader">
      <v-toolbar-title id="title">WEBSITE OF RESTAURATION</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text><router-link to="/">LIST</router-link></v-btn>
        <v-btn text
          ><router-link to="/CreateRestaurant"
            >NEW RESTAURANT</router-link
          ></v-btn
        >
        <v-btn text><router-link to="/About">ABOUT</router-link></v-btn>
      </v-toolbar-items>
      <div class="hidden-sm-and-up">
        <v-menu offset-y>
 
          <v-list class="responsiveMenu">
            <v-list-item>
              <v-list-item-title
                ><router-link to="/">LIST</router-link></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                ><router-link to="/CreateRestaurant"
                  >NEW RESTAURANT</router-link
                ></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                ><router-link to="/ListeDesRestaurants"
                  >LIST</router-link
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
  </v-main>
</template>

<script>
export default {
  name: "Header",
  data: () => ({}),
};
</script>

<style scoped>
@import "../assets/app.css";
</style>
