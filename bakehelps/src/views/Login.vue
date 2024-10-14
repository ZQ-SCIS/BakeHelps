<template>
  <div v-show="login" class="login">
    <LoginContainer @toggleRegister="toggleCard" />
  </div>
  <div v-show="register" class="register">
    <RegisterContainer @toggleLogin="toggleCard" />
  </div>
</template>

<script>
// @ is an alias to /src
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginContainer from '@/components/LoginContainer'
import RegisterContainer from '@/components/RegisterContainer'

export default {
  name: "Login",
  components: {
    LoginContainer,
    RegisterContainer
  },
  data() {
    return {
      login: true,
      register: false
    };
  },
  beforeMount() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) { // logged in
        Swal.fire({
          icon: 'error',
          title: 'You are already logged in',
          text: 'Redirecting to the home page...',
          showConfirmButton: false,
          timer: 1200
        })
        this.$router.push('/profile')
      }
    })
  },
  methods: {
    toggleCard(string) {
      // console.log(string)
      if (string == 'login') {
        this.login = true
        this.register = false
      }
      if (string == 'register') {
        this.register = true
        this.login = false
      }
    }
  }
};
</script>