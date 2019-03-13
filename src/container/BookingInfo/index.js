import React from 'react';
import { View, Text } from 'react-native';

import GenericModal from '../../components/GenericModal';
import GenericButton from '../../components/GenericButton';
import SafeArea from '../../components/SafeArea';
import { ProgressIndicator } from '../Consulting/Common/Elements/ProgressIndicator';
import { findScreenById } from '../../route';
import { styles } from './styles';

export default class BookingInfo extends React.PureComponent {
  render() {
    return (
      <SafeArea>
        <View style={styles.container}>
          <ProgressIndicator percentage={50} />
          <View style={styles.wrapGenericModal}>
            <GenericModal style={styles.styleGenericModal}>
              <View style={styles.cusInfoBox}>
                <Text style={styles.titleInfo}>{'Thông tin khách hàng'}</Text>
                <Text style={styles.txtFistLine}>{'Họ tên:'}</Text>
                <Text style={styles.txtFistLine}>{'Email:'}</Text>
                <Text style={styles.txtFistLine}>{'Số điện thoại:'}</Text>
                <Text style={styles.txtFistLine}>{'Địa chỉ:'}</Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.titleInfo}>{'Thông tin dịch vụ'}</Text>
                <Text style={styles.txtFistLine}>{'Dịch vụ:'}</Text>
                <Text style={styles.txtFistLine}>{'Chi phí:'}</Text>
                <Text style={styles.txtFistLine}>{'Loại lịch hẹn:'}</Text>
                <Text style={styles.txtFistLine}>{'Ngày:'}</Text>
                <Text style={styles.txtFistLine}>{'Thời gian:'}</Text>
              </View>
            </GenericModal>
          </View>
          <View style={styles.paymentButtonContainer}>
            <GenericButton
              onPress={() => this.props.navigator.push({
                screen: findScreenById('payment')
              })}
              caption={'Thanh toán'}
              containerStyle={styles.bookingButtonContent}
            />
          </View>
        </View>
      </SafeArea>
    );
  }
}
