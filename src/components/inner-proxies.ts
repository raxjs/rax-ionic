import { JSX } from '@ionic/core';
import { JSX as IoniconsJSX } from 'ionicons';

import { /*@__PURE__*/ createRaxComponent } from './createComponent';

export const IonTabBarInner = /*@__PURE__*/createRaxComponent<JSX.IonTabBar, HTMLIonTabBarElement>('ion-tab-bar');
export const IonBackButtonInner = /*@__PURE__*/createRaxComponent<Omit<JSX.IonBackButton, 'icon'>, HTMLIonBackButtonElement>('ion-back-button');
export const IonRouterOutletInner = /*@__PURE__*/createRaxComponent<JSX.IonRouterOutlet, HTMLIonRouterOutletElement>('ion-router-outlet');

// ionicons
export const IonIconInner = /*@__PURE__*/createRaxComponent<IoniconsJSX.IonIcon, HTMLIonIconElement>('ion-icon');
