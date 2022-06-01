import { Employee, User } from "@/models";
import { ApiResource } from "@/resources/api.resource";
import { AxiosInstance } from "axios";

export class EmployeeResource extends ApiResource<Employee> {
  constructor(http: AxiosInstance) {
    super(http, "users/employees");
  }

  async update({ id, firstname, lastname, email }: Employee): Promise<void> {
    await super.update({ id, firstname, lastname, email } as Employee);
  }
}
