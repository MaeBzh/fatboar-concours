import { Employee } from "@/models/employee.model";

export interface EmployeeState {
  employees: Array<Employee>;
}

export default {
  employees: [],
} as EmployeeState;
