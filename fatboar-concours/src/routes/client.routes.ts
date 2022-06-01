export default [
  {
    path: "clients",
    name: "clients",
    meta: { requiresAuth: true },
    component: () => import("@/components/clients/ClientList.vue"),
  },
  // {
  //   path: "clients/:id",
  //   name: "clientDetails",
  //   component: () => import("@/components/clients/ClientDetails.vue")
  // },
  {
    path: "clients/:id/modifier",
    name: "clientEdit",
    meta: { requiresAuth: true },
    component: () => import("@/components/clients/ClientEdit.vue"),
  },
];
