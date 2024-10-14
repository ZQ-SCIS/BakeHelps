<template>
  <div class="register-container">
    <div id="bg">
      <div class="white_container container-fluid">
        <div class="content mx-auto">
          <div
            class="first_row"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <h2 class="reg_name" style="font-weight: bold; margin: 0">
              Register
            </h2>
            <button
              class="nav-link"
              title="Proceed to login"
              style="
                margin: 0;
                padding: 0;
                background-color: transparent;
                border: 0;
              "
              @click="$emit('toggleLogin', 'login')"
            >
              <span
                class="text-dark"
                style="margin-right: 3px; font-weight: normal; font-size: 14px"
                >or</span
              >
              <b>Log In</b>
            </button>
          </div>

          <div
            class="input-group"
            style="display: flex; flex-direction: column"
          >
            <div
              class="name_row mx-auto"
              style="display: flex; flex-direction: column"
            >
              <p class="name">Name</p>
              <input
                v-model="name"
                type="text"
                class="register-input name_box form-control mx-auto"
                style="display-flex"
              />
            </div>

            <div
              class="email_row mx-auto"
              style="display: flex; flex-direction: column"
            >
              <p class="email_name">Email</p>
              <input
                v-model="email"
                type="text"
                class="register-input email_box form-control mx-auto"
              />
            </div>

            <div
              class="another_rem_row mx-auto"
              style="display: flex; flex-direction: column"
            >
              <p class="pw_name">Password</p>
              <input
                v-model="password"
                type="password"
                class="register-input pw_box form-control"
              />
            </div>

            <div
              class="another_rem_row mx-auto"
              style="display: flex; flex-direction: column"
            >
              <p class="cfm_pw">Confirm Password</p>
              <input
                v-model="cfm_pwd"
                type="password"
                class="register-input cfm_box form-control"
              />
            </div>
          </div>

          <router-link
            to=""
            style="display: flex; align-items: center"
            class="
              nav-link
              register_button
              text-center
              justify-content-center
              mx-auto
            "
            title="Click to register"
            @click="register()"
          >
            Register
          </router-link>

          <div
            class="separator mx-auto"
            style="display: flex; justify-content: center; align-items: center"
          >
            <hr class="hr" />
            <div class="line mx-2">or sign up with</div>
            <hr class="hr_" />
          </div>

          <div
            id="row_with_icons"
            class="row"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              style="width: 65px"
              class="rounded-circle mx-4"
              src="@/assets/icons/google_icon.png"
              title="Google sign in"
            />
            <img
              style="width: 65px"
              class="rounded-circle mx-4"
              src="@/assets/icons/fb.png"
              title="Facebook sign in"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "RegisterContainer",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      cfm_pwd: "",
    };
  },
  methods: {
    register() {
      if (this.name == "" || this.email == "" || this.password == "" || this.cfm_pwd == "") {
        Swal.fire({
          icon: "error",
          title: "Please fill in all inputs fields!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      else if (this.password != this.cfm_pwd) {
        Swal.fire({
          icon: "error",
          title: "Passwords do not match!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredentials) => {
            console.log("Registration Success!");
            // console.log(userCredentials.user.uid);

            const db = getDatabase();
            set(ref(db, "BakeHelpsMember/" + userCredentials.user.uid), {
              name: this.name,
              email: this.email,
            });

            Swal.fire({
              icon: "success",
              title: "Registration success!",
              text: "Thank you for becoming part of our BakeHelps community",
              showConfirmButton: false,
              timer: 1500,
            });

            this.$router.push("/profile");
          })
          .catch((error) => {
            console.log(error.code);
            if (error.code == "auth/invalid-email") {
              Swal.fire({
                icon: "error",
                title: "Invalid Email!",
                showConfirmButton: false,
                timer: 1000,
              });
            } else if (error.code == "auth/email-already-in-use") {
              Swal.fire({
                icon: "error",
                title: "Email already exists!",
                showConfirmButton: false,
                timer: 1000,
              });
            } else if (error.code == "auth/weak-password") {
              Swal.fire({
                icon: "warning",
                iconColor: "red",
                title: "Weak Password!",
                text: "Password should have at least 6 characters",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          });
      }
    },
  },
};
</script>

<style scoped lang="sass" src="./RegisterContainer.sass"></style>
