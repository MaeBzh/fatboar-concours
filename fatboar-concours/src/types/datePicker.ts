export interface DatePickerRef extends Vue {
  internalActivePicker: string;
}

export interface DatePickerMenuRef extends Vue {
  save: (year: string) => void;
}
