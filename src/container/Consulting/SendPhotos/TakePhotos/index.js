import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Animated
} from 'react-native';
import Image from 'react-native-fast-image';
import { RNCamera } from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
// import { getImageSource } from 'react-native-vector-icons/Ionicons';
import SafeArea from '../../../../components/SafeArea';
import GenericModal from '../../../../components/GenericModal';
import Scale from '../../../../utils/Scale';
import platform from '../../../../theme/variables/platform';
import { CircleButton } from './CircleButton';

import images from '../../../../assets/images';

const BUTTON_CENTER_CIRCLE_SIZE = Scale.getSize(55);
const BUTTON_OUTER_CIRCLE_PADDING = Scale.getSize(8);

const IMAGE_RATIO = 640 / 498;

const IMAGE_RADIUS = Scale.getSize(50);
const IMAGE_DIAMETER = 2 * IMAGE_RADIUS;

const PAGE_WIDTH = platform.deviceWidth;

const CAMERA_BUTTON_SIZE = Scale.getSize(30);

const FRAME_SCALE = 0.7;

const REVERSE_ICON_TOP_PADDING = Scale.getSize(18);
const REVERSE_ICON_RIGHT_PADDING = Scale.getSize(20);

const TAKEN_PHOTOS_SCROLLVIEW_VISILE_ITEMS = 8;
const TAKEN_PHOTOS_SCROLLVIEW_ITEMS_GAP = Scale.getSize(10);
const TAKEN_PHOTOS_SCROLLVIEW_ITEM_SIZE =
  (platform.deviceWidth -
    TAKEN_PHOTOS_SCROLLVIEW_ITEMS_GAP * (TAKEN_PHOTOS_SCROLLVIEW_VISILE_ITEMS + 1)) /
  TAKEN_PHOTOS_SCROLLVIEW_VISILE_ITEMS;

const RIGHT_BUTTON_STATES = {
  NEXT_DISABLED: 0,
  NEXT_ENABLED: 1,
  FINISH_DISABLED: 2,
  FINISH_ENABLED: 3
};

export default class TakePhotos extends React.Component {
  static propTypes = {
    onDone: PropTypes.func,
    maxPhotos: PropTypes.number,
    startAt: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
    frameImages: PropTypes.arrayOf(PropTypes.string),
    guideContent: PropTypes.array
  };

  static defaultProps = {
    onDone: () => {},
    maxPhotos: 1,
    startAt: 0,
    photos: [],
    guideContent: []
  };

