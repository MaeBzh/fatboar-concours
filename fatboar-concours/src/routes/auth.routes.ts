export default [
  {
    path: "/connexion",
    name: "login",
    component: () => import("@/components/auth/Login.vue"),
  },
  {
    path: "/login",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/inscription",
    name: "register",
    component: () => import("@/components/auth/Register.vue"),
  },
  {
    path: "/deconnexion",
    name: "logout",
    component: () => import("@/components/auth/Logout.vue"),
  },
  {
    path: "/activer-mon-compte/:token",
    name: "activateAccount",
    component: () => import("@/components/auth/ActivateAccount.vue"),
  },
  {
    path: "/reinitialiser-mot-de-passe/:token",
    name: "resetPassword",
    component: () => import("@/components/auth/ResetPassword.vue"),
  },
  {
    path: "/reinitialiser-mot-de-passe",
    name: "sendResetPassword",
    component: () => import("@/components/auth/SendResetPassword.vue"),
  },
];
