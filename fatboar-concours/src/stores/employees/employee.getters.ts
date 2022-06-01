import { Employee } from "@/models/employee.model";
import { EmployeeState } from "./employee.state";

export default {
  getAll: (state: EmployeeState): Employee[] => state.employees,
  getOne: (state: EmployeeState) => (id: number) =>
    state.employees.find((employee) => id === employee.id),
};
