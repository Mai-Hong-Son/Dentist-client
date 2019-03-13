import { StyleSheet, Dimensions } from 'react-native';
import Scale from '../../utils/Scale';

const { width: WIDTH_SCREEN } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Scale.getSize(20)
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: Scale.getSize(1),
    borderTopLeftRadius: Scale.getSize(12),
    borderTopRightRadius: Scale.getSize(12),
    paddingTop: Scale.getSize(25),
  },

  imageContainer: {
    height: Scale.getSize(70),
    width: Scale.getSize(70),
    shadowOffset: { width: 0, height: Scale.getSize(2) },
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOpacity: 0.7,
    elevation: Scale.getSize(1),
    borderColor: 'black',
    borderRadius: Scale.getSize(4),
    backgroundColor: '#fff'
  },

  image: {
    flex: 1
  },

  profileDentist: {
    flexDirection: 'row',
    paddingBottom: Scale.getSize(10)
  },

  contentProfile: {
    fontSize: Scale.getSize(10),
    color: 'rgb(168,168,168)'
  },

  profileContentRight: {
    marginLeft: Scale.getSize(15),
    height: Scale.getSize(70),
    justifyContent: 'space-between'
  },

  name: {
    fontSize: Scale.getSize(14),
    fontWeight: 'bold',
    color: 'rgb(82,82,82)'
  },

  degree: {
    fontSize: Scale.getSize(12),
    color: 'rgb(168,168,168)'
  },

  wrapMiddleContent: {
    flexDirection: 'row',
    paddingTop: Scale.getSize(10),
    paddingBottom: Scale.getSize(20),
    justifyContent: 'space-between'
  },

  childMiddleContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: Scale.getSize(5),
    width: Scale.getSize(85)
  },

  experienceTitle: {
    fontSize: Scale.getSize(9),
    fontWeight: 'bold',
    marginTop: Scale.getSize(6),
    color: 'rgb(82,82,82)'
  },

  txtExp: {
    color: '#ff7936',
    fontWeight: 'bold'
  },

  wrapDataContentBottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgb(168,168,168)',
    paddingVertical: Scale.getSize(15)
  },

  titleProfile: {
    fontWeight: 'bold',
    marginBottom: Scale.getSize(7),
    color: 'rgb(82,82,82)',
    fontSize: Scale.getSize(15)
  },

  wrapBtnBooking: {
    paddingHorizontal: Scale.getSize(40),
    justifyContent: 'flex-end'
  },

  btnBooking: {
    paddingVertical: Scale.getSize(20),
    alignItems: 'center'
  },

  wrapDateTime: {
    height: Scale.getSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  titleSelectDate: {
    flex: 3,
    fontWeight: 'bold',
    color: 'rgb(82,82,82)',
    fontSize: Scale.getSize(15)
  },

  dateTimeContent: {
    paddingHorizontal: Scale.getSize(30),
    fontWeight: 'bold',
    color: 'rgb(82,82,82)',
    fontSize: Scale.getSize(15)
  },

  datetimePickerContainer: {
    flex: 7,
  },

  optionDateTime: {
    paddingHorizontal: Scale.getSize(15),
    paddingVertical: Scale.getSize(5),
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },

  wrapTimepicker: {
    paddingVertical: Scale.getSize(10)
  },

  wrapSchedulePicker: {
    paddingTop: Scale.getSize(5),
    paddingBottom: Scale.getSize(20),
  },

  contentContainerStyle: {
    paddingVertical: Scale.getSize(10),
    paddingLeft: 25,
  },

  timeButtonContentContainer: {
    paddingVertical: Scale.getSize(5)
  },

  boxContentWithoutBookingButton: {
    paddingHorizontal: Scale.getSize(30),
  },

  boxContentWithoutBookingButtonAndTimePicker: {
    flex: 1,
    backgroundColor: '#fff'
  },

  timeSelectorContainer: {
    paddingTop: 10,
  },

  bookingButtonContainer: {
    paddingVertical: 25,
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  bookingButtonContentContainer: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(80),
    alignItems: 'center'
  },

  wrapTimeButton: {
    marginRight: 25
  },

  paginationStyle: {
    transform: [
      { translateX: ((WIDTH_SCREEN - 80) / 2) - 25 },
      {
        translateY: -30 - Scale.getSize(14) - Scale.getSize(40)
      }
    ]
  },

  textStyle: {
    width: (WIDTH_SCREEN - 130) / 3,
    fontSize: Scale.getSize(14),
    fontWeight: '700',
    textAlign: 'center'
  }
});
