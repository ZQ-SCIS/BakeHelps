<template>
  <div class="RecipeDetailsView">
    <div class="container mx-auto">
      <div class="row text-center">
        <div class="col ms-2" id="title">
          <h2>
            <b>{{ title }}</b>
          </h2>
        </div>
      </div>

      <div class="row">
        <div class="col text-center">
          <div class="image pb-3">
            <img :src="image" />
          </div>

          <div class="btns mx-auto">
            <BookmarkBtn :BtnClass="'bg-light btn-outline-brown'" :recipe_id="this.$route.params.recipeId" />
            <button
              type="button"
              class="btn btn-brown ms-3"
              onclick="window.print();return false;"
              id="print"
              title="Print"
            >
              <i class="bi bi-printer"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="row text-center pt-3">
        <div class="text-center mx-auto">
          <span v-for="(diet, index) of diets_array" :key="index">
            <span :class="diet.color">{{ diet.diet_name }}</span>
          </span>
        </div>
      </div>

      <div class="row text-center mx-auto">
        <div class="recipeInfo mx-auto py-4" style="display: flex; justify-content: center">
          <div class="card mb-3" style="max-width: 12rem; margin-right: 30px">
            <div class="card-header bg-burnt text-light">Yield</div>
            <div class="card-body text-dark">
              <h5 class="card-title">
                <span id="details">{{ servings }}</span> servings
              </h5>
            </div>
          </div>

          <div class="card mb-3" style="max-width: 12rem; margin-right: 30px">
            <div class="card-header bg-burnt text-light">Cooking Duration</div>
            <div class="card-body text-dark">
              <h5 class="card-title">
                <span
                  v-if="cooking_time.minutes == 0 && cooking_time.hours == 0"
                  >Unavailable</span
                >
                <span
                  v-else-if="
                    isNaN(cooking_time.hours) | isNaN(cooking_time.hours)
                  "
                  >Unavailable</span
                >
                <span v-else
                  ><span id="details">{{ cooking_time.hours }}</span> hours
                  <span id="details">{{ cooking_time.minutes }}</span>
                  mins</span
                >
              </h5>
            </div>
          </div>

          <div class="card mb-3" style="max-width: 12rem; margin-right: 30px">
            <div class="card-header bg-burnt text-light">
              Preparation Duration
            </div>
            <div class="card-body text-dark">
              <h5 class="card-title">
                <span v-if="prep_time.minutes == 0 && prep_time.hours == 0"
                  >Unavailable</span
                >
                <span
                  v-else-if="isNaN(prep_time.hours) | isNaN(prep_time.hours)"
                  >Unavailable</span
                >
                <span v-else
                  ><span id="details">{{ prep_time.hours }}</span> hours
                  <span id="details">{{ prep_time.minutes }}</span> mins</span
                >
              </h5>
            </div>
          </div>

          <div class="card mb-3" style="max-width: 12rem">
            <div class="card-header bg-burnt text-light">Total Duration</div>
            <div class="card-body text-dark">
              <h5 class="card-title">
                <span v-if="isNaN(total_time.hours) | isNaN(total_time.hours)"
                  >Unavailable</span
                >
                <span v-else
                  ><span id="details">{{ total_time.hours }}</span> hours
                  <span id="details">{{ total_time.minutes }} </span> mins
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-i">
      <div class="col-sm-3 ps-5 pe-5 pb-5">
        <b>Ingredients</b>

        <div class="serving-btn">
          <button
            type="button"
            class="btn btn-brown rounded-pill"
            @click="ingredients_cal(1)"
            :value="1"
            title="Single Recipe"
          >
            x1
          </button>

          <button
            type="button"
            class="btn btn-brown rounded-pill"
            @click="ingredients_cal(2)"
            :value="2"
            title="Double Recipe"
          >
            x2
          </button>

          <button
            type="button"
            class="btn btn-brown rounded-pill"
            @click="ingredients_cal(3)"
            :value="3"
            title="Triple Recipe"
          >
            x3
          </button>
        </div>

        <p v-for="(ingredient, index) in ingredients_array" :key="index">
          <span v-if="ingredient.amount % 1 != 0"
            ><span id="details">{{ ingredient.amount.toFixed(2) }}</span></span
          >
          <span v-else
            ><span id="details">{{ ingredient.amount_multiply }}</span></span
          >
          {{ ingredient.unit }}
          {{ ingredient.name }}
        </p>

        <!-- <div class="text-center"></div> -->
      </div>

      <div class="col-sm-9 ps-5 pe-5 pb-5" v-if="instructions.length > 0">
        <b>Instructions</b>
        <p v-for="(x, index) in instructions" :key="index">
          <span>
            <span id="instructions_num"> Step {{ x.number }} </span>
            <span id="vline"></span>
            {{ x.step }}
          </span>
        </p>

        <div>
          <a :href="sourceUrl" target="_blank">
            <button type="button" class="btn mt-3" id="link" title="Proceed to external recipe source url">
              <span>Link to source</span>
            </button>
          </a>
        </div>
      </div>

      <div class="col-sm-8" v-else>
        <h6>
          Instructions Unavailable. Please click on the link below for original
          recipe
        </h6>

        <div>
          <a :href="sourceUrl" target="_blank">
            <button type="button" class="btn" id="link" title="Proceed to external recipe source url">
              <span>Link to source</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BookmarkBtn from "../BookmarkBtn/BookmarkBtn";

