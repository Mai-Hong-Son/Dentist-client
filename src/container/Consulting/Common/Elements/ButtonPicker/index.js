import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import GenericModal from '../../../../../components/GenericModal';
import Scale from '../../../../../utils/Scale';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export const ButtonPicker = ({ title }) => (
  <TouchableHighlight onPress={() => null}>
    <GenericModal style={styles.container}>
      <Text style={styles.txtTitle}>{title}</Text>
      <View>
        <Icon name={'ios-arrow-up'} size={10} />
        <Icon name={'ios-arrow-down'} size={10} />
      </View>
    </ GenericModal>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 20,
  },
  txtTitle: {
    width: (SCREEN_WIDTH - 80 - 40 - 20 - 14) / 2,
    fontSize: Scale.getSize(15),
    fontWeight: '700'
  }
});

