import { AxiosInstance } from "axios";
import { CashRegister } from "@/models";
import { ApiResource } from "@/resources/api.resource";

export class CashRegisterResource extends ApiResource<CashRegister> {
  constructor(http: AxiosInstance) {
    super(http, "cash-registers");
  }
}
