export default [
  {
    path: "liste-emailing",
    name: "emailingListList",
    meta: { requiresAuth: true },
    component: () => import("@/components/emailing-lists/EmailingListList.vue"),
  },
  {
    path: "liste-emailing/ajouter",
    name: "emailingListCreate",
    meta: { requiresAuth: true },
    component: () =>
      import("@/components/emailing-lists/EmailingListCreate.vue"),
  },
  // {
  //   path: "liste-emailing/:id/modifier",
  //   name: "emailingEdit",
  //   component: () => import("@/components/emailing-lists/EmailingListEdit.vue"),
  // },
];
