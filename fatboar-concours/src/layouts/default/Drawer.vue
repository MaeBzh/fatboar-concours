<template>
  <div class="drawer">
    <v-card>
      <v-navigation-drawer permanent expand-on-hover height="100vh">
        <v-list nav dense>
          <v-list-item
            link
            v-for="item in items"
            :key="item.title"
            :to="{ name: item.route }"
            class="card-title"
          >
            <v-list-item-icon>
              <v-icon
                size="x-large"
                :aria-label="item.title"
                role="link"
                aria-hidden="false"
              >
                {{ item.icon }}</v-icon
              >
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Clients",
          icon: "mdi-account-multiple",
          route: "clients",
        },
        {
          title: "Employés",
          icon: "mdi-account-tie",
          route: "employees",
        },
        {
          title: "Jeux-concours",
          icon: "mdi-gamepad-variant-outline",
          route: "games",
        },
        { title: "Cadeaux", icon: "mdi-gift", route: "gifts" },
        {
          title: "Restaurants",
          icon: "mdi-table-chair",
          route: "restaurants",
        },
        {
          title: "Caisses enregistreuses",
          icon: "mdi-cash-register",
          route: "cashRegisters",
        },
        {
          title: "Listes de diffusion",
          icon: "mdi-email-multiple",
          route: "emailingListList",
        },
        {
          title: "Statistiques",
          icon: "mdi-chart-bar",
          route: "charts",
        },
      ],
      right: null,
    };
  },
};
</script>

<style scoped>
.drawer {
  height: 100%;
}

.v-icon,
.v-list-item--title {
  color: #010326 !important;
}

.v-list-item--active {
  border: 3px solid #ffc24d;
}

.v-list-item--link::before {
  background-color: #f0ece8;
}
</style>
