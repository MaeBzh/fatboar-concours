export type ConfirmOptions = {
  color: string;
  width: number;
  zIndex: number;
};

export interface ConfirmRef extends Vue {
  open(
    payload: {
      title: string;
      message: string;
      confirmText?: string;
      cancelText?: string;
    },
    options?: ConfirmOptions
  ): Promise<boolean>;
  agree(): void;
  cancel(): void;
}
