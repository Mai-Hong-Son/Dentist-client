import React from 'react';

const ModalContext = React.createContext({
  modalContext: {
    showModal: () => {
      console.error('invalid modal provider - showModal is not implemented');
    },
    dismissModal: () => {
      console.error('invalid modal provider - dismissModal is not implemented');
    },
    showAlert: () => {
      console.error('invalid modal provider - showAlert is not implemented');
    },
    showConfirmDialog: () => {
      console.error('invalid modal provider - showConfirmDialog is not implemented');
    }
  }
});

export default ModalContext;
