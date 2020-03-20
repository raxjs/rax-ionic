
import { JSX as LocalJSX } from '@ionic/core';
import { createElement, Component, ContextType, RefObject } from 'rax';

import { NavContext } from '../contexts/NavContext';

import { IonicRaxProps } from './IonicRaxProps';
import { IonRouterOutletInner } from './inner-proxies';
import { createForwardRef } from './utils';

type Props = LocalJSX.IonRouterOutlet & {
  ref?: RefObject<any>;
};

type InternalProps = Props & {
  forwardedRef?: RefObject<HTMLIonRouterOutletElement>;
};

const IonRouterOutletContainer = /*@__PURE__*/(() => class extends Component<InternalProps> {
  context!: ContextType<typeof NavContext>;

  render() {

    const StackManager = this.context.getStackManager();

    return (
      this.context.hasIonicRouter() ? (
        <StackManager>
          <IonRouterOutletInner ref={this.props.forwardedRef} {...this.props}>
            {this.props.children}
          </IonRouterOutletInner>
        </StackManager>
      ) : (
          <IonRouterOutletInner ref={this.props.forwardedRef} {...this.props}>
            {this.props.children}
          </IonRouterOutletInner>
        )
    );
  }

  static get contextType() {
    return NavContext;
  }
})();

export const IonRouterOutlet = createForwardRef<Props & IonicRaxProps, HTMLIonRouterOutletElement>(IonRouterOutletContainer, 'IonRouterOutlet');
