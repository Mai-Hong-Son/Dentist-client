import { StyleSheet } from 'react-native';
import Scale from '../../utils/Scale';

export default StyleSheet.create({
  paginationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Scale.getSize(15)
  },
  dotStyle: {
    borderRadius: 4,
    height: 8,
    marginHorizontal: 3,
    width: 8,
    backgroundColor: 'rgb(237,237,237)'
  }
});
