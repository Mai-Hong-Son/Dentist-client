import { StyleSheet, Dimensions } from 'react-native';
import Scale from '../../utils/Scale';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250,250,250)',
    paddingTop: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: Scale.getSize(15),
    color: 'rgb(81,81,81)',
    marginLeft: 15
  },
  contentContainerStyle: {
    paddingTop: Scale.getSize(15),
    paddingLeft: 15,
    width: WINDOW_WIDTH,
  },
  paginationStyle: {
    paddingVertical: Scale.getSize(5)
  },
  contentBottom: {
    flex: 1
  },
  childBottom: {
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  contentText: {
    marginTop: 15,
    marginBottom: 50,
    color: 'rgb(168,168,168)',
    textAlign: 'center',
    fontSize: Scale.getSize(15),
  },
  image: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOpacity: 0.7,
    elevation: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  srcImage: {
    height: Scale.getSize(70),
    width: Scale.getSize(70)
  },
  scrollContent: {
    paddingTop: 5,
    paddingLeft: 15
  },
  childContentNotEmpty: {
    paddingLeft: Scale.getSize(30),
    paddingRight: Scale.getSize(25),
    marginRight: 15,
    paddingVertical: 25
  },
  childContentEmpty: {
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  profileDentist: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  profileContentRight: {
    marginLeft: 15,
    height: Scale.getSize(70),
    justifyContent: 'space-between'
  },
  name: {
    fontSize: Scale.getSize(15),
    fontWeight: 'bold',
    color: 'rgb(82,82,82)'
  },
  degree: {
    fontSize: Scale.getSize(12),
    color: 'rgb(168,168,168)'
  },
  wrapMiddleContent: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
  },
  childMiddleContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 5,
    width: (WINDOW_WIDTH - 55 - Scale.getSize(30) - Scale.getSize(25)) / 3,
  },
  experienceTitle: {
    fontSize: Scale.getSize(9),
    fontWeight: 'bold',
    color: 'rgb(82,82,82)',
    paddingTop: 10
  },
  txtExp: {
    color: '#ff7936',
    fontWeight: 'bold'
  },
  wrapDataContentBottom: {
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: 'rgb(168,168,168)',
    paddingVertical: 15,
    width: Scale.getSize(300)
  },
  titleProfile: {
    fontSize: Scale.getSize(15),
    fontWeight: 'bold',
    marginBottom: 7,
    color: 'rgb(82,82,82)'
  },
  wrapBtnBooking: {
    paddingHorizontal: 60,
  },
  btnBooking: {
    alignItems: 'center',
    paddingVertical: Scale.getSize(10),
    paddingHorizontal: Scale.getSize(20)
  },
  txtProfileContent: {
    fontSize: Scale.getSize(11),
    color: 'rgb(168,168,168)',
  },
  btnContainer: {
    paddingRight: 15,
  },
  helpStyle: {
    alignItems: 'flex-end',
    paddingRight: 7,
    transform: [
      {
        translateY: -Scale.getSize(52)
      }
    ]
  },
  textStyleOBtn: {
    width: (WINDOW_WIDTH - (Scale.getSize(40) * 3) - (30 * 2)) / 3,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: Scale.getSize(12)
  }
});
