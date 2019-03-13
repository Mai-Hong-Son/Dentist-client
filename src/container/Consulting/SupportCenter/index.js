import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Image from 'react-native-fast-image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import GenericModal from '../../../components/GenericModal';
import IssueItem from './IssueItem';
import IssueImageButton from './IssueItem/IssueImageButton';
import { FooterSection } from '../Common/Components/FooterSection';
import Scale from '../../../utils/Scale';
import images from '../../../assets/images';
import SafeArea from '../../../components/SafeArea';
import { ProgressIndicator } from '../Common/Elements/ProgressIndicator';
import * as serviceActions from '../../../store/actions/service';

const BUTTON_SIZE = Scale.getSize(28);
const BUTTON_PRESS_OPACITY = 0.7;
const PROGRESS_BAR_PERCENTAGE = 66;
const BLUR_ICON_OPACITY = 0.4;
const CLEAR_ICON_OPACITY = 1.0;

const BEFORE_AFTER_IMAGE_SIZE = Scale.getSize(20);

const LikeState = {
  null: 0,
  like: 1,
  dislike: 2
};

@connect(
  null,
  { ...serviceActions }
)
export default class SupportCenter extends React.Component {
  static propTypes = {
    serviceIssueId: PropTypes.number,
    parentId: PropTypes.number,
    title: PropTypes.string.isRequired,
    isLeafNode: PropTypes.bool
  };

  static defaultProps = {
    serviceIssueId: -1,
    parentId: -1,
    isLeafNode: false
  };

