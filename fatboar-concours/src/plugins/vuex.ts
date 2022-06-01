import Vue from "vue";
import Vuex from "vuex";
import ClientStore from "@/stores/clients";
import EmployeeStore from "@/stores/employees";
import RestaurantStore from "@/stores/restaurants";
import GiftStore from "@/stores/gifts";
import CashRegisterStore from "@/stores/cash-registers";
import GameStore from "@/stores/games";
import EmailingListStore from "@/stores/emailing-lists";
import AuthStore from "@/stores/auth";
import TicketStore from "@/stores/tickets";
import EventStore from "@/stores/events";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    clientStore: ClientStore,
    employeeStore: EmployeeStore,
    restaurantStore: RestaurantStore,
    giftStore: GiftStore,
    cashRegisterStore: CashRegisterStore,
    gameStore: GameStore,
    emailingListStore: EmailingListStore,
    authStore: AuthStore,
    ticketStore: TicketStore,
    eventStore: EventStore,
  },
});
