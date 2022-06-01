import { Employee } from "@/models/employee.model";
import { EmployeeState } from "./employee.state";

export default {
  set(state: EmployeeState, employees: Employee[]): void {
    state.employees = employees;
  },
  add(state: EmployeeState, employees: Employee | Employee[]): void {
    if (!Array.isArray(employees)) employees = [employees];
    state.employees.push(...employees);
  },
  remove(state: EmployeeState, employee: Employee): void {
    state.employees = state.employees.filter(({ id }) => id !== employee.id);
  },
};
