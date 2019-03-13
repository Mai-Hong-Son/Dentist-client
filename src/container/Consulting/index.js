import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import GenericModal from '../../components/GenericModal';
import AskButton from '../../components/AskButton';
import Scale from '../../utils/Scale';
import SafeArea from '../../components/SafeArea';
// import ConsultingHistoryItem from '../../components/ConsultingHistoryItem';

export default class Consulting extends React.PureComponent {
  _onPress = () => {
    const { navigator, findScreenById } = this.props;
    navigator.push({
      screen: findScreenById('consulting_history'),
      title: 'Lịch sử tư vấn'
    });
  };

  render() {
    const { navigator, findScreenById } = this.props;
    return (
      <SafeArea>
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="rgba(0, 0, 0, 0)"
            onPress={this._onPress}
            style={{ flex: 1 }}
          >
            <GenericModal style={styles.card}>
              <Text style={styles.modalTitle}>
                {'Chào mừng quý khách đến với\nHệ thống nha khoa tiết kiệm chi phí!'}
              </Text>
              <Text style={styles.modalSubtitle}>
                {
                  'Nhằm mang tới cho quý khách hàng: giá, khuyến mại & lịch thanh toán tối ưu nhất, mời quý khách hàng gửi tình trạng răng chi của bạn.'
                }
              </Text>
            </GenericModal>
          </TouchableHighlight>
          <AskButton
            caption="Đặt câu hỏi tư vấn"
            onPress={() => {
              navigator.push({
                screen: findScreenById('ask'),
                title: 'Bạn cần tư vấn?'
              });
            }}
          />
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Scale.getSize(18),
    paddingTop: Scale.getSize(10),
    paddingBottom: Scale.getSize(25)
  },
  modalTitle: {
    fontSize: Scale.getSize(14),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Scale.getSize(20)
  },
  modalSubtitle: {
    fontSize: Scale.getSize(12),
    color: '#888',
    textAlign: 'center'
  },
  card: {
    flex: 1,
    paddingHorizontal: Scale.getSize(15),
    marginBottom: Scale.getSize(20)
  }
});
