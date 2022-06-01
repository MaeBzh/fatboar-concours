<template>
  <div class="dashboard">
    <drawer class="ma-3"></drawer>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Drawer from "../layouts/default/Drawer.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { Drawer },
})
export default class Dashboard extends Vue {}
</script>

<style scoped>
.dashboard {
  display: flex;
}
</style>
