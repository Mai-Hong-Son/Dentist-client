import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import ModalContext from './Context';
import platform from '../../theme/variables/platform';
import EnhancedAlert from '../../components/EnhancedAlert';
import ConfirmDialog from '../../container/Consulting/Common/Components/ConfirmDialog';

export default WrappedComponent => {
  class EnhancedContainer extends React.Component {
    static navigatorButtons = WrappedComponent.navigatorButtons;
    static navigatorStyle = WrappedComponent.navigatorStyle;

    state = {
      modal: null
    };

    showModal = modal => {
      this.setState({ modal });
    };

    dismissModal = () => {
      this.setState({
        modal: null
      });
    };

    showAlert = ({ title, description, buttons }) => {
      const modal = (
        <EnhancedAlert
          title={title}
          description={description}
          defaultCallbackOnTapBackground={false}
          defaultCallback={() => {
            this.dismissModal();
          }}
          buttons={buttons}
        />
      );
      this.showModal(modal);
    };

    showConfirmDialog = ({ title, description, confirmLabel, onConfirmPress = () => {} }) => {
      const modal = (
        <ConfirmDialog
          title={title}
          messageContent={description}
          confirmLabel={confirmLabel}
          onConfirmPress={() => {
            onConfirmPress();
            this.dismissModal();
          }}
        />
      );
      this.showModal(modal);
    };

    render() {
      const { showModal, dismissModal, showAlert, showConfirmDialog } = this;
      return (
        <ModalContext.Provider
          value={{
            showModal,
            dismissModal,
            showAlert,
            showConfirmDialog
          }}
        >
          <WrappedComponent {...this.props} />
          {this.state.modal ? (
            <Modal transparent>
              <View style={styles.container}>{this.state.modal}</View>
            </Modal>
          ) : null}
        </ModalContext.Provider>
      );
    }
  }

  return EnhancedContainer;
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: platform.deviceWidth,
    height: platform.deviceHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
