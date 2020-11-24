export interface ToastModel {
  open: boolean | '';
  content: string;
  toastStatus: 'error' | 'success' | '';
}
