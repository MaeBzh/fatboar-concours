import employeeActions from "./employee.actions";
import employeeGetters from "./employee.getters";
import employeeMutations from "./employee.mutations";
import employeeState from "./employee.state";

export default {
  namespaced: true,
  state: employeeState,
  getters: employeeGetters,
  mutations: employeeMutations,
  actions: employeeActions,
};