  state = {
    loading: true,
    issueDetails: null,
    leafNodeContent: null,
    smileIconOpacity: BLUR_ICON_OPACITY,
    frownIconOpacity: BLUR_ICON_OPACITY
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount = () => {
    const { isLeafNode } = this.props;
    if (!isLeafNode) {
      this._loadServiceIssueDetails(true);
      return;
    }
    this._showLeafNodeContent();
    this._loadLikeState(true);
  };

  shouldComponentUpdate = () => false;

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

  likeState = LikeState.null;

  _showLeafNodeContent = () => {
    const { content_title, content_result, content_time, content_surgery, gallery } = this.props;

    const leafNodeContent = {
      content_title,
      content_result,
      content_time,
      content_surgery,
      gallery
    };
    this.setState({ leafNodeContent }, () => {
      this.forceUpdate();
    });
  };

  _loadServiceIssueDetails = ignoreLoadingTest => {
    if (this.loading && !ignoreLoadingTest) {
      return;
    }

    this.setState({ loading: true }, () => {
      const {
        serviceIssueId,
        parentId,
        isLeafNode,
        fetchServiceIssueDetails,
        leafNodeContent
      } = this.props;
      if (isLeafNode) {
        this.setState({ loading: false, leafNodeContent }, () => {
          this.forceUpdate();
          this._loadLikeState();
        });

        return;
      }

      const params = {};
      if (serviceIssueId !== -1) {
        params.serviceIssueId = serviceIssueId;
      }
      if (parentId !== -1) {
        params.parentId = parentId;
      }

      fetchServiceIssueDetails(params, (error, data) => {
        if (error) {
          this.setState({ loading: false }, () => {
            this.forceUpdate();
          });
          return;
        }

        this.setState({ loading: false, issueDetails: data.items }, () => {
          this.forceUpdate();
        });
      });
    });
  };

  _loadLikeState = ignoreLoadingTest => {
    if (this.loading && !ignoreLoadingTest) {
      return;
    }

    const { check, parentId } = this.props;

    this.setState({ loading: true, error: false }, () => {
      check(parentId, (error, data) => {
        if (error) {
          this.setState({ loading: false, error: true }, () => {
            this.forceUpdate();
          });
          return;
        }

        if (!data) {
          this.props.createRating(parentId, error2 => {
            if (error2) {
              this.setState({ loading: false, error: true }, () => {
                this.forceUpdate();
              });
              return;
            }

            this.setState(
              {
                loading: false,
                smileIconOpacity: BLUR_ICON_OPACITY,
                frownIconOpacity: BLUR_ICON_OPACITY
              },
              () => {
                this.forceUpdate();
              }
            );

            return;
          });
          return;
        }

        if (data.type === LikeState.like) {
          this.setState(
            {
              loading: false,
              smileIconOpacity: CLEAR_ICON_OPACITY,
              frownIconOpacity: BLUR_ICON_OPACITY
            },
            () => {
              this.forceUpdate();
            }
          );
          return;
        }

        if (data.type === LikeState.dislike) {
          this.setState(
            {
              loading: false,
              smileIconOpacity: BLUR_ICON_OPACITY,
              frownIconOpacity: CLEAR_ICON_OPACITY
            },
            () => {
              this.forceUpdate();
            }
          );
          return;
        }
        this.setState(
          {
            loading: false,
            smileIconOpacity: BLUR_ICON_OPACITY,
            frownIconOpacity: BLUR_ICON_OPACITY
          },
          () => {
            this.forceUpdate();
          }
        );
      });
    });
  };

  _onPrevPress = () => {
    this.props.navigator.pop();
  };

  _onNextPress = () => {
    const { navigator, serviceId, serviceIssueId, parentId } = this.props;
    navigator.push({
      screen: 'send_photos',
      title: 'Gửi hình ảnh',
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: {
        serviceId,
        serviceIssueId,
        serviceIssueDetailId: parentId
      }
    });
  };

  _onSmilePress = () => {
    const { like, parentId } = this.props;
    if (this.likeState === LikeState.like) {
      return;
    }
    like(parentId);
    this.likeState = LikeState.like;
    this.setState(
      { smileIconOpacity: CLEAR_ICON_OPACITY, frownIconOpacity: BLUR_ICON_OPACITY },
      () => {
        this.forceUpdate();
      }
    );
  };

  _onFrownPress = () => {
    const { dislike, parentId } = this.props;
    if (this.likeState === LikeState.dislike) {
      return;
    }
    dislike(parentId);
    this.likeState = LikeState.dislike;
    this.setState(
      { smileIconOpacity: BLUR_ICON_OPACITY, frownIconOpacity: CLEAR_ICON_OPACITY },
      () => {
        this.forceUpdate();
      }
    );
  };

  _onSelect = (
    id,
    issueTitle,
    display_type,
    content_title,
    content_result,
    content_time,
    content_surgery,
    gallery
  ) => {
    const { serviceId, serviceIssueId, navigator, findScreenById, title } = this.props;
    navigator.push({
      screen: findScreenById('support_center'),
      title: 'Trung tâm trợ giúp',
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: {
        title: `${title} / ${issueTitle}`,
        serviceId,
        serviceIssueId,
        parentId: id,
        leafNodeContent: {
          content_title,
          content_result,
          content_time,
          content_surgery,
          gallery
        },
        isLeafNode: display_type === 2
      }
    });
  };

  _onRetryPress = () => {
    const { isLeafNode } = this.props;
    if (isLeafNode) {
      this._loadLikeState();
      return;
    }

    this._loadServiceIssueDetails();
  };

  _renderLoading = () => (
    <SafeArea>
      <View style={styles.container}>
        <ProgressIndicator percentage={PROGRESS_BAR_PERCENTAGE} />
        <ActivityIndicator />
      </View>
    </SafeArea>
  );

  _renderLoadingFinishedError = () => (
    <SafeArea>
      <View style={styles.container}>
        <ProgressIndicator percentage={PROGRESS_BAR_PERCENTAGE} />
        <TouchableOpacity activeOpacity={0.5} onPress={this._onRetryPress}>
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorText}>
              {'Không tải được dữ liệu.\nHãy kiểm tra lại kết nối và ấn vào đây để thử lại.'}
            </Text>
            <SimpleLineIcons name="reload" size={Scale.getSize(30)} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );

