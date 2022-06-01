export default [
  {
    path: "jeux-concours",
    name: "games",
    meta: { requiresAuth: true },
    component: () => import("@/components/games/GameList.vue"),
  },
  {
    path: "jeux-concours/ajouter",
    name: "gameCreate",
    meta: { requiresAuth: true },
    component: () => import("@/components/games/GameCreate.vue"),
  },
  {
    path: "jeux-concours/:id/modifier",
    name: "gameEdit",
    meta: { requiresAuth: true },
    component: () => import("@/components/games/GameEdit.vue"),
  },
];
