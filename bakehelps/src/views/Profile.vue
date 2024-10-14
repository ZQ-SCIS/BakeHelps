<template>
  <div class="profile">
    <div class="bg">
      <div class="container">
        <div class="middle text-center">
          <h1 class="title">Profile</h1>
          <img :src="image" alt="" class="user-pic" />
          <h4 class="name">{{ name }}</h4>
          <h4 class="work">{{ email }}</h4>
        </div>
        <div class="btns text-center">
          <button
            type="button"
            class="btn btn-follow"
            data-bs-toggle="modal"
            data-bs-target="#changePwdModal"
            title="Change password"
          >
            Change Password</button
          ><br />
          <br />
          <router-link to="" title="Click to logout" @click="logout()"
            ><h4 class="logout">Logout</h4></router-link
          >
        </div>
      </div>
    </div>

    <!--Bootstrap Modal-->
    <div
      class="modal fade"
      id="changePwdModal"
      tabindex="-1"
      aria-labelledby="changePwdModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="changePwdModalLabel">
              Change Password
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              title="close"
            ></button>
          </div>
          <div class="modal-body">
            <label for="old-pwd">Old Password</label>
            <input
              v-model="old_pwd"
              type="password"
              class="form-control"
              id="old-pwd"
              name="pwd"
              placeholder="Old Password"
              title="Old password"
            /><br />

            <label for="old-pwd">New Password</label>
            <input
              v-model="new_pwd"
              type="password"
              class="form-control"
              id="new-pwd"
              name="pwd"
              placeholder="New Password"
              title="New password"
            />
            <br />

            <label for="old-pwd">Confirm New Password</label>
            <input
              v-model="cfm_pwd"
              type="password"
              class="form-control"
              id="cfm-pwd"
              name="pwd"
              placeholder="Confirm New Password"
              title="Confirm password"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              title="close"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-follow-changepwd"
              data-bs-dismiss="modal"
              title="Save password changes"
              @click="changePassword()"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

const auth = getAuth();
export default {
  name: "Profile",
  data() {
    return {
      name: "",
      email: "",
      old_pwd: "",
      new_pwd: "",
      cfm_pwd: "",
      image: require("@/assets/icons/BakeHelps.svg"),
    };
  },
  beforeMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // logged in
        Swal.fire({
          icon: "error",
          title: "You are not logged in",
          text: "Redirecting to the login page...",
          showConfirmButton: false,
          timer: 1200,
        });
        this.$router.push("/login");
      }
    });
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const uid = user.uid;

        const db = getDatabase();
        const currentUser = ref(db, "BakeHelpsMember/" + uid);
        onValue(currentUser, (snapshot) => {
          const rec = snapshot.val();
          // console.log(rec, 'rec')
          // console.log(Object.keys(rec))

          this.name = rec["name"];
          this.email = rec["email"];

          var rec_keys = Object.keys(rec);
          if (rec_keys.includes("image")) {
            this.image = rec["image"];
            this.image = require(this.image);
          } else {
            this.image = require("@/assets/icons/BakeHelps.svg");
          }
        });
      } else {
        this.loginStatus = false;
      }
    });
  },
  methods: {
    changePassword() {
      if (this.old_pwd == "" || this.new_pwd == "" || this.cfm_pwd == "") {
        Swal.fire({
          icon: "error",
          title: "Please fill in all inputs fields!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (this.new_pwd.length < 6) {
        Swal.fire({
          icon: "warning",
          iconColor: "red",
          title: "New Password is weak!",
          text: "Password should have at least 6 characters",
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (this.old_pwd == this.new_pwd) {
        Swal.fire({
          icon: "warning",
          iconColor: "red",
          title: "New Password cannot be the same as the old Password!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (this.new_pwd != this.cfm_pwd) {
        Swal.fire({
          icon: "error",
          title: "Passwords do not match!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        onAuthStateChanged(auth, (user) => {
          // console.log(user);
          // console.log(user.auth.currentUser);

          reauthenticateWithCredential(
            user.auth.currentUser,
            EmailAuthProvider.credential(
              user.auth.currentUser.email,
              this.old_pwd
            )
          )
            .then(() => {
              updatePassword(user.auth.currentUser, this.new_pwd)
                .then(() => {
                  console.log("update success");
                  Swal.fire({
                    icon: "success",
                    title: "Password change success!",
                    showConfirmButton: false,
                    timer: 1200,
                  });
                  this.old_pwd = "";
                  this.new_pwd = "";
                  this.cfm_pwd = "";
                })
                .catch((error) => {
                  console.log(error, "err1");
                });
            })
            .catch((error) => {
              console.log(error, "err2");
              Swal.fire({
                icon: "error",
                title: "Current password is incorrect!",
                showConfirmButton: false,
                timer: 1000,
              });
            });
        });
      }
    },
    logout() {
      signOut(auth)
        .then(() => {
          console.log("Logout Success!");

          Swal.fire({
            icon: "success",
            title: "Logout success!",
            text: "We hope to see you soon",
            showConfirmButton: false,
            timer: 1400,
          });

          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/global.sass'

.bg
  width: 100%
  height: 100vh
  padding: 25px
  background: url('../assets/img/bg-profile.jpg')
  background-size: cover
  background-position: center
  background-repeat: no-repeat

.container
  width: 400px
  height: 475px
  background-color: white
  margin: 15px auto
  padding: 38px
  border-radius: 12px
  overflow: hidden

.fa-bars
  float: left
  margin-left: 20px
  &:hover
    cursor: pointer
    animation: bars 0.3s ease-in forwards

.fa-cog
  float: right
  margin-right: 20px
  &:hover
    cursor: pointer
    animation: rotate 1s ease-in infinite

.title
  margin-bottom: 20px
  font-weight: bold
  color: $main // #5B2601

img
  width: 110px
  height: 110px
  border-radius: 100%
  background: $bg // #FFFAED
  border: 2px solid $main // #5B2601
  margin-bottom: 20px

.name
  font-size: 20px
  font-weight: bold

.work
  font-size: 20px

.btn-follow-changepwd
  position: relative
  background-color: $main // #5B2601
  border: none
  letter-spacing: 1px
  color: $bg // #FFFAED
  border: 1px solid transparent
  transition: all 0.5s ease-in

.btn-follow
  position: relative
  padding: 15px 60px
  margin-top: 25px
  margin-bottom: 5px
  background-color: $main // #5B2601
  border: none
  border-radius: 10px
  text-transform: uppercase
  letter-spacing: 1px
  color: $bg
  box-shadow: 0px 5px 10px $main // #5B2601
  border: 1px solid transparent
  transition: all 0.2s ease-in
  &:hover
    color: $btn-text // #E9BA16

.profile-status
  font-size: 12px
  color: rgba(255,255,255,0.8)
  padding-top: 7px

@keyframes rotate
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(180deg)

@keyframes bars
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(90deg)

@keyframes img3d
  0%
    transform: rotateY(0deg)

  100%
    transform: rotateY(55deg)

@media screen and ( max-width: 990px )
  .bg
    background: url('../assets/img/bg-mobile-profile.jpg')
    background-size: cover
    background-position: center
    background-repeat: no-repeat

  .container
    margin: 40px auto

@media screen and ( max-width: 500px )
  .container
    width: 100%

@media screen and ( max-width: 400px )
  .btn-follow
    position: relative
    padding: 15px 20px
</style>