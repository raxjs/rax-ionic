import { createElement, Component, ContextType, RefObject, createRef } from 'rax';

import { NavContext } from '../contexts/NavContext';

import { IonicRaxProps } from './IonicRaxProps';
import { createForwardRef } from './utils';

interface IonPageProps extends IonicRaxProps {
}

interface IonPageInternalProps extends IonPageProps {
  forwardedRef?: RefObject<HTMLDivElement>;
}

class IonPageInternal extends Component<IonPageInternalProps> {
  context!: ContextType<typeof NavContext>;
  ref: RefObject<HTMLDivElement>;

  constructor(props: IonPageInternalProps) {
    super(props);
    this.ref = this.props.forwardedRef || createRef();
  }

  componentDidMount() {
    if (this.context && this.ref && this.ref.current) {
      if (this.context.hasIonicRouter()) {
        this.context.registerIonPage(this.ref.current);
      }
    }
  }

  render() {
    const { className, children, forwardedRef, ...props } = this.props;

    return (
      <div className={className ? `ion-page ${className}` : 'ion-page'} ref={this.ref} {...props}>
        {children}
      </div>
    );
  }

  static get displayName() {
    return 'IonPage';
  }

  static get contextType() {
    return NavContext;
  }
}

export const IonPage = createForwardRef(IonPageInternal, 'IonPage');
