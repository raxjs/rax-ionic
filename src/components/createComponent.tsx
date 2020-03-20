import { Component, ContextType, HTMLAttributes, MouseEvent, Ref, createElement } from 'rax';
import findDOMNode from 'rax-find-dom-node';
import { NavContext } from '../contexts/NavContext';
import { RouterDirection } from './hrefprops';
import { attachProps, createForwardRef, dashToPascalCase, isCoveredByRax } from './utils';

interface IonicRaxInternalProps<ElementType> extends HTMLAttributes<ElementType> {
  forwardedRef?: Ref<ElementType>;
  href?: string;
  routerLink?: string;
  ref?: Ref<any>;
  routerDirection?: RouterDirection;
}

export const createRaxComponent = <PropType, ElementType>(
  tagName: string,
  routerLinkComponent = false
) => {
  const displayName = dashToPascalCase(tagName);
  const RaxComponent = class extends Component<IonicRaxInternalProps<PropType>> {
    context!: ContextType<typeof NavContext>;

    constructor(props: IonicRaxInternalProps<PropType>) {
      super(props);
    }

    componentDidMount() {
      this.componentDidUpdate(this.props);
    }

    componentDidUpdate(prevProps: IonicRaxInternalProps<PropType>) {
      const node = findDOMNode(this) as HTMLElement;
      attachProps(node, this.props, prevProps);
    }

    private handleClick = (e: MouseEvent<PropType>) => {
      const { routerLink, routerDirection } = this.props;
      if (routerLink !== undefined) {
        e.preventDefault();
        this.context.navigate(routerLink, routerDirection);
      }
    }

    render() {
      const { children, forwardedRef, style, className, ref, ...cProps } = this.props;

      const propsToPass = Object.keys(cProps).reduce((acc, name) => {
        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          const eventName = name.substring(2).toLowerCase();
          if (isCoveredByRax(eventName)) {
            (acc as any)[name] = (cProps as any)[name];
          }
        }
        return acc;
      }, {});

      const newProps: IonicRaxInternalProps<PropType> = {
        ...propsToPass,
        ref: forwardedRef,
        style
      };

      if (routerLinkComponent) {
        if (this.props.routerLink && !this.props.href) {
          newProps.href = this.props.routerLink;
        }
        if (newProps.onClick) {
          const oldClick = newProps.onClick;
          newProps.onClick = (e: MouseEvent<PropType>) => {
            oldClick(e);
            if (!e.defaultPrevented) {
              this.handleClick(e);
            }
          };
        } else {
          newProps.onClick = this.handleClick;
        }
      }

      return createElement(
        tagName,
        newProps,
        children
      );
    }

    static get displayName() {
      return displayName;
    }

    static get contextType() {
      return NavContext;
    }
  };
  return createForwardRef<PropType, ElementType>(RaxComponent, displayName);
};
