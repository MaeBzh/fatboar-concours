import { CashRegister } from "@/models/cash-register.model";

export interface CashRegisterState {
  cashRegisters: Array<CashRegister>;
}

export default {
  cashRegisters: [],
} as CashRegisterState;
