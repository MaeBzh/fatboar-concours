export default [
  {
    path: "restaurants",
    name: "restaurants",
    meta: { requiresAuth: true },
    component: () => import("@/components/restaurants/RestaurantList.vue"),
  },
  {
    path: "restaurants/ajouter",
    name: "restaurantCreate",
    meta: { requiresAuth: true },
    component: () => import("@/components/restaurants/RestaurantCreate.vue"),
  },
  {
    path: "restaurants/:id/modifier",
    name: "restaurantEdit",
    meta: { requiresAuth: true },
    component: () => import("@/components/restaurants/RestaurantEdit.vue"),
  },
];
