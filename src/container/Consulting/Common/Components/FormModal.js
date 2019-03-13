import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import AlertDialog from './AlertDialog';
import { ButtonPicker } from '../Elements/ButtonPicker';
import Scale from '../../../../utils/Scale';

export default class FormModal extends React.PureComponent {
  render() {
    const { title, titleButton, navigator } = this.props;

    return (
      <AlertDialog title={title} titleButton={titleButton} navigator={navigator}>
        <Text style={styles.messageContent}>
          {'Cập nhật hồ sơ cá nhân để nhận được dịch vụ tốt nhất'}
        </Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Số điện thoại của bạn'}
          placeholderTextColor={'rgb(137,137,137)'}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Địa chỉ của bạn'}
          placeholderTextColor={'rgb(137,137,137)'}
        />
        <View style={styles.wrapBtnPicker}>
          <ButtonPicker title={'Tỉnh'} />
          <ButtonPicker title={'Quận'} />
        </View>
        <View style={styles.wrapBtnPicker}>
          <ButtonPicker title={'Huyện'} />
          <View />
        </View>
      </AlertDialog>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    fontWeight: '700',
    fontSize: Scale.getSize(15),
    color: 'rgb(137,137,137)',
    paddingVertical: 7,
    borderBottomColor: 'rgb(237,237,237)',
    borderBottomWidth: 1
  },
  messageContent: {
    fontSize: Scale.getSize(15),
    color: 'rgb(82,82,82)',
    paddingVertical: Scale.getSize(10),
    fontWeight: '100'
  },
  wrapBtnPicker: {
    flexDirection: 'row',
    paddingTop: Scale.getSize(25),
  }
});
