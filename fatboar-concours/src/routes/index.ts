import { RouteConfig } from "vue-router";
import authRoutes from "./auth.routes";
import cashRegisterRoutes from "./cash-register.routes";
import clientRoutes from "./client.routes";
import emailingListRoutes from "./emailing-list.routes";
import employeeRoutes from "./employee.routes";
import gameRoutes from "./game.routes";
import giftRoutes from "./gift.routes";
import restaurantRoutes from "./restaurant.routes";

const routes: RouteConfig[] = [
  //public routes
  ...authRoutes,
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/a-propos",
    name: "about",
    meta: { footer: "A propos" },
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    meta: { footer: "Contact"},
    component: () => import("@/views/Contact.vue"),
  },
  {
    path: "/mentions-legales",
    name: "legal",
    meta: { footer: "Mentions légales"},
    component: () => import("@/views/Legal.vue"),
  },
  {
    path: "/donnees-personnelles",
    name: "personalData",
    meta: { footer: "Données personnelles"},
    component: () => import("@/views/PersonalData.vue"),
  },
  {
    path: "/cgu",
    name: "tos",
    meta: { footer: "Conditions d'utilisation"},
    component: () => import("@/views/CGU.vue"),
  },
  {
    path: "/reglement-du-jeu-concours",
    name: "gameRules",
    meta: { onlyIfCurrentGame: true, footer: "Règlement du jeu" },
    component: () => import("@/views/GameRules.vue"),
  
  },
  {
    path: "/faq",
    name: "faq",
    meta: { footer: "FAQ"},
    component: () => import("@/views/FAQ.vue"),
  },
  // guarded routes
  {
    path: "/tableau-de-bord",
    redirect: {
      name: "charts",
    },
    name: "dashboard",
    meta: { requiresAuth: true },
    component: () => import("@/views/Dashboard.vue"),
    children: [
      ...clientRoutes,
      ...employeeRoutes,
      ...restaurantRoutes,
      ...giftRoutes,
      ...cashRegisterRoutes,
      ...gameRoutes,
      ...emailingListRoutes,
      {
        path: "statistiques",
        name: "charts",
        component: () => import("@/views/Charts.vue"),
      },
    ],
  },
  {
    path: "/jeu-concours",
    name: "game",
    meta: { requiresAuth: true, rgpdConsent: true },
    component: () => import("@/views/Game.vue"),
  },
  {
    path: "/mon-profil",
    name: "profile",
    meta: { requiresAuth: true, rgpdConsent: true },
    component: () => import("@/components/client-screens/Profile.vue"),
  },
  {
    path: "/modifier-mon-profil",
    name: "editProfile",
    meta: { requiresAuth: true, rgpdConsent: true },
    component: () => import("@/components/client-screens/Profile.vue"),
  },
  {
    path: "/verifier-un-gain",
    name: "verifyGift",
    meta: { requiresAuth: true },
    component: () => import("@/components/employee-screens/VerifyTicket.vue"),
  },
  //404
  {
    path: "*",
    component: () => import("@/views/NotFound.vue"),
  },
];

export default routes;
