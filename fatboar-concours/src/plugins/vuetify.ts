import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#010326",
        secondary: "#f0ece8",
        accent: "#ffc24d",
        error: "#c3151e",
        success: "#89af35",
      },
    },
  },
  icons: {
    iconfont: "mdi",
  },
});

export default vuetify;
