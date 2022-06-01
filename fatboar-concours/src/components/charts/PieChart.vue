<template>
  <Pie
    v-if="chartData"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :width="width"
    :height="height"
  />
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Pie } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, ArcElement);
declare module "vue-chartjs/legacy" {
  class Pie extends Vue {}
}

@Component({
  components: { Pie },
})
export default class PieChart extends Vue {
  @Prop({ required: true }) readonly chartData!: unknown;
  @Prop({ required: true }) readonly chartOptions: unknown;
  @Prop({ type: String, default: "pie-chart" }) readonly chartId!: string;
  @Prop({ type: String, default: "label" }) readonly datasetIdKey!: string;
  @Prop({ type: Number, default: 400 }) readonly width!: number;
  @Prop({ type: Number, default: 400 }) readonly height!: number;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({ type: String, default: () => {} }) readonly cssClasses!: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({ type: Object, default: () => {} }) readonly styles!: null;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({ type: Array, default: () => {} }) readonly plugins!: [];
}
</script>
