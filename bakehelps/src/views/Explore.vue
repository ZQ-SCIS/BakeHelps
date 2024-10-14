<template>
  <div class="explore" >
    <RecipesView />
  </div>
</template>

<script>
// @ is an alias to /src
import RecipesView from '@/components/RecipesView'

export default {
  name: 'explore',
  components: {
    RecipesView
  }
}
</script>
<style lang="sass" scoped>
.explore
  min-height: 100vh
</style>
