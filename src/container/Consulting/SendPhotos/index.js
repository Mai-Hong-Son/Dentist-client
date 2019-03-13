import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Scale from '../../../utils/Scale';
import PhotoCollection from './PhotoCollection';
import FileCollection from './FileCollection';
import platform from '../../../theme/variables/platform';
import SafeArea from '../../../components/SafeArea';
import { FooterSection } from '../Common/Components/FooterSection';
import { ProgressIndicator } from '../Common/Elements/ProgressIndicator';
import * as questionActions from '../../../store/actions/question';
import * as serviceActions from '../../../store/actions/service';
import { confirmationPhone } from '../../../store/actions/auth';
// import { getReduxComponentRef } from '../../../utils/utils';
import { getIdentity } from '../../../store/selectors/auth';
import withModal from '../../../utils/withModal';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const COLUMN_NUMBER = 4;
const MAXIMUM_IMAGE_NUMBER = 8;
const CONTAINER_HORIZONTAL_PADDING = Scale.getSize(18);
const IMAGE_SIZE =
  (WINDOW_WIDTH - (COLUMN_NUMBER + 1) * CONTAINER_HORIZONTAL_PADDING) / COLUMN_NUMBER;
const IMAGE_FULL_SIZE = IMAGE_SIZE + CONTAINER_HORIZONTAL_PADDING;

