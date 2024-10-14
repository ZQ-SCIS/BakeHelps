<template>
  <div class="recipes-view">
    <SearchBar
      :searchval="searchval"
      :search_type="search_type"
      @search-recipes="call_recipe_api"
      @search-ingredients="call_ingredients_api"
    />

    <div class="filter">
      <div class="filter-btns">
        <input
          type="button"
          @click="toggleShowDiv"
          class="advFilter-btn"
          value="Advanced Filters"
          title="Advanced Filters"
        />
        <input type="button" @click="reset" class="reset-btn" value="Reset" title="Reset" />
      </div>

      <div v-show="showDiv" id="filters">
        <div class="row">
          <div class="col-md-6 col-lg-3 mb-4">
            <div class="dropdown">
              <button
                class="btn btn-cooking-brown dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Select cooking time"
              >
                {{ filter_time }}
              </button>
              <ul
                class="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
                role="menu"
              >
                <li v-for="option in timing_options" :key="option">
                  <a
                    class="dropdown-item"
                    @click="filter_time = option"
                    href="javascript:void(0)"
                    :title="option"
                    >{{ option }}</a
                  >
                </li>
              </ul>
            </div>
            <b>Timing selected: </b>{{ filter_time }}
          </div>

          <div class="col-md-6 col-lg-3 mb-4">
            <label for="customRange2" class="form-label"
              >Select Number of Ingredients</label
            >
            <input
              type="range"
              class="form-range"
              min="1"
              max="20"
              id="customRange2"
              title="Filter by No. of Ingredients"
              v-model="filter_num_ingredients"
            />
            <b>Number: </b>{{ filter_num_ingredients }}
          </div>

          <div class="col-md-6 col-lg-3 mb-4">
            <label for="customRange2" class="form-label"
              >Select Number of Servings</label
            >
            <input
              type="range"
              class="form-range"
              min="1"
              max="20"
              id="customRange2"
              title="Filter by No. of Servings"
              v-model="filter_servings"
            />
            <b>Number: </b>{{ filter_servings }}
          </div>

          <div class="col-md-6 col-lg-3 mb-4">
            <label for="customCheck" class="form-label"
              >Select Diet(s)</label
            >
            <div class="form-check" id="customCheck">
              <div v-for="(diet, index) in diet_options" :key="index">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="diet"
                  :id="diet"
                  :title="`Filter by ` + diet"
                  v-model="selected_diets"
                />
                <label class="form-check-label" for="diet">
                  {{ diet }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button
            type="button"
            class="btn btn-brown filter-btn px-5 py-1"
            title="Filter Recipes"
            @click="filter()"
          >
            Filter
          </button>
        </div>
      </div>
    </div>

    <h1>Recipes</h1>

    <div class="container-fluid" v-if="loading">
      <div class="row" v-if="filteredrecipes.length != 0">
        <div
          class="col-sm-6 col-md-4 col-lg-3 mb-4"
          v-for="(item, recipeIndex) in recipesToShow"
          :key="recipeIndex"
        >
          <RecipeCard
            v-if="recipeIndex < filteredrecipes.length"
            :recipe="filteredrecipes[recipeIndex]"
            :missingIngredients="missingList[filteredrecipes[recipeIndex].id]"
          />
        </div>
      </div>
      <div class="row" v-show="filteredrecipes.length == 0">
        <span class="text-center">
          No Matching Recipes
        </span>
      </div>
      <div
        v-if="
          recipesToShow < filteredrecipes.length ||
          filteredrecipes.length > recipesToShow
        "
        class="show-more text-center"
      >
        <button type="button" class="btn btn-brown" title="Show more recipes" @click="showMore">
          Show more recipes
        </button>
      </div>
    </div>
    <div v-else class="text-center">Loading Recipes...</div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import SearchBar from "../SearchBar";
import RecipeCard from "../RecipeCard";

export default {
  name: "RecipesView",
  components: {
    SearchBar,
    RecipeCard,
  },
  data() {
    return {
      searchval: "",
      search_type: "",
      showDiv: false,
      loading: false,
      text: "",
      ingredientsList: "",
      missingList: {},
      recipesToShow: 12,
      totalRecipes: 0,
      all_recipes: [],
      filter_time: "Select cooking time",
      filter_num_ingredients: "0",
      filter_servings: "0",
      selected_diets: [],
      diet_options: [
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto Ovo Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Fodmap Friendly",
        "Dairy Free",
      ],
      timing_options: [
        "Select cooking time",
        "Less than 30 mins",
        "30 to 60 mins",
        "60 to 120 mins",
      ],
      checkFilter: false,
      filteredrecipes: [],
    };
  },
  created() {
    this.totalRecipes = this.all_recipes.length;
    this.retrieveHomepageSearchValue();
  },
  methods: {
    toggleShowDiv() {
      this.showDiv = !this.showDiv;
    },

    retrieveHomepageSearchValue() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      this.searchval = urlParams.get("searchval");
      this.search_type = urlParams.get("search_type");

      if (this.searchval == "" || this.searchval == undefined) {
        this.searchval = "cookies";
      }

      // console.log(this.search_type);
      if (this.search_type == "Ingredients") {
        this.call_ingredients_api(this.searchval);
      } else {
        this.call_recipe_api(this.searchval);
      }
    },

    reset() {
      this.checkFilter = false;
      this.filter_time = "Select cooking time";
      this.filter_num_ingredients = "0";
      this.filter_servings = "0";
      this.selected_diets = [];
      this.filteredrecipes = this.all_recipes;

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Filter has been reset successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    },

    call_ingredients_api(value) {
      this.loading = false;
      this.ingredientsList = value;
      // console.log(value);

      let url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients";
      let headers = {
        "x-rapidapi-key": "4260a9f95dmsh6dc9abc8269b1f2p1a259bjsn8787a499d6e1",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      };

      let params = {
        number: "20",
        ingredients: this.ingredientsList,
        ranking: "2",
      };

      axios
        .get(url, { params, headers })
        .then((response) => {
          // console.log(response);

          this.all_recipes = [];
          var recipes = response.data;

          // console.log(recipes, "test");
          for (let index in recipes) {
            var recipe_id = recipes[index].id;
            this.recipeinfo(recipe_id);
            this.missingList[recipe_id] = recipes[index].missedIngredients;
          }
          this.filteredrecipes = this.all_recipes;
          this.filter_servings = "0";
          this.selected_diets = [];

          this.loading = true;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    recipeinfo(recipe_Id) {
      let url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
        recipe_Id +
        "/information";
      let headers = {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "4260a9f95dmsh6dc9abc8269b1f2p1a259bjsn8787a499d6e1",
      };
      axios
        .get(url, { headers })
        .then((response) => {
          var name = response.data.title;
          var id = response.data.id;
          var diets_array = response.data.diets;
          var cookingTime = response.data.cookingMinutes;
          var number_of_ingredients = response.data.extendedIngredients.length;
          var servings = response.data.servings;

          // console.log(response.data);
          if (
            response.data.glutenFree == true &&
            diets_array.includes("gluten free") == false
          ) {
            diets_array.push("gluten free");
          }
          if (
            response.data.vegan == true &&
            diets_array.includes("vegan") == false
          ) {
            diets_array.push("vegan");
          }
          if (
            response.data.vegetarian == true &&
            diets_array.includes("vegetarian") == false
          ) {
            diets_array.push("vegetarian");
          }
          // console.log(diets_array);

          //Images
          var img = "";
          if (Object.prototype.hasOwnProperty.call(response.data, "image")) {
            img = response.data.image;
          } else {
            img = require("../../assets/img/no_img.png");
          }

          this.all_recipes.push({
            name: name,
            image: img,
            id: id,
            diets: diets_array,
            cookingTime: cookingTime,
            servings: servings,
            number_of_ingredients: number_of_ingredients,
          });
        })

        .catch((error) => {
          console.log(error.message);
        });
    },
    call_recipe_api(value) {
      this.loading = false;
      this.text = value;
      // console.log(value)
      let url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
      let headers = {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "4260a9f95dmsh6dc9abc8269b1f2p1a259bjsn8787a499d6e1",
      };

      let params = {
        number: "20",
        query: this.text,
      };

      axios
        .get(url, { params, headers })
        .then((response) => {
          this.checkFilter = false;

          this.filteredrecipes = [];
          this.all_recipes = [];
          var recipes = response.data.results;
          for (let index in recipes) {
            var recipe_id = recipes[index].id;
            this.recipeinfo(recipe_id);
          }
          this.filteredrecipes = this.all_recipes;
          this.filter_servings = "0";
          this.selected_diets = [];
          this.filter_time = "Select cooking time";
          this.filter_num_ingredients = "0";
          this.filter_servings = "0";
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          this.loading = true;
        });
    },

    filterByNumIngredients(pre_filtered_recipes) {
      let filter_num_ingredients = [];
      if (this.filter_num_ingredients != "0") {
        for (let recipe of pre_filtered_recipes) {
          if (recipe.number_of_ingredients <= this.filter_num_ingredients) {
            filter_num_ingredients.push(recipe);
          }
        }
        return filter_num_ingredients;
      } else {
        filter_num_ingredients = pre_filtered_recipes;
        return pre_filtered_recipes;
      }
    },
    filterByNumServings(pre_filtered_recipes) {
      let filter_by_num_servings = [];
      if (this.filter_by_num_servings != "0") {
        for (let recipe of pre_filtered_recipes) {
          if (recipe.servings >= this.filter_servings) {
            filter_by_num_servings.push(recipe);
          }
        }
        return filter_by_num_servings;
      } else {
        return pre_filtered_recipes;
      }
    },
    filterByDiets(pre_filtered_recipes) {
      let filter_by_diets = [];
      if (this.selected_diets.length > 0) {
        for (let recipe of pre_filtered_recipes) {
          var diet_check = this.selected_diets.length;
          for (let diet of this.selected_diets) {
            if (recipe.diets.includes(diet.toLowerCase())) {
              diet_check -= 1;
            }
          }
          if (diet_check == 0) {
            filter_by_diets.push(recipe);
          }
        }
        return filter_by_diets;
      } else {
        return pre_filtered_recipes;
      }
    },
    filterByTime() {
      var filter_array = [];
      if (this.filter_time != "Select cooking time") {
        if (this.filter_time == "Less than 30 mins") {
          for (let recipe of this.all_recipes) {
            if (recipe.cookingTime <= 30 && recipe.cookingTime > 0) {
              filter_array.push(recipe);
            }
          }
        }
        if (this.filter_time == "30 to 60 mins") {
          for (let recipe of this.all_recipes) {
            if (
              recipe.cookingTime <= 60 &&
              recipe.cookingTime > 30 &&
              recipe.cookingTime > 0
            ) {
              filter_array.push(recipe);
            }
          }
        }
        if (this.filter_time == "60 to 120 mins") {
          for (let recipe of this.all_recipes) {
            if (
              recipe.cookingTime <= 120 &&
              recipe.cookingTime > 60 &&
              recipe.cookingTime > 0
            ) {
              filter_array.push(recipe);
            }
          }
        }
        return filter_array;
      } else {
        return this.all_recipes;
      }
    },
    filter() {
      if (
        this.filter_time == "Select cooking time" &&
        this.filter_num_ingredients == "0" &&
        this.filter_servings == "0" &&
        this.selected_diets.length == 0
      ) {
        this.checkFilter = false;
      }
      var time_filtered_recipes = this.filterByTime();
      var num_ingredients_filtered_recipes = this.filterByNumIngredients(
        time_filtered_recipes
      );
      var num_servings_filtered_recipes = this.filterByNumServings(
        num_ingredients_filtered_recipes
      );
      var diets_recipes = this.filterByDiets(num_servings_filtered_recipes);
      this.filteredrecipes = diets_recipes;
      this.checkFilter = true;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Recipe filtered successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    showMore() {
      this.recipesToShow += 8
      if (this.recipesToShow > this.filteredrecipes.length) {
        this.recipesToShow = this.filteredrecipes.length
      }
    }
  },
};
</script>

<style scoped lang="sass" src="./RecipesView.sass"></style>
