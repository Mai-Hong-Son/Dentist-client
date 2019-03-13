import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Image from 'react-native-fast-image';
import SafeArea from '../../../../../components/SafeArea';
import Scale from '../../../../../utils/Scale';
import platform from '../../../../../theme/variables/platform';

const PAGE_WIDTH = platform.deviceWidth;

export default class PhotoViewer extends React.PureComponent {
  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true
  };

  static propTypes = {
    photos: PropTypes.array.isRequired,
    onDone: PropTypes.func,
    startAt: PropTypes.number
  };

  static defaultProps = {
    onDone: () => {},
    startAt: 0
  };

  constructor(props) {
    super(props);
    console.log('PhotoViewer', props.startAt);
    this.flatList = React.createRef();
    this.state = {
      page: props.startAt + 1
    };
    console.log('PhotoViewer init state', this.state);
  }

  componentDidMount = () => {
    console.warn('startAt', this.state.page);
    this.flatList.current.scrollToOffset({
      offset: PAGE_WIDTH * this.state.page,
      animated: false
    });
  };

  _renderItem = ({ item, index }) => (
    <Image resizeMode="contain" key={index} style={styles.image} source={{ uri: item }} />
  );

  _onPress = () => {
    const { onDone } = this.props;
    onDone();
  };

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log('_onViewableItemsChanged viewableItems', viewableItems);
    console.log('_onViewableItemsChanged changed', changed);
    const page = viewableItems[0].index + 1;
    // this.setState({
    //   page
    // });
    this.pager.setState({
      page
    });
  };

  render() {
    const { photos } = this.props;
    return (
      <SafeArea>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this._onPress} activeOpacity={0.6}>
              <Text style={styles.buttonText}>Xong</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            ref={this.flatList}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
            horizontal
            data={photos}
            renderItem={this._renderItem}
            // onMomentumScrollEnd={e => {
            //   const contentOffset = e.nativeEvent.contentOffset;
            //   const { width } = e.nativeEvent.layoutMeasurement;
            //   const page = Math.floor(contentOffset.x / width) + 1;
            //   this.setState({
            //     page
            //   });
            // }}
            onViewableItemsChanged={this._onViewableItemsChanged.bind(this)}
            onScrollToIndexFailed={() => {}}
          />
        </View>
        <View style={styles.pageNumberContainer}>
          {/* <Text style={styles.pageNumberText}>{`${this.state.page}/${
            this.props.photos.length
          }`}</Text> */}
          <Pager
            total={this.props.photos.length}
            page={this.state.page}
            ref={ref => (this.pager = ref)}
          />
        </View>
      </SafeArea>
    );
  }
}

class Pager extends React.Component {
  state = {
    page: this.props.page
  };

  render() {
    return <Text style={styles.pageNumberText}>{`${this.state.page}/${this.props.total}`}</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },

  buttonContainer: {
    position: 'absolute',
    top: Scale.getSize(40),
    right: Scale.getSize(10),
    zIndex: 1
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: Scale.getSize(22),
    paddingHorizontal: Scale.getSize(20),
    paddingVertical: Scale.getSize(10)
  },

  image: {
    width: PAGE_WIDTH
  },

  flatList: {
    flex: 1
  },

  pageNumberContainer: {
    position: 'absolute',
    bottom: Scale.getSize(0),
    right: Scale.getSize(0),
    width: PAGE_WIDTH,
    height: Scale.getSize(25),
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'white'
  },

  pageNumberText: {
    color: 'white'
  }
});
