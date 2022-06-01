export default [
  {
    path: "employes",
    name: "employees",
    meta: { requiresAuth: true },
    component: () => import("@/components/employees/EmployeeList.vue"),
  },
  {
    path: "employes/ajouter",
    name: "employeeCreate",
    meta: { requiresAuth: true },
    component: () => import("@/components/employees/EmployeeCreate.vue"),
  },
  {
    path: "employes/:id/modifier",
    name: "employeeEdit",
    component: () => import("@/components/employees/EmployeeEdit.vue"),
  },
];
