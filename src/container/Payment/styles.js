import { StyleSheet } from 'react-native';
import Scale from '../../utils/Scale';

// const { width: WINDOW_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: 'rgb(250,250,250)',
  },
  wrapGenericModal: {
    flex: 1
  },
  styleGenericModal: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: 'flex-start'
  },
  titleServiceBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  wrapOptionBox: {
    flexDirection: 'row',
    paddingTop: Scale.getSize(35),
    paddingBottom: Scale.getSize(40),
    paddingHorizontal: Scale.getSize(45)
  },
  optionContent: {
    flex: 1,
    alignItems: 'center'
  },
  statusBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237,237,237)',
  },
  statusPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Scale.getSize(8)
  },
  txtPayment: {
    fontSize: Scale.getSize(10),
    fontWeight: '700',
    color: 'rgb(137,137,137)'
  },
  txtStatus: {
    fontSize: Scale.getSize(14),
    fontWeight: '700'
  },
  txtPrice: {
    fontSize: Scale.getSize(14),
    fontWeight: '700',
    color: 'rgb(137,137,137)'
  },
  titleService: {
    fontSize: Scale.getSize(15),
    fontWeight: '700',
  },
  txtCode: {
    fontSize: Scale.getSize(10),
    color: 'rgb(137,137,137)',
    paddingLeft: 3
  },
  txtOptionButton: {
    textAlign: 'center',
    paddingTop: Scale.getSize(16),
    fontWeight: '700',
    fontSize: Scale.getSize(16)
  },
  optionButton: {
    paddingVertical: 10,
    width: 35,
    borderRadius: 35 / 2
  },
  paymentButtonContainer: {
    paddingTop: 50,
    paddingHorizontal: Scale.getSize(100),
  },
  bookingButtonContent: {
    paddingVertical: 18,
    alignItems: 'center',
  }
});
