import { Employee } from "@/models/employee.model";
import { employeeResource } from "@/resources";

export default {
  async fetchAll({ commit }): Promise<Employee[]> {
    const employees = await employeeResource.getAll();
    commit("set", employees);
    return employees;
  },

  async fetchOne({ commit }, id: number): Promise<Employee> {
    const employee = await employeeResource.getOne(id);
    commit("remove", employee);
    commit("add", employee);
    return employee;
  },

  async create({ commit }, employee: Employee): Promise<Employee> {
    const created = await employeeResource.create(employee);
    commit("add", created);
    return created;
  },

  async update({ commit }, employee: Employee): Promise<void> {
    await employeeResource.update(employee);
    commit("remove", employee);
    commit("add", employee);
  },

  async delete({ commit }, employee: Employee): Promise<void> {
    await employeeResource.delete(employee);
    commit("remove", employee);
  },
};
