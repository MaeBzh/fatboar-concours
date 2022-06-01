import { CashRegister } from "@/models/cash-register.model";
import { cashRegisterResource } from "@/resources";

export default {
  async fetchAll({ commit }): Promise<CashRegister[]> {
    const cashRegisters = await cashRegisterResource.getAll();
    commit("set", cashRegisters);
    return cashRegisters;
  },
  async fetchOne({ commit }, id: number): Promise<CashRegister> {
    const cashRegister = await cashRegisterResource.getOne(id);
    commit("remove", cashRegister);
    commit("add", cashRegister);
    return cashRegister;
  },
  async create({ commit }, item: CashRegister): Promise<CashRegister> {
    const created = await cashRegisterResource.create(item);
    commit("add", created);
    return created;
  },
  async update({ commit }, cashRegister: CashRegister): Promise<void> {
    const updated = await cashRegisterResource.update(cashRegister);
    commit("remove", cashRegister);
    commit("add", updated);
  },
  async delete({ commit }, cashRegister: CashRegister): Promise<void> {
    await cashRegisterResource.delete(cashRegister);
    commit("remove", cashRegister);
  },
};
