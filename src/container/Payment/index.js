import React from 'react';
import { View, Text } from 'react-native';

import GenericModal from '../../components/GenericModal';
import GenericButton from '../../components/GenericButton';
import OptionButton from '../../components/OptionButton';
import SafeArea from '../../components/SafeArea';
import { ProgressIndicator } from '../Consulting/Common/Elements/ProgressIndicator';
// import { findScreenById } from '../../route';
import { styles } from './styles';

export default class Payment extends React.PureComponent {
  state = {
    selectingType: 'sv'
  }

  render() {
    const { selectingType } = this.state;

    return (
      <SafeArea>
        <View style={styles.container}>
          <ProgressIndicator percentage={75} />
          <View style={styles.wrapGenericModal}>
            <GenericModal style={styles.styleGenericModal}>
              <View style={styles.titleServiceBox}>
                <Text style={styles.titleService}>{'Niềng răng thẩm mỹ'}</Text>
                <Text style={styles.txtCode}>{'#NRKL234'}</Text>
              </View>
              <View style={styles.wrapOptionBox}>
                <View style={styles.optionContent}>
                  <OptionButton
                    onPress={() => this.setState({ selectingType: 'sv' })}
                    highlight={selectingType === 'sv'}
                    containerStyle={styles.optionButton}
                  />
                  <Text
                    style={[styles.txtOptionButton,
                    { color: selectingType === 'sv' ? '#FE712F' : 'rgb(137,137,137)' }]}
                  >
                    {'Niềng răng\nsinh viên'}
                  </Text>
                </View>
                <View style={styles.optionContent}>
                  <OptionButton
                    onPress={() => this.setState({ selectingType: 'vip' })}
                    highlight={selectingType === 'vip'}
                    containerStyle={styles.optionButton}
                  />
                  <Text
                    style={[styles.txtOptionButton,
                    { color: selectingType === 'vip' ? '#FE712F' : 'rgb(137,137,137)' }]}
                  >
                    {'Niềng răng\nVIP'}
                  </Text>
                </View>
              </View>
              <View style={styles.statusBox}>
                <View style={styles.statusPayment}>
                  <Text style={styles.txtStatus}>{'Chưa đặt cọc'}</Text>
                  <Text style={styles.txtPrice}>{'17 triệu VND'}</Text>
                </View>
                <View style={styles.statusPayment}>
                  <Text style={styles.txtPayment}>{'Đặt cọc'}</Text>
                  <Text style={styles.txtPayment}>{'Tổng chi phí'}</Text>
                </View>
              </View>
            </GenericModal>
          </View>
          <View style={styles.paymentButtonContainer}>
            <GenericButton
              onPress={() => null}
              caption={'Đặt cọc'}
              containerStyle={styles.bookingButtonContent}
            />
          </View>
        </View>
      </SafeArea>
    );
  }
}
