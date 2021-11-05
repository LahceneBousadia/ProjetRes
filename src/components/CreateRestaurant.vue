<template>
  <div id="create">
    <md-progress-bar md-mode="determinate" :md-value="amount"></md-progress-bar>
    <h1 id="titre">Add new restaurant : {{ nbRestaurantsTotal }}</h1>
    <md-progress-bar
      class="md-accent"
      md-mode="determinate"
      :md-value="amount"
    ></md-progress-bar>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="ajouterRestaurant($event)"
    >
      <md-card class="tablenewres">
        <md-card-content>
          <div class="newres">
            <div class="rest">
              <md-field>
                <label for="name">Name</label>
                <md-input
                  name="name"
                  id="name"
                  required
                  v-model="nom"
                  autocomplete="given-name"
                  :disabled="sending"
                />
              </md-field>
            </div>

            <div class="rest">
              <md-field>
                <label for="cuisine">Cuisine</label>
                <md-input
                  name="cuisine"
                  id="cuisine"
                  required
                  v-model="cuisine"
                  autocomplete="family-name"
                  :disabled="sending"
                />
              </md-field>
            </div>
            <div class="rest">
              <div class="rest">
                <md-field>
                  <label for="bourogh">City</label>
                  <md-input
                    name="bourogh"
                    id="city"
                    required
                    v-model="bourogh"
                    autocomplete="adresse"
                    :disabled="sending"
                  />
                </md-field>
              </div>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Ajouter</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>
<script>
export default {
  name: "CreateRestaurant",
  computed: {},
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      city: "",
      sending: false,
    };
  },
  mounted() {},
  methods: {
    ajouterRestaurant(event) {
      this.sending = true;
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";
      window.setTimeout(() => {
        fetch(url, {
          method: "POST",
          body: donneesFormulaire,
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
        this.sending = false;
      }, 1500);
      this.nom = "";
      this.cuisine = "";
      this.city = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/app.css";

</style>
