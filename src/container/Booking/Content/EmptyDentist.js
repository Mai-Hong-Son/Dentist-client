import React from 'react';

import { Text, View } from 'react-native';

import GenericModal from '../../../components/GenericModal';
import { styles } from '../styles';
import platform from '../../../theme/variables/platform';

const emptyDentist =
  'Với dịch vụ niềng răng / Bọc sứ bạn vui\n lòng gửi tư vấn trước để urSmiles có thể\n tìm cho bạn Nha sỹ phù hợp nhé!';

export default class EmptyDentist extends React.PureComponent {
  render() {
    return (
      <View style={[styles.childBottom, styles.childContentEmpty]}>
        <Text style={styles.title}>
          {'Chưa tìm thấy bác sĩ phù hợp\n Bạn vui lòng gửi tư vấn trước'}
        </Text>
        <Text style={styles.contentText}>{emptyDentist}</Text>
        <GenericModal
          backgroundColor={platform.primaryOrangeGradient}
          borderRadius={40}
          style={{ paddingVertical: 20, paddingHorizontal: 70 }}
        >
          <Text style={{ color: '#fff' }}>{'Tư vấn ngay'}</Text>
        </GenericModal>
      </View>
    );
  }
}
