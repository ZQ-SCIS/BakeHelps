<template>
  <div class="saved-recipes-view mx-auto">
    <h1>Saved Recipes</h1>

    <div class="row text-center" v-if="loading">Loading Recipes...</div>
    <div v-else>
      <div class="container-fluid" v-if="totalRecipes != 0">
        <div
          class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
          v-if="all_recipes.length != 0"
        >
          <div v-for="(item, recipeIndex) in recipesToShow" :key="recipeIndex">
            <RecipeCard
              v-if="recipeIndex < all_recipes.length"
              :recipe="all_recipes[recipeIndex]"
            />
          </div>
        </div>
        <div
          v-if="
            recipesToShow < all_recipes.length ||
            all_recipes.length > recipesToShow
          "
          class="text-center"
        >
          <button
            type="button"
            class="btn btn-brown"
            title="Show more recipes"
            @click="showMore()"
          >
            Show more recipes
          </button>
        </div>
      </div>
      <div v-else class="text-center">No Saved Recipes</div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import RecipeCard from "../RecipeCard";

export default {
  name: "SavedRecipesView",
  components: {
    RecipeCard,
  },
  data() {
    return {
      uid: "",
      loading: true,
      recipesToShow: 12,
      totalRecipes: 0,
      all_recipes: [],
    };
  },
  beforeMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // logged in
        Swal.fire({
          icon: "error",
          title: "You are not logged in",
          text: "Redirecting to the login page...",
          showConfirmButton: false,
          timer: 1200,
        });
        this.$router.push("/login");
      }
    });
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // not logged in
        this.uid = user.uid;
        this.get_saved_rec();
      }
    });
  },
  methods: {
    get_saved_rec() {
      // console.log(this.uid, 'saved')
      this.loading = true;

      const db = getDatabase();
      const theSavedRec = ref(db, "BakeHelpsMember/" + this.uid + "/SavedRec/");
      onValue(theSavedRec, (snapshot) => {
        if (snapshot.exists()) {
          this.all_recipes = [];
          const rec = snapshot.val();
          // console.log(Object.keys(rec))
          // console.log(rec)

          var rec_keys = Object.keys(rec);
          for (let i = 0; i < rec_keys.length; i++) {
            // console.log(rec[rec_keys[i]]) //gets the breakdown of the values
            // console.log(rec[rec_keys[i]]['RecipeId']) //get individual Recipe Id

            var RecipeId = rec[rec_keys[i]]["RecipeId"];
            var Title = rec[rec_keys[i]]["Title"];
            var Image = rec[rec_keys[i]]["Image"];
            var Diets = rec[rec_keys[i]]["Diets"];

            this.all_recipes.push({
              id: RecipeId,
              name: Title,
              image: Image,
              diets: Diets,
            });
          }
        } else {
          this.all_recipes = [];
        }

        // console.log(this.all_recipes);
        this.totalRecipes = this.all_recipes.length;
        this.loading = false;
      });
    },
    showMore() {
      this.recipesToShow += 8;
      if (this.recipesToShow > this.all_recipes.length) {
        this.recipesToShow = this.all_recipes.length;
      }
    },
  },
};
</script>

<style scoped lang="sass" src="./SavedRecipesView.sass"></style>
