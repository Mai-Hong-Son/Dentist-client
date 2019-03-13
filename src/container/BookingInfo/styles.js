import { StyleSheet } from 'react-native';
import Scale from '../../utils/Scale';

// const { width: WINDOW_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Scale.getSize(30),
    paddingBottom: Scale.getSize(50),
    backgroundColor: 'rgb(250,250,250)',
  },
  wrapGenericModal: {
    flex: 1
  },
  styleGenericModal: {
    paddingHorizontal: 15,
    paddingVertical: Scale.getSize(30),
    justifyContent: 'flex-start'
  },
  cusInfoBox: {
    paddingBottom: Scale.getSize(40),
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237,237,237)',
  },
  serviceInfo: {
    paddingTop: Scale.getSize(30)
  },
  titleInfo: {
    fontSize: Scale.getSize(15),
    fontWeight: '700',
    color: '#ff7936',
    paddingBottom: 15
  },
  txtFistLine: {
    fontSize: Scale.getSize(15),
    fontWeight: '700',
    paddingBottom: 8
  },
  paymentButtonContainer: {
    paddingTop: Scale.getSize(50),
    paddingHorizontal: Scale.getSize(100),
  },
  bookingButtonContent: {
    paddingVertical: 18,
    alignItems: 'center',
  }
});