export default {
  name: "RecipeDetailsView",
  components: { BookmarkBtn },
  data() {
    return {
      info: "",
      diets_array: [],
      image: "",
      ingredients_array: [],
      cooking_time: {},
      instructions: "",
      servings: "",
      servings_original: "",
      sourceName: "",
      sourceUrl: "",
      title: "",
      prep_time: {},
      total_time: {},
      count: 0,
      multiplied_ingredients_array: [],
      multiply: 1,
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  created() {
    this.get_recipe_info();
  },
  methods: {
    get_recipe_info() {
      let recipe_id = this.$route.params.recipeId;
      let api_url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
        recipe_id +
        "/information";
      let headers = {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "4260a9f95dmsh6dc9abc8269b1f2p1a259bjsn8787a499d6e1",
      };
      return axios
        .get(api_url, { headers })
        .then((response) => {
          this.title = response.data.title;
          // console.log(response.data);

          this.image = response.data.image;
          this.servings = response.data.servings;
          this.servings_original = response.data.servings;
          this.cooking_time = response.data.cookingMinutes;
          var time = response.data.cookingMinutes;
          var hours = Math.floor(time / 60);
          var minutes = time % 60;
          this.cooking_time = { hours: hours, minutes: minutes };
          var p_time = response.data.preparationMinutes;
          var p_hours = Math.floor(p_time / 60);
          var p_minutes = time % 60;
          this.prep_time = { hours: p_hours, minutes: p_minutes };
          var total_time_mins = p_minutes + minutes;
          var total_time_hours = p_hours + hours;
          var total_time_mins_convert = 0;
          if (total_time_mins >= 60) {
            total_time_mins_convert = total_time_mins % 60;
            total_time_hours += Math.floor(total_time_mins / 60);
          } else {
            total_time_mins_convert = total_time_mins;
          }
          this.total_time = {
            hours: total_time_hours,
            minutes: total_time_mins_convert,
          };
          this.sourceName = response.data.sourceName;
          this.sourceUrl = response.data.sourceUrl;
          for (let i = 0; i < response.data.extendedIngredients.length; i++) {
            var name = response.data.extendedIngredients[i].name;
            var amount = response.data.extendedIngredients[i].amount;
            var unit = response.data.extendedIngredients[i].unit;
            var ingredient_object = {
              name: name,
              amount: amount,
              unit: unit,
              amount_multiply: amount,
            };
            this.ingredients_array.push(ingredient_object);
          }
          this.instructions = response.data.analyzedInstructions[0].steps;
          // console.log(this.cooking_time);

          //diets
          var all_diets = response.data.diets;
          
          for (let i = 0; i < all_diets.length; i++) {
            if (all_diets[i] == "vegan") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-vegan",
              });
            }
            if (all_diets[i] == "gluten free") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-gluten",
              });
            }
            if (all_diets[i] == "ketogenic") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-ketogenic",
              });
            }
            if (all_diets[i] == "vegetarian") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-vegetarian",
              });
            }
            if (all_diets[i] == "lacto ovo vegetarian") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-lacto-ovo-vegetarian",
              });
            }
            if (all_diets[i] == "pescetarian") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-pescetarian",
              });
            }
            if (all_diets[i] == "paleo") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-paleo",
              });
            }
            if (all_diets[i] == "primal") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-primal",
              });
            }
            if (all_diets[i] == "fodmap friendly") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-fodmap-friendly",
              });
            }
            if (all_diets[i] == "dairy free") {
              this.diets_array.push({
                diet_name: all_diets[i],
                color: "badge rounded-pill bg-dairy-free",
              });
            }
          }
          // console.log(response.data.vegetarian);
        })

        .catch((error) => {
          console.log(error.message);
        });
    },
    ingredients_cal(value) {
      for (let ingredient of this.ingredients_array) {
        ingredient.amount_multiply = ingredient.amount;
      }
      for (let ingredient of this.ingredients_array) {
        if (value == 2) {
          ingredient.amount_multiply = ingredient.amount * 2;
        }
        if (value == 3) {
          ingredient.amount_multiply = ingredient.amount * 3;
        }
        if (value == 1) {
          ingredient.amount_multiply = ingredient.amount * 1;
        }
      }

      if (value == 1) {
        this.servings = this.servings_original * 1;
      }
      if (value == 2) {
        this.servings = this.servings_original * 2;
      }
      if (value == 3) {
        this.servings = this.servings_original * 3;
      }
    },
  },
};
</script>

<style scoped lang="sass" src="./RecipeDetailsView.sass"></style>
