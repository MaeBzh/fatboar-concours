import { CashRegister } from "@/models/cash-register.model";
import { CashRegisterState } from "./cash-registers.state";

export default {
  set(state: CashRegisterState, cashRegister: CashRegister[]): void {
    state.cashRegisters = cashRegister;
  },
  add(
    state: CashRegisterState,
    cashRegisters: CashRegister | CashRegister[]
  ): void {
    if (!Array.isArray(cashRegisters)) cashRegisters = [cashRegisters];
    state.cashRegisters.push(...cashRegisters);
  },
  remove(state: CashRegisterState, { id }: CashRegister): void {
    state.cashRegisters = state.cashRegisters.filter(
      (cashRegister) => id !== cashRegister.id
    );
  },
};
