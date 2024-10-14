<template>
  <div class="saved-recipes">
    <SavedRecipesView />
  </div>
</template>

<script>
// @ is an alias to /src
import SavedRecipesView from '@/components/SavedRecipesView'

export default {
  name: 'saved-recipes',
  components: {
    SavedRecipesView
  }
}
</script>
<style lang="sass" scoped>
.saved-recipes
  min-height: 100vh
</style>




