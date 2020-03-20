import { Component, ComponentType, ContextType, createElement, createRef } from 'rax';

import { IonLifeCycleContext } from '../contexts/IonLifeCycleContext';

export const withIonLifeCycle = (WrappedComponent: ComponentType<any>) => {
  return class IonLifeCycle extends Component<any, any> {
    context!: ContextType<typeof IonLifeCycleContext>;
    componentRef = createRef<any>();

    constructor(props: any) {
      super(props);
    }

    componentDidMount() {
      const element = this.componentRef.current;
      this.context.onIonViewWillEnter(() => {
        if (element && element.ionViewWillEnter) {
          element.ionViewWillEnter();
        }
      });

      this.context.onIonViewDidEnter(() => {
        if (element && element.ionViewDidEnter) {
          element.ionViewDidEnter();
        }
      });

      this.context.onIonViewWillLeave(() => {
        if (element && element.ionViewWillLeave) {
          element.ionViewWillLeave();
        }
      });

      this.context.onIonViewDidLeave(() => {
        if (element && element.ionViewDidLeave) {
          element.ionViewDidLeave();
        }
      });
    }

    render() {
      return (
        <IonLifeCycleContext.Consumer>
          {context => {
            this.context = context;
            return (
              <WrappedComponent ref={this.componentRef} {...this.props} />
            );
          }}
        </IonLifeCycleContext.Consumer>
      );
    }
  };
};
