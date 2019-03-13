import React from 'react';
import { View, Text, Button } from 'react-native';
// import { findScreenById } from '../../../route';

export default class ProductList extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  render() {
    return (
        <View>
          <Button
            onPress={() =>
              this.props.navigator.popToRoot({
                animated: true,
                animationType: 'fade'
              })
            }
            title="POP to Home type 1"
          />
          <Button
            onPress={() =>
              this.props.navigator.popToRoot({
                animated: false,
                animationType: 'fade'
              })
            }
            title="POP to Home type 2"
          />
        </View>
    );
  }
}
