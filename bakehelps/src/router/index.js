import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Explore from '../views/Explore.vue'
import SavedRecipes from '../views/SavedRecipes.vue'
import RecipeDetails from '../views/RecipeDetails.vue'

const routes = [
  {
    path: '/',
    alias: '/index.html',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile

  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/explore/:recipeId',
    name: 'RecipeDetails',
    component: RecipeDetails
  },
  {
    path: '/saved-recipes',
    name: 'saved-recipes',
    component: SavedRecipes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
