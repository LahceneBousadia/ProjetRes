<template>
  <v-main>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        height="250"
        src="https://content-images.weber.com/content/Pizza-italienne.png?w=725&auto=compress,format&blend=https://ux2cms.imgix.net/system-images/gray-overlay-large.png?bs=inherit&balph=0&bm=normal"
      ></v-img>
      <v-card-title> {{ this.restaurant.name }} </v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0"> </v-row>

        <div class="my-4 subtitle-1">
          {{ this.restaurant.cuisine }}
        </div>
        <div class="my-4 subtitle-1">
          <p>
            Adresse : {{ this.restaurant.address.building }}
            {{ this.restaurant.address.street }}
            {{ this.restaurant.address.zipcode }} ,
            {{ this.restaurant.borough }}.
          </p>
        </div>
      </v-card-text>

    </v-card>
    <div class="map">
      <GmapMap 
        :center="{
          lat: this.restaurant.address.coord[1],
          lng: this.restaurant.address.coord[0],
        }"
        :zoom="19"
        map-type-id="terrain"
        style="width: 650px; height: 400px"
      >
        <GmapMarker
          v-bind:position="{
            lat: this.restaurant.address.coord[1],
            lng: this.restaurant.address.coord[0],
          }"
          v-bind:clickable="true"
        />
      </GmapMap>
    </div>
  </v-main>
</template>

<script>
import { gmapApi } from "gmap-vue";
export default {
  name: "Restaurant",
  computed: {
    id() {
      return this.$route.params.id;
    },
    google: gmapApi,
  },
  data: function () {
    return {
      restaurant: "",
      loading: false,
    };
  },
  mounted() {
    console.log("Avant affichage, on pourra faire un fetch... ");
    console.log("ID = " + this.id);
    this.fetchOneRestaurant();
  },
  methods: {
    fetchOneRestaurant() {
      let url = "http://localhost:8080/api/restaurants/" + this.id;
      fetch(url)
        .then((reponse) => {
          return reponse.json();
        })
        .then((data) => {
          console.log(data.restaurant);
          this.restaurant = data.restaurant;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
