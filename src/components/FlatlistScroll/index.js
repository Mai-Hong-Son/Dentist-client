import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Animated, Dimensions, ViewPropTypes } from 'react-native';

import styles from './styles';
// import Scale from '../../utils/Scale';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export default class FlatlistScroll extends React.PureComponent {
  static propTypes = {
    ...FlatList.propTypes,
    data: PropTypes.array,
    numColumns: PropTypes.number,
    numItemOnScreen: PropTypes.number,
    extraData: PropTypes.any,
    _itemRender: PropTypes.func,
    contentContainerStyle: ViewPropTypes.style,
    paginationStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    ...FlatList.defaultProps,
    data: [],
    paginationStyle: styles.paginationPosition,
    contentContainerStyle: {
      width: WINDOW_WIDTH
    }
  };

  constructor(props) {
    super(props);

    const { data, numItemOnScreen } = this.props;

    this.numberOfArr = Math.ceil(data.length / numItemOnScreen);
    this.parentArrIssues = [];

    for (let i = 0; i < this.numberOfArr; i++) {
      if (i !== this.numberOfArr) {
        this.parentArrIssues.push(data.slice(numItemOnScreen * i, numItemOnScreen * (i + 1)));
      } else {
        this.parentArrIssues.push(data.slice(numItemOnScreen * i, data.length));
      }
    }

    this.scrollX = new Animated.Value(0);
  }

  _renderChildArray = ({ item }) => (
    <FlatList
      scrollEnabled={false}
      data={item}
      contentContainerStyle={this.props.contentContainerStyle}
      renderItem={this.props._itemRender}
      extraData={this.props.extraData}
      numColumns={this.props.numColumns}
      keyExtractor={(it, index) => index.toString()}
    />
  )

  render() {
    const { paginationStyle } = this.props;
    const position = Animated.divide(this.scrollX, WINDOW_WIDTH);

    return (
      <View>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          extraData={this.props.extraData}
          showsHorizontalScrollIndicator={false}
          data={this.parentArrIssues}
          renderItem={this._renderChildArray}
          keyExtractor={(item, index) => index.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
          )}
          scrollEventThrottle={16}
        />
        <View style={[styles.paginationContainer, paginationStyle]}>
          {[...Array(this.numberOfArr).keys()].map(index => {
            if (this.numberOfArr <= 1) return null;
            const backgroundColor = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: ['rgb(237,237,237)', '#FE712F', 'rgb(237,237,237)'],
              extrapolate: 'clamp'
            });

            return (
              <Animated.View
                style={[styles.dotStyle,
                { backgroundColor }]}
                key={index}
              />
            );
          })}
        </View>
      </View >
    );
  }
}
