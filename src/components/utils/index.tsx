import { Config as CoreConfig, Platforms, getPlatforms as getPlatformsCore, isPlatform as isPlatformCore } from '@ionic/core';
import { createElement, HTMLAttributes, Ref, forwardRef } from 'rax';

import { IonicRaxProps } from '../IonicRaxProps';

export type IonicRaxExternalProps<PropType, ElementType> = PropType & Omit<HTMLAttributes<ElementType>, 'style'> & IonicRaxProps;

export const createForwardRef = <PropType, ElementType>(RaxComponent: any, displayName: string) => {
  const _forwardRef = (props: IonicRaxExternalProps<PropType, ElementType>, ref: Ref<ElementType>) => {
    return <RaxComponent {...props} forwardedRef={ref} />;
  };
  _forwardRef.displayName = displayName;

  return forwardRef(_forwardRef);
};

export * from './attachProps';
export * from './case';

export const isPlatform = (platform: Platforms) => {
  return isPlatformCore(window, platform);
};

export const getPlatforms = () => {
  return getPlatformsCore(window);
};

export const getConfig = (): CoreConfig | null => {
  if (typeof (window as any) !== 'undefined') {
    const Ionic = (window as any).Ionic;
    if (Ionic && Ionic.config) {
      return Ionic.config;
    }
  }
  return null;
};
