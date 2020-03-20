import { createElement, PureComponent, RefObject } from 'rax';

import { NavContext } from '../contexts/NavContext';

import { IonicRaxProps } from './IonicRaxProps';
import { IonIconInner } from './inner-proxies';
import { createForwardRef, isPlatform } from './utils';
import { deprecationWarning } from './utils/dev';

interface IonIconProps {
  ariaLabel?: string;
  color?: string;
  flipRtl?: boolean;
  icon?: string;
  ios?: string;
  lazy?: boolean;
  md?: string;
  mode?: 'ios' | 'md';
  name?: string;
  size?: string;
  src?: string;
}

type InternalProps = IonIconProps & {
  forwardedRef?: RefObject<HTMLIonIconElement>;
};

class IonIconContainer extends PureComponent<InternalProps> {

  constructor(props: InternalProps) {
    super(props);
    if (this.props.name) {
      deprecationWarning('icon-name', 'In Ionic Rax, you import icons from "ionicons/icons" and set the icon you imported to the "icon" property. Setting the "name" property has no effect.');
    }
  }

  render() {
    const { icon, ios, md, ...rest } = this.props;

    let iconToUse: typeof icon;

    if (ios || md) {
      if (isPlatform('ios')) {
        iconToUse = ios ?? md ?? icon;
      } else {
        iconToUse = md ?? ios ?? icon;
      }
    } else {
      iconToUse = icon;
    }

    return (
      <IonIconInner ref={this.props.forwardedRef} icon={iconToUse} {...rest}>
        {this.props.children}
      </IonIconInner>
    );
  }

  static get contextType() {
    return NavContext;
  }
}

export const IonIcon = createForwardRef<IonIconProps & IonicRaxProps, HTMLIonIconElement>(IonIconContainer, 'IonIcon');
