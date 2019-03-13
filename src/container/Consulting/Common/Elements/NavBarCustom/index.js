import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Scale from '../../../../../utils/Scale';

export default class NavBarCustom extends React.PureComponent {
  render() {
    const { title, date } = this.props;

    return (
      <View style={styles.container}>
        {/* <Text /> */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingLeft: Scale.getSize(100),
    height: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: Scale.getSize(18),
    fontWeight: '800',
    color: 'rgb(82,82,82)'
  },
  // code: {
  //   fontSize: Scale.getSize(12),
  //   fontWeight: '100',
  //   color: 'rgb(82,82,82)',
  //   paddingTop: Scale.getSize(18) - Scale.getSize(12),
  //   paddingLeft: Scale.getSize(5),
  //   paddingRight: Scale.getSize(50)
  // },
  date: {
    fontSize: Scale.getSize(12),
    fontWeight: '800',
    color: 'rgb(82,82,82)',
    paddingTop: Scale.getSize(18) - Scale.getSize(12),
    paddingLeft: Scale.getSize(80)
  },
});

