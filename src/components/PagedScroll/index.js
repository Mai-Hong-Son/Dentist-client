import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, ViewPropTypes, Dimensions } from 'react-native';

import styles from './styles';
import Scale from '../../utils/Scale';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export default class PagedScroll extends React.PureComponent {
  static propTypes = {
    ...ScrollView.propTypes,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    paginationStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
    type: PropTypes.string,
    numberInScreen: PropTypes.number
  };

  static defaultProps = {
    ...ScrollView.defaultProps,
    horizontal: true,
    decelerationRate: 0,
    overScrollMode: 'never',
    paginationStyle: styles.paginationPosition,
    scrollEventThrottle: 16,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {},
    numberInScreen: 1
  };

  constructor(props) {
    super(props);

    const { children, numberInScreen } = this.props;
    const count = (children || []).length / numberInScreen;
    this.pagesCount = count === 0 ? count - 1 : Math.ceil(count);
    this.widthScroll = WINDOW_WIDTH;
    // this.scrollX = new Animated.Value(0);

    this.state = {
      dotSelected: 0
    };
  }

  render() {
    const {
      children,
      paginationStyle,
      contentContainerStyle,
      type,
      ...scrollViewProps } = this.props;

    // const position = Animated.divide(this.scrollX, WINDOW_WIDTH - 30);
    const paddingPossition = type === 'datetimepicker' ? (25 + 30) : 15;

    if (children.length === 0) return;

    return (
      <View>
        <ScrollView
          {...scrollViewProps}
          ref={ref => (this.scrollView = ref)}
          contentContainerStyle={contentContainerStyle}
          snapToInterval={WINDOW_WIDTH - paddingPossition}
          onContentSizeChange={(width) => {
            this.scrollViewWidth = width - WINDOW_WIDTH;
          }}
          onMomentumScrollEnd={event => {
            const { x } = event.nativeEvent.contentOffset;
            const percentage = x > 0 ? x / this.scrollViewWidth : 0;
            const moreTwoPage = Math.round(percentage * (this.pagesCount - 1));

            this.setState({
              dotSelected: moreTwoPage
            });
          }}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
        // )}
        >
          {children}
        </ScrollView>
        <View style={[styles.paginationContainer, paginationStyle]}>
          {[...Array(this.pagesCount).keys()].map(index => {
            // const backgroundColor = position.interpolate({
            //   inputRange: [index - 1, index, index + 1],
            //   outputRange: ['rgb(237,237,237)', '#FE712F', 'rgb(237,237,237)'],
            //   extrapolate: 'clamp'
            // });
            const { dotSelected } = this.state;

            return (
              <View
                style={[styles.dotStyle,
                { backgroundColor: dotSelected === index ? '#FE712F' : 'rgb(237,237,237)' }]}
                key={index}
              />
            );
          })}
        </View>
      </View >
    );
  }
}
