import React from 'react';
import ModalContext from './Context';
import ModalProvider from './Provider';

export { ModalProvider };

const withModal = (modal = 'modal') => WrappedComponent => {
  class EnhancedContainer extends React.Component {
    static navigatorButtons = WrappedComponent.navigatorButtons;
    static navigatorStyle = WrappedComponent.navigatorStyle;

    constructor(props) {
      super(props);
      this.wrappedComponentRef = React.createRef();
    }

    getWrappedInstance = () => this.wrappedComponentRef.current;

    render() {
      return (
        <ModalContext.Consumer>
          {context => {
            const contextProps = { [modal]: context };
            return (
              <WrappedComponent {...this.props} {...contextProps} ref={this.wrappedComponentRef} />
            );
          }}
        </ModalContext.Consumer>
      );
    }
  }

  return EnhancedContainer;
};

export default withModal;
