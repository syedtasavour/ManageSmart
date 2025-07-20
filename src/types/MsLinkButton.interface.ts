import type { MsButtonProps } from './MsButton.interface';
import { variantColorMap } from '../utils/variantColorMap';

export type Variant = keyof typeof variantColorMap;

export interface MsLinkButtonProps
  extends Omit<MsButtonProps, 'onClick' | 'apiConfig'> {
  to: string;
  variant?: Variant;
}
