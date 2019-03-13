import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import Image from 'react-native-fast-image';
// import { RNCamera } from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import SafeArea from '../../../../components/SafeArea';
import Scale from '../../../../utils/Scale';
import platform from '../../../../theme/variables/platform';

const BUTTON_CENTER_CIRCLE_SIZE = Scale.getSize(60);
const BUTTON_OUTER_CIRCLE_PADDING = Scale.getSize(7);
const IMAGE_RATIO = 640 / 498;

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = WINDOW_WIDTH;
const IMAGE_HEIGHT = IMAGE_WIDTH / IMAGE_RATIO;

export default class Tutorial extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        this.props.navigator.setDrawerEnabled({
          side: 'left',
          enabled: false
        });
        this.props.navigator.setDrawerEnabled({
          side: 'right',
          enabled: false
        });
        break;
      case 'willDisappear':
        this.props.navigator.setDrawerEnabled({
          side: 'left',
          enabled: true
        });
        this.props.navigator.setDrawerEnabled({
          side: 'right',
          enabled: true
        });
        break;
      default:
        break;
    }
  }

  _renderItem = ({ item: { caption, image }, index }) => (
    <View style={{ width: WINDOW_WIDTH, alignItems: 'center' }}>
      {/* <View style={{ flex: 1 }} /> */}
      <Image style={styles.image} source={{ uri: image }} resizeMode={Image.resizeMode.contain} />
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>{`(${index + 1}/8) ${caption}`}</Text>
      </View>
    </View>
  );

  render() {
    const { tutorials } = this.props;
    return (
      <SafeArea>
        <LinearGradient colors={platform.primaryOrangeGradient} style={styles.background} />
        <View style={styles.container}>
          <FlatList
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            horizontal
            data={tutorials}
            renderItem={this._renderItem}
          />
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  container: {
    flex: 1
    // backgroundColor: '#F6F7F8'
  },

  topPart: {
    borderWidth: 1,
    justifyContent: 'flex-end'
  },

  captionContainer: {
    alignItems: 'center',
    flex: 1,
    // height: Scale.getSize(100),
    // paddingVertical: Scale.getSize(20),
    shadowOffset: { width: 0, height: Scale.getSize(3) },
    shadowColor: '#777',
    shadowOpacity: 0.3,
    shadowRadius: Scale.getSize(3),
    elevation: Scale.getSize(1),
    justifyContent: 'center',
    paddingHorizontal: Scale.getSize(15)
  },

  separator: {
    height: 1,
    backgroundColor: 'white'
  },

  captionText: {
    color: 'white',
    fontSize: Scale.getSize(20),
    fontWeight: '500',
    textAlign: 'center'
  },

  bottomPart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Scale.getSize(40)
  },

  buttonBoundary: {
    paddingHorizontal: BUTTON_OUTER_CIRCLE_PADDING,
    paddingVertical: BUTTON_OUTER_CIRCLE_PADDING,
    borderRadius: (BUTTON_CENTER_CIRCLE_SIZE + BUTTON_OUTER_CIRCLE_PADDING * 2) / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: platform.primaryOrange,
    backgroundColor: 'rgb(248, 248, 248)'
  },

  buttonCenterCircle: {
    width: BUTTON_CENTER_CIRCLE_SIZE,
    height: BUTTON_CENTER_CIRCLE_SIZE,
    borderRadius: BUTTON_CENTER_CIRCLE_SIZE / 2,
    backgroundColor: platform.primaryOrange
  },

  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT
  }
});
