export default [
  {
    path: "cadeaux",
    name: "gifts",
    meta: { requiresAuth: true },
    component: () => import("@/components/gifts/GiftList.vue"),
  },
  {
    path: "cadeaux/ajouter",
    name: "giftCreate",
    meta: { requiresAuth: true },
    component: () => import("@/components/gifts/GiftCreate.vue"),
  },
  {
    path: "cadeaux/:id/modifier",
    name: "giftEdit",
    meta: { requiresAuth: true },
    component: () => import("@/components/gifts/GiftEdit.vue"),
  },
];
