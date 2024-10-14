<template>
  <div class="details">
    <RecipeDetailsView :recipeId="this.$route.params"/>
  </div>
</template>

<script>
// @ is an alias to /src
import RecipeDetailsView from '@/components/RecipeDetailsView'

export default {
  name: 'RecipeDetails',
  components: {
    RecipeDetailsView
  }
}
</script>