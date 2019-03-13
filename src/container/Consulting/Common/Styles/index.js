import Scale from '../../../../utils/Scale';

// import { StyleSheet } from 'react-native';

export const BinaryDividerStyles = {
  leftElementContainer: {
    flex: 1,
    paddingRight: Scale.getSize(5)
  },

  rightElementContainer: {
    flex: 1,
    paddingLeft: Scale.getSize(5)
  }
};

export const FooterStyles = {
  footerContainer: {
    flexDirection: 'row',
    paddingVertical: Scale.getSize(20)
  },

  leftButtonContainer: {
    flex: 1,
    paddingRight: Scale.getSize(5)
  },

  leftButtonContentContainer: {
    borderWidth: Scale.getSize(2),
    borderColor: '#999',
    paddingVertical: Scale.getSize(12),
    overflow: 'hidden',
    alignItems: 'center'
  },

  leftButtonText: {
    color: '#999',
    fontWeight: '800',
    fontSize: Scale.getSize(16)
  },

  rightButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: Scale.getSize(16)
  },

  rightButtonTextDisabled: {
    color: '#999',
    fontWeight: '800',
    fontSize: Scale.getSize(16)
  },

  rightButtonContainer: {
    flex: 1,
    paddingLeft: Scale.getSize(5)
  },

  rightButtonContentContainer: {
    paddingVertical: Scale.getSize(12) + Scale.getSize(2),
    alignItems: 'center'
  },

  rightButtonContentContainerDisabled: {
    paddingVertical: Scale.getSize(12) + Scale.getSize(2),
    alignItems: 'center',
    overflow: 'hidden'
  }
};
