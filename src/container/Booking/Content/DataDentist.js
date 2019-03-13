import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import StarRating from 'react-native-star-rating';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import GenericButton from '../../../components/GenericButton';
import Scale from '../../../utils/Scale';
import { findScreenById } from '../../../route';
import { styles } from '../styles';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export default class DataDentist extends React.PureComponent {
  static propTypes = {
    dentists: PropTypes.object,
  };

  state = {
    positionItem: 0,
  }

  onPress = item => {
    this.props.navigator.push({
      screen: findScreenById('choose_dentist'),
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: {
        dentist: item
      },
    });
  }

  render() {
    const { dentists } = this.props;
    const { positionItem } = this.state;
    const resultSnap = positionItem === 0 ? 0 : (7.5 / 2);

    return (
      <ScrollView
        ref={(scrollView) => { this.scrollView = scrollView; }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate={0}
        snapToInterval={WINDOW_WIDTH - (30 - resultSnap)}
        onContentSizeChange={(width) => {
          this.scrollViewWidth = width - WINDOW_WIDTH;
        }}
        onMomentumScrollEnd={event => {
          const { x } = event.nativeEvent.contentOffset;
          const percentage = x > 0 ? x / this.scrollViewWidth : 0;
          const moreTwoPage = Math.round(percentage * (dentists.dentist.length - 1));

          this.setState({
            positionItem: percentage < 0 ? 0 : moreTwoPage
          });
        }}
      >
        {dentists.dentist.map((item, index) => (
          <View
            style={
              [styles.childBottom, styles.childContentNotEmpty]
            }
            key={index}
          >
            <View style={styles.profileDentist}>
              <View style={styles.image}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.srcImage}
                />
              </View>
              <View style={styles.profileContentRight}>
                <Text style={styles.name}>{item.name}</Text>
                <StarRating
                  disabled
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  rating={item.score}
                  fullStarColor={'#FE712F'}
                  starSize={17}
                  containerStyle={{ width: 90 }}
                />
                <Text style={styles.degree}>{item.degree}</Text>
              </View>
            </View>
            <View style={styles.wrapMiddleContent}>
              <View style={styles.childMiddleContent}>
                <AnimatedCircularProgress
                  size={Scale.getSize(60)}
                  width={3}
                  fill={75}
                  tintColor="#ff7936"
                  backgroundColor="rgb(237,237,237)"
                >
                  {
                    () => (
                      <Text style={styles.txtExp}>{item.experience}</Text>
                    )
                  }
                </AnimatedCircularProgress>
                <Text style={styles.experienceTitle}>{'năm kinh nghiệm'}</Text>
              </View>
              <View style={styles.childMiddleContent}>
                <AnimatedCircularProgress
                  size={Scale.getSize(60)}
                  width={3}
                  fill={75}
                  tintColor="#ff7936"
                  backgroundColor="rgb(237,237,237)"
                >
                  {
                    () => (
                      <Text style={styles.txtExp}>{item.success}</Text>
                    )
                  }
                </AnimatedCircularProgress>
                <Text style={styles.experienceTitle}>{'ca thành công'}</Text>
              </View>
              <View style={styles.childMiddleContent}>
                <AnimatedCircularProgress
                  size={Scale.getSize(60)}
                  width={3}
                  fill={75}
                  tintColor="#ff7936"
                  backgroundColor="rgb(237,237,237)"
                >
                  {
                    () => (
                      <Text style={styles.txtExp}>{item.satisfied}</Text>
                    )
                  }
                </AnimatedCircularProgress>
                <Text style={styles.experienceTitle}>{'Hài lòng'}</Text>
              </View>
            </View>
            <View style={styles.wrapDataContentBottom}>
              <Text style={styles.titleProfile}>{'Hồ sơ'}</Text>
              <Text style={styles.txtProfileContent}>{item.profile}</Text>
            </View>
            <View style={styles.wrapBtnBooking}>
              <GenericButton
                onPress={() => this.onPress(item)}
                containerStyle={styles.btnBooking}
                caption={'Đặt lịch'}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}
