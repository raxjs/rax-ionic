import { PopoverOptions, popoverController } from '@ionic/core';
import { RaxNode } from 'rax';

import { createOverlayComponent } from './createOverlayComponent';

export type RaxPopoverOptions = Omit<PopoverOptions, 'component' | 'componentProps'> & {
  children: RaxNode;
};

export const IonPopover = /*@__PURE__*/createOverlayComponent<RaxPopoverOptions, HTMLIonPopoverElement>('IonPopover', popoverController);
