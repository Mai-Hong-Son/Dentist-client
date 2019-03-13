import React from 'react';
import LottieView from 'lottie-react-native';
import { Animated, Easing, View } from 'react-native';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.setAnimation = this.setAnimation.bind(this);
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start(() => this.animation && this.animation.play());
  }

  setAnimation(animation) {
    this.animation = animation;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 68, height: 68 }}>
          <LottieView
            ref={this.setAnimation}
            progress={this.state.progress}
            source={require('../../assets/lotties/material_wave_loading.json')}
            loop
            autoPlay
            enableMergePathsAndroidForKitKatAndAbove
          />
        </View>
      </View>
    );
  }
}
