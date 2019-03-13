import React from 'react';
import PropTypes from 'prop-types';
import {
 StyleSheet,
 TextInput,
 View,
 Text,
 Dimensions,
 TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Scale from '../../utils/Scale';
import GenericModal from '../../components/GenericModal';
import platform from '../../theme/variables/platform';
import { createConfirmationPhone } from '../../store/actions/auth';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

@connect(
 null,
 { createConfirmationPhone }
)
export default class PutPhoneNumber extends React.Component {
 static propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
 };

 static navigatorStyle = {
  tabBarHidden: true,
  navBarHidden: true
 };

 state = {
  txtPhone: '',
  txtValidate: null
 }

 onValidate = () => {
  this.props.createConfirmationPhone(this.state.txtPhone, err => {
   if (err) {
    this.setState({
     txtValidate: err.errors.phone_number
    });
    return;
   }

   this.props.navigator.dismissLightBox();
   this.props.onPress();
  });
 }

 render = () => (
  <View style={styles.container}>
   <GenericModal style={{ padding: 15, alignItems: 'flex-end' }}>
    <Text style={styles.text}>
     {'Để phục vụ bạn tốt nhất, vui lòng nhập số điện thoại của bạn. urSmiles xin cảm ơn!'}
    </Text>
    <TextInput
     onChangeText={text => this.setState({ txtPhone: text })}
     style={styles.inputStyle}
     underlineColorAndroid="transparent"
     autoCorrect={false}
     autoCapitalize="none"
     editable
     clearButtonMode="while-editing"
     keyboardType="numeric"
     returnKeyType="next"
    />
    <Text
     style={{
      color: 'red',
      fontSize: Scale.getSize(13),
      width: platform.deviceWidth * 2 / 3,
      paddingTop: 4
     }}
    >
     {this.state.txtValidate}
    </Text>
    <TouchableOpacity
     onPress={this.onValidate}
    >
     <Text style={styles.txtOK}>
      {'OK'}
     </Text>
    </TouchableOpacity>
   </GenericModal>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)'
 },

 text: {
  paddingBottom: 15,
  fontSize: Scale.getSize(15),
  color: platform.primaryOrange,
  fontWeight: '700',
  width: platform.deviceWidth * 2 / 3
 },

 txtOK: {
  fontSize: Scale.getSize(18),
  color: platform.primaryOrange,
  fontWeight: '700'
 },

 inputStyle: {
  color: platform.primaryOrange,
  fontSize: Scale.getSize(18),
  fontWeight: '700',
  height: 40,
  width: platform.deviceWidth * 2 / 3,
  borderColor: platform.primaryOrange,
  borderRadius: 4,
  borderWidth: 1,
  paddingHorizontal: 7
 }
});
