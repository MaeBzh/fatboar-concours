import App from "@/App.vue";
import "@/components/commons";
import { vuetify, router, store } from "@/plugins";
import "@/resources";
import Vue from "vue";

new Vue({
  el: "#app",
  vuetify,
  store,
  router,
  render: (h) => h(App),
  mounted() {
    const authUser = localStorage.getItem("connectedUser");
    if (authUser) {
      this.$store.commit("authStore/setAuthUser", JSON.parse(authUser));
    }
  },
});
