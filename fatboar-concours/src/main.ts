import App from "@/App.vue";
import "@/components/commons";
import { vuetify, router, store } from "@/plugins";
import "@/resources";
import { config as initdotEnvConfig } from "dotenv";
import Vue from "vue";

initdotEnvConfig();

Vue.config.productionTip = false;

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
