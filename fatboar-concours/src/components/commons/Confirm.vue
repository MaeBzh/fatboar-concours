<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="options.color" dense flat class="accent">
        <v-toolbar-title class="primary--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click.native="cancel">
          {{ cancelText }}
        </v-btn>
        <v-btn color="primary" depressed @click.native="agree">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    confirmText: null,
    cancelText: null,
    options: {
      color: "primary",
      width: 400,
      zIndex: 200,
    },
  }),
  methods: {
    open(
      { title, message, confirmText = "Confirmer", cancelText = "Annuler" },
      options
    ) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.confirmText = confirmText;
      this.cancelText = cancelText;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.$store.commit("eventStore/add", {
        name: "entityDeleted",
      });
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
