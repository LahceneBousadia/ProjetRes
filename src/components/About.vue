<template>
  <form>
    <md-progress-bar md-mode="determinate" :md-value="amount"></md-progress-bar>
    <h1 id="titre">ABOUT : {{ nbRestaurantsTotal }}</h1>
    <md-progress-bar
      class="md-accent"
      md-mode="determinate"
      :md-value="amount"
    ></md-progress-bar>

    <div class="row">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <p id="parag">
        -This is a hybride mobile application built with the Vue.js framework. 
        <br>
        -It offers a list Restaurants where the user can create his own restaurant ,name
        them and choose city, cooking. 
        <br>
        -Few more options are availabe such as deleting the restaurants, and details of each restaurant.
        <br>
        <br />
      </p>
        <div id="card">
          <img id="img" src="../assets/Lahcene.png" alt="Lahcene" />
          <div class="container">
            <p id="title">BOUSADIA LAHCENE</p>
            <p id="email">lahcene.bousadia@etu.univ-cotedazur.fr</p>
            <a
              href="https://www.linkedin.com/in/lahcene-bousadia/"
              target="_blank"
            >
              <input id="boutton-lien" type="button" value="Contact" />
            </a>
          </div>
        </div>
        
    </div>
  </form>
</template>

<script>
export default {
  name: "About",
  components: {},
};
</script>

<style scoped>
@import "../assets/app.css";
</style>
