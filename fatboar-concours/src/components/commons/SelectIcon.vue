<template>
  <v-select
    :value="value"
    :items="icons"
    @change="onChange"
    :required="required"
  >
    <template #item="{ item }">
      <v-icon>{{ item }}</v-icon>
    </template>
  </v-select>
</template>

<script lang="ts">
import { mdiIcons } from "./icons";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GiftCreate extends Vue {
  @Prop({ required: true }) readonly value!: string;
  @Prop({ default: false }) readonly multiple!: boolean;
  @Prop({ default: "Icones" }) readonly label!: string;
  @Prop({ default: false }) readonly required!: boolean;

  get icons() {
    return mdiIcons.map((icon) => `mdi-${icon}`);
  }

  onChange(icon: string) {
    this.$emit("input", icon);
  }
}
</script>
