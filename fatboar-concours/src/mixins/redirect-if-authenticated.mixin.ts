import { Vue, Component } from "vue-property-decorator";

@Component
export default class RedirectIfAuthenticatedMixin extends Vue {
  redirectIfAuthenticated() {
    const authUser = this.$store.getters["authStore/getAuthUser"];
    if (authUser) {
      if (authUser.role.name === "admin") {
        this.$router.push({ name: "dashboard" });
      } else {
        this.$router.push({ name: "game" });
      }
    }
  }
}
