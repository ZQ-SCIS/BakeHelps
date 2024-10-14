<template>
  <div class="search-bar">
    <div class="dropdown">
      <button
        id="drop1"
        type="button"
        role="button"
        class="btn search-tabs dropdown-btn dropdown-toggle h-100"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        title="Toggle search tab"
      >
        {{ searchTab }} <b class="caret"></b>
      </button>
      <ul class="dropdown-menu" role="menu" aria-labelledby="drop1" @click="resetInput()">
        <li v-for="(option, s_option) in search_options" :key="s_option">
          <a class="dropdown-item" :title="'Toggle to search by ' + option" @click="searchTab = option">{{
            option
          }}</a>
        </li>
      </ul>
    </div>

    <div class="tab-content" id="tabContent">
      <div v-if="searchTab == 'Recipes'" class="recipes-tab" id="recipes">
        <div class="input-group mb-4">
          <input
            v-model="text"
            type="text"
            class="form-control"
            id="text"
            placeholder="Search by Recipes (E.g. chocolate cake etc.)"
            title="Search by recipes"
            @keyup.enter="$emit('search-recipes', $event.target.value)"
          />
          <button
            type="button"
            class="search-btn"
            title="Search by recipes"
            @click="$emit('search-recipes', text)"
          >
            <img src="@/assets/icons/search.svg" class="search-icon" />
          </button>
        </div>
      </div>
      <div
        v-if="searchTab == 'Ingredients'"
        class="ingredients-tab"
        id="ingredients"
      >
        <div class="input-group ingredients">
          <input
            v-model="ingredientsList"
            type="text"
            class="form-control"
            id="text"
            placeholder="Search by Ingredients (E.g. flour, butter etc.)"
            title="Search by ingredients"
            @keyup.enter="$emit('search-ingredients', $event.target.value)"
          />
          <button
            type="button"
            class="search-btn"
            title="Search by ingredients"
            @click="$emit('search-ingredients', ingredientsList)"
          >
            <img src="@/assets/icons/search.svg" />
          </button>
        </div>
        <p class="mb-3"><i>*Separate each ingredients with a comma</i></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    searchval: String,
    search_type: String
  },
  data() {
    return {
      text: this.searchval,
      ingredientsList: this.searchval,
      search_options: ["Recipes", "Ingredients"],
      searchTab: this.search_type
    };
  },
  watch: {
    searchval(newInitData) {
      console.log(newInitData);
      return newInitData;
    },
    search_type(newInitData) {
      console.log(newInitData);
      return newInitData;
    },
  },
  created() {
    if (this.search_type == "" || this.search_type == undefined) {
      this.searchTab = "Recipes"
      this.text = ""
    }
    else if (this.search_type == "Recipes") {
      this.searchTab = "Recipes"
    }
    else if (this.search_type == "Ingredients") {
      this.searchTab = "Ingredients"
    }
  },
  methods: {
    resetInput() {
      this.text = "";
      this.ingredientsList = "";
    },
  },
};
</script>

<style scoped lang="sass" src="./SearchBar.sass"></style>
