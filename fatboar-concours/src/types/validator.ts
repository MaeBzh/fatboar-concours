import { ValidationObserver, ValidationProvider } from "vee-validate";

export type ValidationProviderInstance = InstanceType<
  typeof ValidationProvider
>;
export type ValidationObserverInstance = InstanceType<
  typeof ValidationObserver
>;

export interface ValidatorRef extends Vue {
  subscribe(subscriber: unknown, kind?: string): void;
  unsubscribe(id: string, kind?: string): void;
  validate(options?: { silent?: boolean }): Promise<boolean>;
  reset(): void;
  restoreProviderState(provider: ValidationProviderInstance): void;
  removeProvider(id: string): void;
  setErrors(errors: Record<string, string[]>): void;
}
