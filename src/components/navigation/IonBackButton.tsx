import { JSX as LocalJSX } from '@ionic/core';
import { createElement, Component, ContextType, RefObject } from 'rax';

import { NavContext } from '../../contexts/NavContext';
import { IonicRaxProps } from '../IonicRaxProps';
import { IonBackButtonInner } from '../inner-proxies';

type Props = Omit<LocalJSX.IonBackButton, 'icon'> & IonicRaxProps & {
  icon?: {
    ios: string;
    md: string;
  } | string;
  ref?: RefObject<HTMLIonBackButtonElement>;
};

export class IonBackButton extends Component<Props> {
  context!: ContextType<typeof NavContext>;

  clickButton = (e) => {
    const defaultHref = this.props.defaultHref;
    if (this.context.hasIonicRouter()) {
      e.stopPropagation();
      this.context.goBack(defaultHref);
    } else if (defaultHref !== undefined) {
      window.location.href = defaultHref;
    }
  }

  render() {
    return (
      <IonBackButtonInner onClick={this.clickButton} {...this.props} />
    );
  }

  static get displayName() {
    return 'IonBackButton';
  }

  static get contextType() {
    return NavContext;
  }
}
