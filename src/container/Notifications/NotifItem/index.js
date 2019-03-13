import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
// import qs from 'qs';
import { Navigation } from 'react-native-navigation';

import Interactable from 'react-native-interactable';
import Icon from 'react-native-vector-icons/Ionicons';
import Scale from '../../../utils/Scale';
import platform from '../../../theme/variables/platform';
import { changeStatusNotif } from '../../../store/actions/notification';

export default class NotifItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      _deltaX: new Animated.Value(0),
      _opacity: new Animated.Value(1),
      _scale: new Animated.Value(1),
      currentMode: 'view'
    };
  }

  onDeleteItem = () => {
    const { id } = this.props;

    const opacityAnim = Animated.timing(this.state._opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease
    });

    const scaleAnim = Animated.timing(this.state._scale, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease
    });

    Animated.parallel([opacityAnim, scaleAnim]).start(() => {
      this.props.onDeleteOneItem(id);
    });
  }

  onNavigateToDetailScreen = () => {
    const { onesignal, dispatch, id } = this.props;

    if (onesignal) {
      dispatch(changeStatusNotif(id));
      Navigation.handleDeepLink({
        link: onesignal.url
      });
    }
  }

  render() {
    const { title, content, status } = this.props;
    const { _opacity, _scale, _deltaX } = this.state;

    return (
      <Animated.View
        style={[{
          opacity: _opacity,
          transform: [{
            scale: _scale
          }]
        },
        styles.container]}
      >
        <Interactable.View
          style={styles.contentTitleStyle}
          horizontalOnly
          snapPoints={[{ x: 0 }, { x: -Scale.getSize(20) }]}
          boundaries={{ right: 0 }}
          animatedValueX={_deltaX}
          onStop={e => {
            const { x } = e.nativeEvent;
            if (x > -10) {
              this.setState({
                currentMode: 'view'
              });
            } else {
              this.setState({
                currentMode: 'delete'
              });
            }
          }}
        >
          <View>
            <Text style={[styles.txtTitle, { color: status === 1 ? '#000' : 'rgb(137,137,137)' }]}>
              {title}
            </Text>
            <Text
              style={[styles.txtContent, { color: status === 1 ? '#000' : 'rgb(137,137,137)' }]}
              numberOfLines={1}
            >
              {content}
            </Text>
          </View>
        </Interactable.View>

        <View style={styles.contentRight}>
          {this.state.currentMode !== 'view' ? (<Animated.View
            style={{
              // position: 'absolute',
              transform: [{
                scale: _deltaX.interpolate({
                  inputRange: [-20, -15, -5, 0],
                  outputRange: [1, 1, 0, 0]
                })
              }]
            }}
          >
            <TouchableOpacity
              style={styles.iconButton}
              onPress={this.onDeleteItem}
            >
              <Icon
                name='ios-close'
                color={platform.primaryOrange}
                size={Scale.getSize(20)}
              />
            </TouchableOpacity>
          </Animated.View>) : (<Animated.View
            style={{
              // position: 'absolute',
              transform: [{
                scale: _deltaX.interpolate({
                  inputRange: [-20, -15, -5, 0],
                  outputRange: [0, 0, 1, 1]
                })
              }]
            }}
          >
            <TouchableOpacity
              style={styles.iconButton}
              onPress={this.onNavigateToDetailScreen}
            >
              <Icon name='ios-arrow-forward' color={'rgb(91,91,91)'} size={Scale.getSize(20)} />
            </TouchableOpacity>
          </Animated.View>)}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(235,235,235)',
    flexDirection: 'row',
    paddingVertical: Scale.getSize(7),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtTitle: {
    fontSize: Scale.getSize(15),
    fontWeight: '700',
    paddingBottom: Scale.getSize(8),
  },
  txtContent: {
    fontSize: Scale.getSize(11),
    fontWeight: '600',
  },
  contentTitleStyle: {
    flex: 1
  },
  contentRight: {
    justifyContent: 'center',
    // paddingRight: Scale.getSize(15),
    // backgroundColor: 'red'
  },
  iconButton: {
    padding: 15,
    alignItems: 'flex-end',
  }
});
