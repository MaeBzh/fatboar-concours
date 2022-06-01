<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Logout extends Vue {
  mounted(): void {
    this.$store.commit("authStore/removeAuthUser");
    this.$router.push({ name: "home" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const facebookSdk = (window as any).FB;
    if (facebookSdk && facebookSdk.getUserID()) {
      facebookSdk.logout();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const googleApi = (window as any).google;
    googleApi.accounts.id.disableAutoSelect();
  }

  render() {
    return "";
  }
}
</script>