@withModal()
@connect(
  state => ({
    identity: getIdentity(state)
  }),
  { ...questionActions, ...serviceActions, confirmationPhone }
)
export default class SendPhotos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.photoCollection = null;
    this.xRayCollection = null;

    this.photoCollectionRef = React.createRef();
    this.xRayCollectionRef = React.createRef();

    this.state = {
      loading: true,
      nextButtonEnabled: false
      // modalVisible: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount = () => {
    this._loadServiceIssueGuide(true);
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

  guide = null;

  _loadServiceIssueGuide = ignoreLoadingTest => {
    if (this.state.loading && !ignoreLoadingTest) {
      return;
    }
    const { serviceId } = this.props;
    this.setState({ loading: true, error: false }, () => {
      this.props.fetchServiceGuide(serviceId, (error, data) => {
        if (!error) {
          this.guide = data.items || [];
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false, error: true });
        }
      });
    });
  };

  _onTutorialPress = () => {
    const { navigator } = this.props;
    navigator.push({
      screen: 'tutorial',
      title: 'Hướng dẫn',
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: {
        tutorials: this.guide.map(element => ({
          caption: element.guide_content,
          image: element.guide_image_url
        }))
      }
    });
  };

  _onPrevPress = () => {
    this.props.navigator.pop();
  };

  _onShowTextInputPhone = () => {
    this.props.navigator.showLightBox({
      screen: 'put_phonenumber',
      passProps: {
        onPress: () => this._onNextPress()
      }
    });
  };

  _checkPhone = () => {
    this.props.confirmationPhone(null, (err, data) => {
      const {
        identity: { phone }
      } = this.props;

      if (data || phone) {
        this._onNextPress();
        return;
      }

      this._onShowTextInputPhone();
    });
  };

  _onNextPress = () => {
    this.showLoadingScreen();

    const { serviceId, serviceIssueId, serviceIssueDetailId } = this.props;

    this.props.createQuestion(
      {
        title: 'some_title',
        service_id: serviceId,
        service_issue_id: serviceIssueId,
        service_issue_detail_id: serviceIssueDetailId,
        status: 1,
        // image: photoCollectionRef.getPhotos(),
        image: this.photoCollectionRef.current
          .getWrappedInstance()
          .getWrappedInstance()
          .getPhotos(),
        x_ray_image: this.xRayCollectionRef.current
          .getWrappedInstance()
          .getWrappedInstance()
          .getFiles()
      },
      error => {
        this.hideLoadingScreen();
        if (!error) {
          this.props.modal.showConfirmDialog({
            title: 'Gửi tư vấn thành công',
            description:
              'Chúng tôi sẽ gửi bạn nha sĩ phù hợp, chi phí, khuyến mại & quy trình thanh toán tốt nhất cho bạn trong vòng 8 tiếng làm việc.',
            onConfirmPress: () => {
              this.props.navigator.popToRoot();
            }
          });
        } else {
          this.props.modal.showAlert({
            title: 'Gửi tư vấn chưa thành công',
            description: 'Bạn vui lòng kiểm tra tình trạng internet và chọn gửi lại nhé.'
          });
        }
      }
    );
    // });
  };

  showLoadingScreen = () => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.props.navigator.showLightBox({
      screen: 'loading',
      passProps: {
        text: 'Đang gửi tư vấn, xin vui lòng chờ'
      }
    });
  };

  hideLoadingScreen = () => {
    if (!this.loading) {
      return;
    }
    this.loading = false;
    this.props.navigator.dismissLightBox();
  };

  render() {
    if (this.state.loading) {
      return (
        <SafeArea>
          <ActivityIndicator />
        </SafeArea>
      );
    }

    if (this.state.error) {
      return (
        <SafeArea>
          <TouchableOpacity activeOpacity={0.5} onPress={this._loadServiceIssueGuide}>
            <View style={styles.errorTextContainer}>
              <Text style={styles.errorText}>
                {'Không tải được dữ liệu.\nHãy kiểm tra lại kết nối và ấn vào đây để thử lại.'}
              </Text>
              <SimpleLineIcons name="reload" size={Scale.getSize(30)} />
            </View>
          </TouchableOpacity>
        </SafeArea>
      );
    }
    const { navigator } = this.props;
    const guide = this.guide;

    let photoSize = IMAGE_SIZE;
    if (platform.isAndroid) {
      photoSize -= COLUMN_NUMBER * Scale.getSize(1);
    }

    return (
      <SafeArea>
        <View style={styles.container}>
          <ProgressIndicator percentage={100} />
          <View style={styles.contentContainer}>
            <View style={styles.sectionNameLine}>
              <View style={styles.wordPhrase}>
                <Text style={styles.sectionNameText}>{'Chọn ảnh chụp'}</Text>
                <Text style={[styles.sectionNameText, { color: platform.primaryOrange }]}>
                  {'*'}
                </Text>
              </View>
              <TouchableOpacity onPress={this._onTutorialPress} activeOpacity={0.6}>
                <View style={[styles.wordPhrase, { alignItems: 'center' }]}>
                  <Text style={styles.tutorialText}>{'Xem hướng dẫn'}</Text>
                  <Ionicons
                    name="ios-arrow-forward"
                    style={styles.icon}
                    size={14}
                    color={platform.primaryOrange}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <PhotoCollection
              ref={this.photoCollectionRef}
              frameImages={guide.map(element => element.frame_image_url)}
              guideContent={guide.map(element => ({
                image: element.guide_image_url,
                frame: element.frame_image_url,
                content: element.guide_content
              }))}
              navigator={navigator}
              numColumns={COLUMN_NUMBER}
              containerStyle={styles.photosContainer}
              contentContainerStyle={styles.photosInnerContainer}
              itemContainerStyle={styles.photoContainer}
              photoWidth={photoSize}
              photoHeight={photoSize}
              photoFullWidth={IMAGE_FULL_SIZE}
              photoFullHeight={IMAGE_FULL_SIZE}
              onUploadStateChanged={uploadedNumber => {
                if (guide.length === uploadedNumber) {
                  this.setState({ nextButtonEnabled: true });
                } else {
                  this.setState({ nextButtonEnabled: false });
                }
              }}
            />
            <View style={styles.sectionNameLine}>
              <Text style={styles.sectionNameText}>{'Chọn ảnh X-Quang'}</Text>
            </View>
            <FileCollection
              ref={this.xRayCollectionRef}
              navigator={navigator}
              numColumns={COLUMN_NUMBER}
              maxFiles={MAXIMUM_IMAGE_NUMBER}
              containerStyle={styles.photosContainer}
              contentContainerStyle={styles.photosInnerContainer}
              photoWidth={photoSize}
              photoHeight={photoSize}
              photoFullWidth={IMAGE_FULL_SIZE}
              photoFullHeight={IMAGE_FULL_SIZE}
              itemContainerStyle={styles.photoContainer}
            />
          </View>
          <FooterSection
            onPrevPress={this._onPrevPress}
            onNextPress={this._onNextPress}
            disableNextButton={!this.state.nextButtonEnabled}
          />
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING,
    paddingTop: Scale.getSize(15),
    backgroundColor: '#FAFAFA'
  },

  contentContainer: {
    flex: 1
  },

  sectionNameLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Scale.getSize(10)
  },

  sectionNameText: {
    fontWeight: 'bold',
    color: '#333'
  },

  wordPhrase: {
    flexDirection: 'row'
  },

  photosContainer: {
    marginHorizontal: -CONTAINER_HORIZONTAL_PADDING,
    flex: 1
  },

  photosInnerContainer: {
    paddingLeft: Scale.getSize(20),
    paddingTop: Scale.getSize(20)
  },

  photoContainer: {
    // paddingRight: CONTAINER_HORIZONTAL_PADDING,
    // paddingBottom: CONTAINER_HORIZONTAL_PADDING
  },

  photosRow: {
    flexDirection: 'row'
  },

  tutorialText: {
    fontSize: Scale.getSize(12),
    fontWeight: '800',
    color: platform.primaryOrange
  },

  icon: {
    marginLeft: Scale.getSize(5),
    marginTop: Scale.getSize(2)
  },

  footer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  errorTextContainer: {
    alignItems: 'center'
  },

  errorText: {
    textAlign: 'center',
    marginBottom: Scale.getSize(14),
    fontWeight: '400',
    fontSize: Scale.getSize(15)
  }
});
