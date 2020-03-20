import { ModalOptions, modalController } from '@ionic/core';
import { RaxNode } from 'rax';

import { createOverlayComponent } from './createOverlayComponent';

export type RaxModalOptions = Omit<ModalOptions, 'component' | 'componentProps'> & {
  children: RaxNode;
};

export const IonModal = /*@__PURE__*/createOverlayComponent<RaxModalOptions, HTMLIonModalElement>('IonModal', modalController);