  _renderLoadingFinished() {
    return (
      <SafeArea>
        <View style={styles.container}>
          <ProgressIndicator percentage={PROGRESS_BAR_PERCENTAGE} />
          <View style={styles.consultingContentHeaderContainer}>
            <Text style={styles.consultingContentTitleText}>Nội dung tư vấn</Text>
            <Text style={styles.consultingContentSubtitleText}>{this.props.title}</Text>
          </View>
          <GenericModal style={styles.modal}>
            <ScrollView>
              {this.state.issueDetails.map(
                ({
                  id,
                  title,
                  image_urls,
                  display_type,
                  content_title,
                  content_result,
                  content_time,
                  content_surgery,
                  gallery
                }) => (
                  <View key={id} style={styles.issueItem}>
                    <IssueItem
                      title={title}
                      imageSources={image_urls}
                      onTitlePress={() =>
                        this._onSelect(
                          id,
                          title,
                          display_type,
                          content_title,
                          content_result,
                          content_time,
                          content_surgery,
                          gallery
                        )
                      }
                      navigator={this.props.navigator}
                    />
                    <View style={styles.issueItemSeparator} />
                  </View>
                )
              )}
            </ScrollView>
          </GenericModal>
          <FooterSection onPrevPress={this._onPrevPress} hideNextButton />
        </View>
      </SafeArea>
    );
  }

  _onBeforeAfterImagePress = source => {
    this.props.navigator.showLightBox({
      screen: 'image_viewer',
      style: {
        tapBackgroundToDismiss: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      },
      passProps: { source }
    });
  };

