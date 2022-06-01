import { CashRegister } from "@/models";
import { CashRegisterState } from "./cash-registers.state";

export default {
  getAll: (state: CashRegisterState): CashRegister[] => state.cashRegisters,
  getOne:
    (state: CashRegisterState) =>
    (id: number): CashRegister | undefined =>
      state.cashRegisters.find((cr) => cr.id === id),
};
