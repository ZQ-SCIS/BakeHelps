<template>
  <div class="bakehelps">
    <div class="nav-component">
      <NavBar />
    </div>

    <router-view />
    <div class="footer-component">
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHR6yQ5x-fvfEkopQyJPegFYnq-igARQY",
  authDomain: "crud-operation-1d932.firebaseapp.com",
  databaseURL: "https://crud-operation-1d932-default-rtdb.firebaseio.com",
  projectId: "crud-operation-1d932",
  storageBucket: "crud-operation-1d932.appspot.com",
  messagingSenderId: "1007549495896",
  appId: "1:1007549495896:web:c15f2272aa2cd4e5d3e82d",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
};
</script>
<style lang="sass" scoped>
@import '@/assets/sass/global.sass'
.bakehelps
  font-family: $main-ff // Raleway

.nav-component
  padding-bottom: 70px
</style>