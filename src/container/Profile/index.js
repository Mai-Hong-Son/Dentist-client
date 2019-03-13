import React from 'react';
import { View, Text } from 'react-native';

export default class extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Logout</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    padding: 20
  }
};