  constructor(props) {
    super(props);
    this.camera = React.createRef();
    let photosTaken = [];
    if (props.photos.length === 0) {
      for (let i = 0; i < props.maxPhotos; i++) {
        photosTaken.push('empty');
      }
    } else {
      photosTaken = props.photos;
    }
    this.flatList = React.createRef();
    this.state = {
      photosTaken,
      frontCamera: false,
      currentPage: props.startAt,
      rightButtonState: RIGHT_BUTTON_STATES.NEXT_DISABLED
    };

    this.scrollX = new Animated.Value(0);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount = async () => {
    this.flatList.current.scrollToOffset({
      offset: PAGE_WIDTH * this.state.currentPage,
      animated: false
    });

    this._calculateRightButton();
  };

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

  _onNavigatorEvent = ({ type, id }) => {
    if (type === 'ScreenChangedEvent') {
      switch (id) {
        case 'willDisappear':
          this.props.onDone(this.state.photosTaken);
          break;

        default:
          break;
      }
    }
  };

  _onPhotoTaken = async () => {
    // const options = { quality: 0.5, base64: true };
    const options = { quality: 0.5 };
    const data = await this.camera.current.takePictureAsync(options);
    if (data.uri) {
      const photosTaken = [...this.state.photosTaken];
      photosTaken[this.state.currentPage] = data.uri;
      this.setState({ photosTaken }, () => {
        this._calculateRightButton();
      });
    }
  };

  _onPhotoViewPress = () => {
    const { navigator } = this.props;
    navigator.showModal({
      screen: 'photo_viewer',
      navBarHidden: true,
      passProps: {
        photos: this.state.photosTaken.filter(e => e !== 'empty'),
        onDone: () => {
          navigator.dismissModal();
        }
      }
    });
  };

  _renderItem = ({ item: { frame, content }, index }) => (
    <View style={styles.pageContainer}>
      <View style={styles.frameContainer}>
        {/* <View style={styles.cameraOverlay}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ frontCamera: !this.state.frontCamera });
            }}
          >
            <Image
              style={styles.cameraReverseImage}
              source={images.camera_reverse}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View> */}
        <Image style={styles.frame} source={{ uri: frame }} resizeMode="contain" />
      </View>
      <LinearGradient colors={platform.primaryOrangeGradient} style={styles.tutorialContainer}>
        <Text style={styles.tutorialText}>{`(${index + 1}/${
          this.props.guideContent.length
        }) ${content}`}</Text>
      </LinearGradient>
    </View>
  );

  _onNextPress = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 }, () => {
      this.flatList.current.scrollToOffset({
        offset: PAGE_WIDTH * this.state.currentPage,
        animated: true
      });

      this._calculateRightButton();
    });
  };

  _onFinishedPress = () => {
    const { onDone, navigator } = this.props;
    onDone(this.state.photosTaken);
    navigator.pop();
  };

  _onScrollEnd = e => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const currentPage = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ currentPage }, () => {
      this._calculateRightButton();
    });
  };

  _calculateRightButton = () => {
    const { currentPage } = this.state;
    const { maxPhotos } = this.props;

    if (currentPage < maxPhotos - 1) {
      if (this.state.photosTaken[currentPage] === 'empty') {
        this.setState({ rightButtonState: RIGHT_BUTTON_STATES.NEXT_DISABLED });

        return;
      }

      this.setState({ rightButtonState: RIGHT_BUTTON_STATES.NEXT_ENABLED });
      return;
    }

    if (this.state.photosTaken[currentPage] === 'empty') {
      this.setState({ rightButtonState: RIGHT_BUTTON_STATES.FINISH_DISABLED });
      return;
    }

    this.setState({ rightButtonState: RIGHT_BUTTON_STATES.FINISH_ENABLED });
  };

  _renderBottomLeftPart = () => {
    if (this.state.photosTaken.find(e => e !== 'empty')) {
      return <CircleButton source={images.library} onPress={this._onPhotoViewPress} />;
    }

    return <CircleButton source={images.library} color={CircleButton.GradientPresets.Gray} />;
  };
  /* <View style={styles.imageContainer}>
              {this.state.photosTaken[this.state.currentPage] !== 'empty' ? (
                <TouchableOpacity onPress={this._onPhotoViewPress}>
                  <Image
                    source={{ uri: this.state.photosTaken[this.state.currentPage] }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.emptyImage} />
              )}
            </View> */

  _renderBottomCenterPart = () => (
    <TouchableOpacity onPress={this._onPhotoTaken} activeOpacity={0.6}>
      <View style={styles.buttonBoundary}>
        <LinearGradient colors={platform.primaryOrangeGradient} style={styles.buttonCenterCircle} />
      </View>
    </TouchableOpacity>
  );

  _renderBottomRightPart = () => {
    switch (this.state.rightButtonState) {
      case RIGHT_BUTTON_STATES.NEXT_DISABLED:
        return <CircleButton source={images.arrow} color={CircleButton.GradientPresets.Gray} />;

      case RIGHT_BUTTON_STATES.NEXT_ENABLED:
        return (
          <CircleButton
            source={images.arrow}
            color={CircleButton.GradientPresets.Orange}
            onPress={this._onNextPress}
          />
        );

      case RIGHT_BUTTON_STATES.FINISH_DISABLED:
        return (
          <CircleButton source={images.check_white} color={CircleButton.GradientPresets.Gray} />
        );

      case RIGHT_BUTTON_STATES.FINISH_ENABLED:
        return (
          <CircleButton
            source={images.check_white}
            color={CircleButton.GradientPresets.Orange}
            onPress={this._onFinishedPress}
          />
        );

      default:
        return null;
    }
  };

  _renderTakenPhotosScrollView = () => (
    <ScrollView
      contentContainerStyle={styles.imageScroll}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {this.state.photosTaken.map((photo, index) => {
        let source = images.rectangle;
        if (photo !== 'empty') {
          source = { uri: photo };
        }
        return (
          <GenericModal key={index} style={styles.takenPhotosScrollViewItemOuterContainer}>
            <GenericModal style={styles.takenPhotosScrollViewItemContainer}>
              {photo !== 'empty' ? (
                <Image
                  style={styles.takenPhotosScrollViewItem}
                  resizeMode="contain"
                  source={source}
                />
              ) : (
                <View style={styles.takenPhotosScrollViewItem} />
              )}
            </GenericModal>
          </GenericModal>
        );
      })}
    </ScrollView>
  );

  render() {
    const position = Animated.divide(this.scrollX, platform.deviceWidth);
    const { guideContent } = this.props;
    return (
      <SafeArea>
        <View style={styles.topPart}>
          <View style={styles.cameraOverlay}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ frontCamera: !this.state.frontCamera });
              }}
            >
              <Image
                style={styles.cameraReverseImage}
                source={images.camera_reverse}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <RNCamera
            ref={this.camera}
            style={styles.cameraContainer}
            type={
              this.state.frontCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
            }
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Cấp quyền camera'}
            permissionDialogMessage={'Vui lòng cấp quyền truy cập camera cho Ursmiles.'}
          />
          <View style={styles.guideContainer}>
            <FlatList
              ref={this.flatList}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={this._renderItem}
              data={guideContent}
              keyExtractor={(item, index) => index.toString()}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
              onMomentumScrollEnd={this._onScrollEnd}
            />
            <View style={styles.paginationContainer}>
              {[...Array(guideContent.length).keys()].map(index => {
                const backgroundColor = position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: ['rgb(237,237,237)', '#FE712F', 'rgb(237,237,237)'],
                  extrapolate: 'clamp'
                });

                return <Animated.View style={[styles.dotStyle, { backgroundColor }]} key={index} />;
              })}
            </View>
          </View>
        </View>
        <View style={styles.bottomPart}>
          <View style={styles.buttonRow}>
            <View style={styles.bottomLeftPart}>{this._renderBottomLeftPart()}</View>
            <View style={styles.bottomCenterPart}>{this._renderBottomCenterPart()}</View>
            <View style={styles.bottomRightPart}>{this._renderBottomRightPart()}</View>
          </View>
          {this._renderTakenPhotosScrollView()}
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  topPart: {
    flex: 1
  },

  tutorialContainer: {
    // paddingVertical: Scale.getSize(20),
    height: Scale.getSize(60),
    alignItems: 'center',
    justifyContent: 'center'
  },

  tutorialText: {
    fontSize: Scale.getSize(15),
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  },

  bottomPart: {
    // paddingVertical: Scale.getSize(30)
  },

  buttonRow: {
    flexDirection: 'row',
    paddingVertical: Scale.getSize(20)
  },

  bottomCenterPart: {
    justifyContent: 'center'
  },

  separator: {
    height: 1,
    backgroundColor: 'white'
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
    backgroundColor: platform.primaryOrange,
    alignItems: 'center',
    justifyContent: 'center'
  },

  photoCounter: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: Scale.getSize(24)
  },

  bottomLeftPart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageContainer: {
    width: IMAGE_DIAMETER,
    height: IMAGE_DIAMETER,
    borderRadius: Scale.getSize(5),
    borderColor: platform.primaryOrange
  },

  image: {
    width: IMAGE_DIAMETER,
    height: IMAGE_DIAMETER
  },

  emptyImage: {
    backgroundColor: '#CCC',
    flex: 1
  },

  bottomRightPart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  doneButton: {
    paddingVertical: Scale.getSize(10),
    paddingHorizontal: Scale.getSize(20),
    alignItems: 'center',
    justifyContent: 'center'
  },

  doneButtonText: {
    fontWeight: '600',
    fontSize: Scale.getSize(26),
    color: platform.primaryOrange
  },

  cameraOverlay: {
    top: 0,
    right: 0,
    width: REVERSE_ICON_RIGHT_PADDING + CAMERA_BUTTON_SIZE,
    height: REVERSE_ICON_TOP_PADDING + CAMERA_BUTTON_SIZE,
    position: 'absolute',
    zIndex: 1
  },

  cameraReverseImage: {
    position: 'absolute',
    top: Scale.getSize(18),
    right: Scale.getSize(20),
    width: CAMERA_BUTTON_SIZE,
    height: CAMERA_BUTTON_SIZE
  },

  guideContainer: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    alignItems: 'center'
  },

  imageScroll: {
    paddingVertical: Scale.getSize(5),
    borderColor: 'black'
  },

  pageContainer: {
    width: PAGE_WIDTH
  },

  frameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  frame: {
    width: PAGE_WIDTH * FRAME_SCALE,
    height: (PAGE_WIDTH / IMAGE_RATIO) * FRAME_SCALE
    // opacity: 0.9
  },

  cameraContainer: {
    flex: 1
  },

  takenPhotosScrollViewItem: {
    backgroundColor: 'white',
    width: TAKEN_PHOTOS_SCROLLVIEW_ITEM_SIZE,
    height: TAKEN_PHOTOS_SCROLLVIEW_ITEM_SIZE
  },

  takenPhotosScrollViewItemOuterContainer: {
    marginLeft: TAKEN_PHOTOS_SCROLLVIEW_ITEMS_GAP
  },

  takenPhotosScrollViewItemContainer: {
    overflow: 'hidden',
    width: TAKEN_PHOTOS_SCROLLVIEW_ITEM_SIZE,
    height: TAKEN_PHOTOS_SCROLLVIEW_ITEM_SIZE,
    borderRadius: TAKEN_PHOTOS_SCROLLVIEW_ITEM_SIZE / 10
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Scale.getSize(15),
    position: 'absolute',
    bottom: Scale.getSize(60)
    // transform: [
    //   {
    //     translateX: (platform.deviceWidth / 2) - 48
    //   },
    // {
    //   translateY: PAGE_WIDTH / IMAGE_RATIO + CAMERA_BUTTON_SIZE
    // }
    // ]
  },

  dotStyle: {
    borderRadius: 4,
    height: 8,
    marginHorizontal: 3,
    width: 8,
    backgroundColor: 'rgb(237,237,237)'
  }
});
