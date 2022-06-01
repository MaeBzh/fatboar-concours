<template>
  <v-card :loading="loading" class="pa-8">
    <v-card-title class="card-title">
      {{ title }}
      <template v-if="createBtn">
        <v-spacer></v-spacer>
        <v-btn v-if="addBtn" color="primary" :to="createRoute">Ajouter</v-btn>
      </template>
    </v-card-title>

    <v-card-subtitle>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
    </v-card-subtitle>

    <v-card-text>
      <v-data-table
        :headers="itemHeaders"
        :items="itemRows"
        :search="search"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
      >
        <template
          v-for="(_, name) in $scopedSlots"
          :slot="name"
          slot-scope="slotData"
        >
          <slot :name="name" v-bind="slotData" />
        </template>

        <template v-if="editBtn | deleteBtn" v-slot:[`item.actions`]="{ item }">
          <div class="d-flex flex-row justify-center">
            <v-btn v-if="editBtn" icon small class="mr-2" :to="editRoute(item)">
              <v-icon class="primary--text">mdi-pen</v-icon>
            </v-btn>
            <v-btn
              v-if="exportBtn"
              icon
              small
              class="mr-2"
              @click.stop="exportCsv(item)"
            >
              <v-icon class="primary--text">mdi-file-export</v-icon>
            </v-btn>
            <v-btn
              v-if="drawBtn"
              icon
              small
              class="mr-2"
              @click.stop="drawJackpot(item)"
            >
              <v-icon class="primary--text">mdi-ticket</v-icon>
            </v-btn>

            <template v-if="deleteBtn">
              <v-btn icon small class="mr-2" @click="deleteItem(item)">
                <v-icon class="error--text">mdi-delete</v-icon>
              </v-btn>

              <confirm ref="confirmDeleteItem" />
            </template>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Model } from "@/models";
import { ConfirmRef } from "@/types/confirm";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";
import { formatDate } from "@/helpers/utils";

@Component
export default class ItemList extends Vue {
  @Ref("confirmDeleteItem") readonly confirmDeleteItem!: ConfirmRef;
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, required: true }) readonly model!: string;
  @Prop({ type: Array, required: true }) readonly headers!: DataTableHeader[];
  @Prop({ type: Array, required: false }) readonly items?: Model[];

  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: Boolean, default: true }) readonly addBtn!: boolean;
  @Prop({ type: Boolean, default: true }) readonly createBtn!: boolean;
  @Prop({ type: Boolean, default: true }) readonly editBtn!: boolean;
  @Prop({ type: Boolean, default: true }) readonly deleteBtn!: boolean;
  @Prop({ type: Boolean, default: false }) readonly exportBtn!: boolean;
  @Prop({ type: Boolean, default: false }) readonly drawBtn!: boolean;
  @Prop({ type: String, default: "id" }) readonly sortBy!: string;
  @Prop({ type: Boolean, default: true }) readonly sortDesc!: boolean;

  public search = "";
  public formatDate = formatDate;

  get itemHeaders() {
    const headers = [...this.headers];

    if (this.editBtn || this.deleteBtn) {
      headers.push({
        text: "Actions",
        value: "actions",
        sortable: false,
        filterable: false,
        width: "100px",
      });
    }

    return headers;
  }

  get itemRows(): Model[] {
    return this.items ?? this.$store.getters[`${this.storeName}/getAll`];
  }

  get storeName() {
    return `${this.model}Store`;
  }

  get createRoute() {
    return { name: `${this.model}Create` };
  }

  exportCsv(item) {
    this.$emit("export", item);
  }

  drawJackpot(item) {
    this.$emit("draw", item);
  }

  editRoute(item: Model) {
    return { name: `${this.model}Edit`, params: { id: `${item.id}` } };
  }

  async deleteItem(item: Model): Promise<void> {
    const confirmed = await this.confirmDeleteItem.open({
      title: "Confirmer la suppression",
      message: `La suppression est irréversible. Êtes-vous sur de vouloir continuer ?`,
    });
    if (confirmed) {
      try {
        await this.$store.dispatch(`${this.storeName}/delete`, item);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
