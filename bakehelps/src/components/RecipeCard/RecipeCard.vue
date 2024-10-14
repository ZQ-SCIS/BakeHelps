<template>
  <div class="RecipeCard card h-100">
    <img class="card-img-top" :src="recipe.image" alt="Recipe Image">
    <div class="card-body">
      <div class="recipe-text">
        <div class="recipe-title">
          <h5 class="card-title">{{recipe.name}}</h5>
          <BookmarkBtn :BtnClass="'bg-remove'" :recipe_id="recipe.id" />
        </div>
        
        <p class="card-text">
          <span 
            v-for='(diet, index) in recipe.diets' 
            :key="index"
            :class="`badge rounded-pill ${dietsClass[diet]}`"
          >
            {{diet}}
          </span>
        </p>
        <p class="card-text">
          <span v-if="!(missingIngredients == undefined || missingIngredients.length == 0)">Missing:</span>
          <ul>
            <li v-for="(list, index) in missingIngredients"
              :key="index">
              {{ list.original }}
            </li>
          </ul>
        </p>
      </div>
      <div class="detail-btn">
        <router-link
          :to="`/explore/${recipe.id}`"
          target="_blank"
          class="btn btn-brown"
          title="Click to view more details"
        >
          More details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarkBtn from "../BookmarkBtn/BookmarkBtn";

export default {
  name: "RecipeCard",
  components: {
    BookmarkBtn
  },
  props: {
    recipe: Object,
    missingIngredients: Object,
  },
  data() {
    return {
      dietsClass: {
        "gluten free": "bg-gluten",
        "gluten-free": "bg-gluten",
        'ketogenic': "bg-ketogenic",
        'vegetarian': "bg-vegetarian",
        "lacto ovo vegetarian": "bg-lacto-ovo-vegetarian",
        'vegan': "bg-vegan",
        'pescetarian': "bg-pescetarian",
        'paleo': "bg-paleo",
        'paleolithic': "bg-paleo",
        'primal': "bg-primal",
        "fodmap friendly": "bg-fodmap-friendly",
        "dairy free": "bg-dairy-free",
      },
    };
  },
  watch: {
    recipe(newInitData) {
      // console.log(newInitData);
      return newInitData;
    },
    missingIngredients(newInitData) {
      // console.log(newInitData);
      return newInitData;
    },
  },
};
</script>

<style scoped lang="sass" src="./RecipeCard.sass"></style>
