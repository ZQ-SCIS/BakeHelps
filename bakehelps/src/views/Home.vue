<template>
  <div class="home">
    <!-- Home Search -->
    <div id="home-search-bg">
      <div
        id="home-search-container"
        class="animate__animated animate__backInUp"
      >
        <!-- Typewriter Effect -->
        <p id="home-msg">
          Want to Start Baking
          <span
            class="txt-type"
            data-wait="1000"
            data-words='["Cakes?", "Pies?", "Bread?", "Brownies?", "Cookies?"]'
          ></span>
        </p>

        <div class="input-group mb-3">
          <button class="btn btn-active dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Toggle search tab">{{ search_type }}</button>
          <ul class="dropdown-menu">
            <li v-for="(option, s_option) in search_options" :key="s_option">
              <a class="dropdown-item sub-btn" :title="'Toggle to search by ' + option" @click="search_type = option">{{
                option
              }}</a>
            </li>
          </ul>
          <input
            v-if="search_type == 'Recipes'"
            v-model="current_search_value"
            type="text"
            class="form-control h-100 search-text has-feedback"
            id="search-input"
            :placeholder="placeholder_value[0]"
            title="Search by recipes"
            aria-label="Text input with dropdown button"
            @keyup.enter="searchRecipes()"
          />
          <input
            v-else
            v-model="current_search_value"
            type="text"
            id="search-input"
            class="form-control h-100 search-text has-feedback"
            :placeholder="placeholder_value[1]"
            title="Search by ingredients"
            aria-label="Text input with dropdown button"
            @keyup.enter="searchRecipes()"
          />
          <router-link
            :to="
              '/explore?searchval=' +
              current_search_value +
              '&search_type=' +
              search_type
            "
            title="Search recipes"
            class="input-group-text"
          >
            <img src="@/assets/icons/search.svg" class="search-icon" />
          </router-link>
        </div>
      </div>

      <!-- Scroll Down Icon -->
      <div class="see-more">
        <i
          class="text-center bi bi-chevron-double-down"
          id="scroll_down"
          title="Scroll to see more"
          @mouseover="scroll_to_inspo()"
        ></i>
        <p id="see">See More!</p>
      </div>
    </div>

    <!-- Cards -->
    <div v-for="(item, i) in item_set" :key="i" class="inspirations container mt-4">
      <h3 id="inspo">Quick {{ category_tags[i] }} Inspirations</h3>
      <div class="row mt-4 animate__animated animate__backInRight">
        <div
          v-for="(detail, y) in item"
          :key="y"
          class="col-sm-6 col-lg-3 mb-4"
        >
          <RecipeCard
            :recipe="item[y]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import RecipeCard from "@/components/RecipeCard";

