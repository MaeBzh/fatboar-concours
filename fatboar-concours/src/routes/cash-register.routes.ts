export default [
  {
    path: "caisses-enregistreuses",
    name: "cashRegisters",
    meta: { requiresAuth: true },
    component: () => import("@/components/cash-registers/CashRegisterList.vue"),
  },
  {
    path: "caisses-enregistreuses/ajouter",
    name: "cashRegisterCreate",
    meta: { requiresAuth: true },
    component: () =>
      import("@/components/cash-registers/CashRegisterCreate.vue"),
  },
  {
    path: "caisses-enregistreuses/:id/modifier",
    name: "cashRegisterEdit",
    meta: { requiresAuth: true },
    component: () => import("@/components/cash-registers/CashRegisterEdit.vue"),
  },
];