  _renderLeafNodeContent() {
    const {
      leafNodeContent: {
        content_title,
        content_result,
        content_time,
        content_surgery,
        gallery: { image_before_url, image_after_url }
      }
    } = this.props;
    return (
      <SafeArea>
        <View style={styles.container}>
          <ProgressIndicator percentage={PROGRESS_BAR_PERCENTAGE} />
          <View style={styles.consultingContentHeaderContainer}>
            <Text style={styles.consultingContentTitleText}>Nội dung tư vấn</Text>
            <Text style={styles.consultingContentSubtitleText}>{this.props.title}</Text>
          </View>
          <GenericModal style={styles.webViewModalContainer}>
            <GenericModal style={styles.webViewModal}>
              <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
                <Text style={styles.leafNodeTitleText}>{content_title || 'Kết quả tư vấn'}</Text>
                <View style={styles.leafNodeContentSeparator} />
                <Text style={styles.leafNodeSectionNameText}>{'1) Kết quả'}</Text>
                <Text style={styles.leftNodeSectionText}>{content_result || 'Đang cập nhật'}</Text>
                <Text style={styles.leafNodeSectionNameText}>{'2) Thời gian dự kiến'}</Text>
                <Text style={styles.leftNodeSectionText}>{content_time || 'Đang cập nhật'}</Text>
                <Text style={styles.leafNodeSectionNameText}>{'3) Thủ thuật cần làm'}</Text>
                <Text style={styles.leftNodeSectionText}>{content_surgery || 'Đang cập nhật'}</Text>
                <Text style={styles.leafNodeSectionNameText}>{'4) Before & After'}</Text>
                <View style={styles.beforeAfterImagesRow}>
                  <GenericModal style={styles.beforeAfterImageOuterContainer}>
                    <GenericModal style={styles.beforeAfterImageContainer}>
                      <IssueImageButton
                        source={image_before_url}
                        onPress={() => this._onBeforeAfterImagePress(image_before_url)}
                      />
                    </GenericModal>
                  </GenericModal>
                  <GenericModal style={styles.beforeAfterImageOuterContainer}>
                    <GenericModal style={styles.beforeAfterImageContainer}>
                      <IssueImageButton
                        source={image_after_url}
                        onPress={() => this._onBeforeAfterImagePress(image_after_url)}
                      />
                    </GenericModal>
                  </GenericModal>
                </View>
              </ScrollView>
              <View style={styles.webViewModalFooter}>
                <View style={styles.webViewModalFooterRow}>
                  <Text style={styles.webViewModalFooterText}>Bài viết này có hữu ích không?</Text>
                  <View style={styles.buttonGroupContainer}>
                    <TouchableOpacity
                      onPress={this._onSmilePress}
                      activeOpacity={BUTTON_PRESS_OPACITY}
                    >
                      <View style={styles.buttonContainer}>
                        <Image
                          style={styles.image}
                          source={images.smile}
                          resizeMode="contain"
                          opacity={this.state.smileIconOpacity}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this._onFrownPress}
                      activeOpacity={BUTTON_PRESS_OPACITY}
                    >
                      <View style={styles.buttonContainer}>
                        <Image
                          style={styles.image}
                          source={images.frown}
                          resizeMode="contain"
                          opacity={this.state.frownIconOpacity}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </GenericModal>
          </GenericModal>
          <FooterSection onPrevPress={this._onPrevPress} onNextPress={this._onNextPress} />
        </View>
      </SafeArea>
    );
  }

  render() {
    if (this.state.loading) {
      return this._renderLoading();
    }

    if (this.state.leafNodeContent) {
      return this._renderLeafNodeContent();
    }

    if (!this.state.issueDetails) {
      return this._renderLoadingFinishedError();
    }

    if (this.state.error) {
      return this._renderLoadingFinishedError();
    }

    return this._renderLoadingFinished();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Scale.getSize(18),
    paddingTop: Scale.getSize(15),
    backgroundColor: '#FAFAFA'
  },

  selectorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  consultingContentHeaderContainer: {
    paddingBottom: Scale.getSize(20)
  },

  consultingContentTitleText: {
    fontSize: Scale.getSize(18),
    fontWeight: '900',
    color: '#333',
    marginBottom: Scale.getSize(5)
  },

  consultingContentSubtitleText: {
    fontSize: Scale.getSize(14),
    fontWeight: '400',
    color: '#777'
  },

  modal: {
    flex: 1,
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(15),
    justifyContent: 'flex-start'
  },

  webViewModalContainer: {
    flex: 1
  },

  webViewModal: {
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },

  webViewModalFooter: {
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    // right: 0,
    height: Scale.getSize(50),
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: Scale.getSize(3) },
    shadowOpacity: 0.7,
    shadowRadius: Scale.getSize(5),
    elevation: Scale.getSize(1),
    paddingHorizontal: Scale.getSize(20)
  },

  webViewModalFooterRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  webViewModalFooterText: {
    fontSize: Scale.getSize(13),
    color: '#656565'
  },

  buttonGroupContainer: {
    flexDirection: 'row'
  },

  buttonContainer: {
    paddingHorizontal: Scale.getSize(8)
  },

  issueItem: {},

  issueItemSeparator: {
    height: Scale.getSize(20)
  },

  navigatorButtonContainerStyle: {
    paddingVertical: Scale.getSize(12),
    paddingLeft: Scale.getSize(25),
    alignItems: 'flex-start'
  },

  navigatorButtonTextStyle: {
    color: 'black',
    fontWeight: '800',
    fontSize: Scale.getSize(13)
  },

  scrollViewContentContainer: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(30)
  },

  image: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE
  },

  errorTextContainer: {
    alignItems: 'center'
  },

  errorText: {
    textAlign: 'center',
    marginBottom: Scale.getSize(14),
    fontWeight: '400',
    fontSize: Scale.getSize(15)
  },

  leafNodeTitleText: {
    fontWeight: 'bold',
    fontSize: Scale.getSize(20),
    alignSelf: 'center',
    color: '#333'
  },

  leafNodeSectionNameText: {
    fontWeight: 'bold',
    fontSize: Scale.getSize(16),
    paddingTop: Scale.getSize(15),
    color: '#333'
  },

  leftNodeSectionText: {
    paddingLeft: Scale.getSize(15),
    color: '#333'
  },

  leafNodeContentSeparator: {
    height: 1,
    backgroundColor: '#EEE',
    marginTop: Scale.getSize(15)
  },

  beforeAfterImagesRow: {
    flexDirection: 'row',
    paddingLeft: Scale.getSize(15),
    paddingTop: Scale.getSize(15)
  },

  beforeAfterImageOuterContainer: {
    marginRight: Scale.getSize(15)
  },

  beforeAfterImageContainer: {
    overflow: 'hidden'
  }
});
