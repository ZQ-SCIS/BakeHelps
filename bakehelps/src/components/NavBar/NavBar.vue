<template>
  <!-- Standard Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="nav-container container-fluid">
      <router-link to="/" class="navbar-brand" title="Home">
        <img src="@/assets/icons/BakeHelps.svg" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        title="NavBar toggler -mobile"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/" class="link nav-text" title="Home"> Home </router-link>
          <router-link to="/explore" class="link nav-text" title="Explore recipe"
            >Explore recipes</router-link
          >
          <router-link
            v-if="!this.loginStatus"
            to=""
            class="link nav-text disabled"
            @click="guestuserAlert()"
             title="Saved recipes"
            >Saved recipes</router-link
          >
          <router-link v-else to="/saved-recipes" class="link nav-text" title="Saved recipes"
            >Saved recipes</router-link
          >

          <router-link
            v-if="!this.loginStatus"
            to="/login"
            class="link nav-login-text login"
            title="Login/Register"
          >
            Login/Register
            <img class="login-icon" src="@/assets/icons/login.svg" /><img
              class="login-hover-icon"
              src="@/assets/icons/login-hover.svg"
            />
          </router-link>

          <router-link v-else to="/profile" class="link nav-login-text profile" title="Profile">
            <img
              :src="image"
              alt="user-pic"
              class="user-pic"
            />
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from "sweetalert2";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "NavBar",
  data() {
    return {
      loginStatus: false,
      image: require("@/assets/icons/BakeHelps.svg")
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const uid = user.uid
        // console.log(uid, 'userid')
        this.loginStatus = true;

        const db = getDatabase();
        const currentUserImg = ref(db, "BakeHelpsMember/" + uid + "/image");
        onValue(currentUserImg, (snapshot) => {
          if (snapshot.exists()) {
            const rec = snapshot.val();
            // console.log(rec, 'rec')
            this.image = rec
            this.image = require(this.image)
          } else {
            this.image = require("@/assets/icons/BakeHelps.svg")
          }
        });
      } else {
        this.loginStatus = false;
      }
    });
  },
  methods: {
    guestuserAlert() {
      Swal.fire({
        icon: "warning",
        title: "Want to view Saved Recipes?",
        text: "Login/Register to gain access to this page",
        confirmButtonText:
          '<a href="/login" style="color: #FFFAED; text-decoration: none; font-weight: normal" title="Proceed to login">Login/Register</a>',
        confirmButtonColor: "#5B2601",
      });
    },
  },
};
</script>

<style scoped lang="sass" src="./NavBar.sass"></style>