export default {
  name: "Home",
  components: {
    RecipeCard,
  },
  data() {
    return {
      categories: ["cake", "cookie", "pie", "bread"],
      category_tags: [],
      all_recipes_objects: [],

      info: "",
      item_set: [],
      search_options: ["Recipes", "Ingredients"],
      search_type: "Recipes",
      placeholder_value: [
        "Search by Recipes (E.g. chocolate cake etc.)",
        "Search by Ingredients (E.g. flour, butter etc.)",
      ],
      current_search_value: "",
    };
  },
  
  created() {
    // console.log(window.location)
    if (!window.location.href.includes('#loaded')) {
        window.location = window.location + '#loaded';
        window.location.reload()
    }
    this.call_all_recipes();

    const TypeWriter = function (txtElement, words, wait = 1000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    };

    // Type Method
    TypeWriter.prototype.type = function () {
      // Cur index of word
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];

      if (this.isDeleting) {
        // remove a char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add a char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      // Type Speed
      let typeSpeed = 250;
      if (this.isDeleting) {
        typeSpeed /= 2;
      }

      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at the end of a word
        typeSpeed = this.wait + 1000;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // Move on to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 400;
      }

      // Insert txt into element
      this.txtElement.innerHTML = `<span class="dynamic-text">${this.txt}</span>`;
      setTimeout(() => this.type(), typeSpeed);
    };

    document.addEventListener("DOMContentLoaded", init);

    function init() {
      const txtElement = document.querySelector(".txt-type");
      const words = JSON.parse(txtElement.getAttribute("data-words"));
      const wait = txtElement.getAttribute("data-wait");

      // Init Typewriter
      new TypeWriter(txtElement, words, wait);
    }
  },
  methods: {
    searchRecipes() {
      this.$router.push(
        "/explore?searchval=" +
          this.current_search_value +
          "&search_type=" +
          this.search_type
      );
    },
    // Call all recipes
    call_all_recipes() {
      for (let i in this.categories) {
        // console.log(this.categories[i]);
        this.get_random_recipe(this.categories[i]);
      }
    },

    // Helper function to call get each category
    get_random_recipe(cate) {
      console.log("==== START vegetarian random recipe ====");

      let api_url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random";

      let params = {
        tags: cate,
        number: "4",
      };

      let headers = {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "4260a9f95dmsh6dc9abc8269b1f2p1a259bjsn8787a499d6e1",
      };

      return axios
        .get(api_url, {
          params,
          headers,
        })
        .then((response) => {
          // Get Current Category
          let tags = params.tags;
          let key = tags.split(",")[0];
          // console.log(key);

          // Set Category Title
          if (key == "cake") {
            this.category_tags.push("Cake");
          } else if (key == "pie") {
            this.category_tags.push("Pie");
          } else if (key == "cookie") {
            this.category_tags.push("Cookie");
          } else if (key == "bread") {
            this.category_tags.push("Bread");
          }
          // console.log(response.data)

          let all_recipe = response.data.recipes;
          // console.log(params, all_recipe.recipes);

          let item_component = [];

          for (let i in all_recipe) {
            // console.log(all_recipe[i]);

            // Badges
            var diets_array = all_recipe[i].diets;
            if (
              response.data.glutenFree == true &&
              diets_array.includes("gluten free") == false
            ) {
              diets_array.push("gluten free");
            }
            if (
              response.data.dairyFree == true &&
              diets_array.includes("dairy free") == false
            ) {
              diets_array.push("dairy free");
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

            //Images
            var img = "";
            if (Object.prototype.hasOwnProperty.call(all_recipe[i], "image")) {
              img = all_recipe[i].image;
            } else {
              img = require('../assets/img/no_img.png');
            }

            // console.log("IMG: "+ img)

            let ing_obj = {
              id: all_recipe[i].id,
              name: all_recipe[i].title,
              image: img,
              diets: diets_array,
            };

            // console.log("C My obj: " + JSON.stringify(ing_obj))

            item_component.push(ing_obj);
          }

          // console.log("COMPILED: " + JSON.stringify(item_component));
          this.item_set.push(item_component);
          // console.log("new key value " + JSON.stringify(this.item_set))
        })

        .catch((error) => {
          console.log(error.message);
        });
    },
    scroll_to_inspo() {
      const top = document.getElementById("inspo").offsetTop - 100
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    },
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/global.sass'

.home
  margin-bottom: 80px
  min-height: 100vh

/* Top Half Image Background */
#home-search-bg
  background-image: url("../assets/img/bg-home.jpg")
  background-repeat: no-repeat
  background-size: cover
  background-position: center center
  height: 580px
  margin-bottom: 50px

.animate__animated.animate__backInUp
  --animate-duration: 1.5s

/* Message */
#home-msg
  color: #F1E3BA
  text-align: center
  font-size: 2.5rem
  font-weight: bold
  padding-top: 150px
  text-shadow: 2px 0 2px $main              // #5B2601
  -moz-text-shadow: 2px 0 2px $main         // #5B2601
  -webkit-text-shadow: 2px 0 2px $main      // #5B2601

/* Search Bar Group */
.btn-active
  background-color: $active !important    // #CC5500
  color: $bg                              // #FFFAED
  font-size: 16px
  border-bottom-left-radius: 10px
  border-top-left-radius: 10px
  padding: 0px 0px
  padding-left: 15px
  padding-right: 14px
  height: 50px

.sub-btn
  color: $main                            // #5B2601
  font-size: 16px
  &:hover
    background-color: #ECD8CA !important
    color: $active                        // #CC5500

#home-search-container
  margin: auto
  width: 60%
  text-align: center

.input-group
  height: 50px !important

#search-input
  border: 0
  font-size: 16px
  padding-left: 20px

.input-group-text
  border: 0
  background-color: white

.search-icon
  width: 38px
  height: 38px

/* Scroll down to Section */
#scroll_down
  margin-top: 90px
  display: block
  font-size: 30px
  color: #F1E3BA
  width: 30px
  margin-left: auto
  margin-right: auto
  text-shadow: 2px 0 2px $main              // #5B2601
  -moz-text-shadow: 2px 0 2px $main         // #5B2601
  -webkit-text-shadow: 2px 0 2px $main      // #5B2601

#see
  text-align: center
  color: #F1E3BA
  font-size: 25px
  text-shadow: 2px 0 2px $main              // #5B2601
  -moz-text-shadow: 2px 0 2px $main         // #5B2601
  -webkit-text-shadow: 2px 0 2px $main      // #5B2601

.inspirations
  width: 80%
  padding-top: 30px

@media screen and ( max-width: 990px )
  #home-search-container
    width: 80%

  #home-msg
    font-size: 2rem

  #search-input
    padding-left: 15px

@media screen and ( max-width: 600px )
  #home-search-container
    width: 90%

  #home-msg
    font-size: 1.5rem

  .btn-active
    font-size: 14px
    padding-left: 10px
    padding-right: 9px
    height: 45px

  .sub-btn
    font-size: 14px

  #search-input
    font-size: 14px
    padding-left: 10px

  .input-group-text
    height: 45px

  .search-icon
    width: 32px
    height: 32px

  .input-group
    height: 45px !important
  
</style>
