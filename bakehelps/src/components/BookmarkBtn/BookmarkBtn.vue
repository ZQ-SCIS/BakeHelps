<template>
  <div class="BookmarkBtn">
    <button
      type="button"
      :class="`btn ${BtnClass}`"
      id="bookmark"
      title="Save Recipe"
      @click="marked()"
    >
      <span v-html="icon_new"></span>
    </button>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { getDatabase, ref, get, set, remove, child } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const db = getDatabase();

export default {
  name: "BookmarkBtn",
  props: {
    recipe_id: Object,
    BtnClass: String,
  },
  data() {
    return {
      uid: '', 
      icon_new: "<i class='bi bi-bookmark' style='color: #5B2601;'></i>",
      icon_flag: false,
    };
  },
  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      // console.log(user, 'rec-state-user')
      if (user) { // not logged in
        this.uid = user.uid
        this.checkStatus();
      }
    })
  },
  methods: {
    marked() {
      if (this.uid == '') {
        this.icon_new =
          "<i class='bi bi-bookmark' style='color: #5B2601;'></i>";
        Swal.fire({
          icon: "warning",
          title: "Want to save this recipe?",
          text: "Login/Register to gain access to this feature",
          confirmButtonText:
            '<a href="/login" style="color: #FFFAED; text-decoration: none; font-weight: normal">Login/Register</a>',
          confirmButtonColor: "#5B2601",
        });
      } else {
        if (this.icon_flag == false) {
          //add
          let api_url =
            "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
            this.recipe_id +
            "/information";
          let headers = {
            "x-rapidapi-host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "4260a9f95dmsh6dc9abc8269b1f2p1a259bjsn8787a499d6e1",
          };
          var diets_array = [];

          axios
            .get(api_url, {
              headers,
            })
            .then((response) => {
              diets_array = response.data.diets;

              if (
                Object.prototype.hasOwnProperty.call(response.data, "image")
              ) {
                var img = response.data.image;
              } else {
                img = require("../../assets/img/no_img.png");
              }

              //step 2: save recipe
              set(ref(db, "BakeHelpsMember/" + this.uid + "/SavedRec/" + this.recipe_id), {
                RecipeId: this.recipe_id,
                Title: response.data.title,
                Image: img,
                Source: response.data.sourceUrl,
                Diets: diets_array,
              })
                .then(() => {
                  this.icon_new =
                    "<i class='bi bi-bookmark-fill' style='color: #5B2601'></i>";
                  this.icon_flag = true;
                  Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Recipe saved successfully",
                    backdrop: "transparent",
                    showClass: {
                      popup: "animate__animated animate__fadeInDown",
                    },
                    showConfirmButton: false,
                    timer: 1000,
                  });
                })
                .catch((error) => {
                  Swal.fire({
                    icon: "error",
                    title: "Unable to save recipe...",
                    text: error,
                  });
                });
            })

            .catch((error) => {
              console.log(error.message);
              Swal.fire({
                icon: "error",
                title: "Unable to save recipe...",
                text: "Error:" + error,
              });
            });
        } else {
          //remove
          //find recipe_id then delete
          Swal.fire({
            title: "Remove this recipe from your saved recipes?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5B2601",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
          })
            .then((result) => {
              if (result.isConfirmed) {
                remove(ref(db, "BakeHelpsMember/" + this.uid + "/SavedRec/" + this.recipe_id));
                Swal.fire({
                  icon: "success",
                  title: "Removed!",
                  text: "Recipe has been removed.",
                  showConfirmButton: false,
                  timer: 1000,
                });
                // console.log(this.$route.name, 'route-name')
                if (this.$route.name != 'saved-recipes') {
                  this.icon_new =
                    "<i class='bi bi-bookmark' style='color: #5B2601'></i>";
                  this.icon_flag = false;
                }
              }
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Unable to save recipe...",
                text: error,
              });
            });
        }
      }
    },
    checkStatus() {
      // console.log("checkStatus loaded");
      if (this.uid == '') {
        this.icon_new =
          "<i class='bi bi-bookmark' style='color: #5B2601'></i>";
      } else {
        const dbref = ref(db);
        get(child(dbref, "BakeHelpsMember/" + this.uid + "/SavedRec/" + this.recipe_id))
          .then((snapshot) => {
            console.log(snapshot, 'snapshot')
            if (snapshot.exists()) {
              this.icon_new =
                "<i class='bi bi-bookmark-fill' style='color: #5B2601'></i>";
              this.icon_flag = true;
            } else {
              this.icon_new =
                "<i class='bi bi-bookmark' style='color: #5B2601'></i>";
              this.icon_flag = false;
            }
          })
          .catch((error) => {
            console.log(error);
            this.icon_new =
              "<i class='bi bi-bookmark' style='color: #5B2601'></i>";
            this.icon_flag = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="sass" src="./BookmarkBtn.sass"></style>
