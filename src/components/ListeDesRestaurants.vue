<template>
  <div>
    <md-progress-bar md-mode="determinate" :md-value="amount"></md-progress-bar>
    <h1 id="titre">Number of restaurants : {{ nbRestaurantsTotal }}</h1>
    <md-progress-bar
      class="md-accent"
      md-mode="determinate"
      :md-value="amount"
    ></md-progress-bar>

    <md-field md-clearable>
      <md-input
        id="search"
        placeholder="Tape name of restaurant..."
        v-model="nomRestauRecherche"
        type="text"
        @input="chercherRestaurants()"
      />
    </md-field>

    <h3 id="nbtotal"><b>Total of pages:</b> {{ nbPagesTotal }}</h3>
    <v-col cols="12">
      <v-slider
        id="slider"
        @input="getRestaurantsFromServer()"
        type="range"
        min="2"
        max="1000"
        label=" Number of restaurant per page"
        v-model="pagesize"
        thumb-label="always"
      ></v-slider>
    </v-col>
    <center>
    <md-button id="prev"
      class="md-fab md-primary"
      :disabled="page === nbPagesTotal"
      @click="pagePrecedente()"
    >
      <label style="color: black">Prev</label>
    </md-button>
    <md-button id="next"
      class="md-fab md-primary"
      :disabled="page === nbPagesTotal"
      @click="pageSuivante()"
    >
      <label style="color: black">Next</label>
    </md-button>
    <p id="courant">
    Page courante : {{ page }}
    </p>
    </center>
    <br />
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">
          {{ item.name }}
        </md-table-cell>
        <md-table-cell md-label="Cooking" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>
        <md-table-cell md-label="City" md-sort-by="borough">
          {{ item.borough }}
        </md-table-cell>
        <md-table-cell md-label="Delete">
          <md-button
            class="md-fab md-mini md-plain"
            @click="supprimerRestaurant(item)"
          >
            <md-icon>delete</md-icon>
          </md-button></md-table-cell
        >
        <md-table-cell md-label="Details">
          <router-link :to="'/restaurant/' + item._id"
            ><md-button class="md-fab md-mini md-primary">
              <md-icon>add</md-icon></md-button
            ></router-link
          >
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "ListeDesRestaurants",
  data: function () {
    return {
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRestauRecherche: "",
      ville: "",
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;

      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestauRecherche;

      fetch(url)
        .then((responseJSON) => {
          // arrow functions, conserve le bon "this"
          // la réponse est en JSON, on la convertit avec la ligne suivante
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    chercherRestaurants: _.debounce(function () {
      // appelée que si on n'a pas tapé de touches pendant un certain délai
      this.getRestaurantsFromServer();
    }, 300),
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nbtotal {
  text-align: center;
}
@import "../assets/app.css";
</style>
