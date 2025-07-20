import type { MsButtonProps } from "./MsButton.interface";

export type MsConfirmButtonProps = MsButtonProps & {
  confirmMessage?: string;
  confirmButtonText?: string;
};