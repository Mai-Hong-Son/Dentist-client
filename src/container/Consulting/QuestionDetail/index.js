import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Image from 'react-native-fast-image';
import moment from 'moment';
// import moment from 'moment';

import * as questionActions from '../../../store/actions/question';
import * as answerActions from '../../../store/actions/answer';
import * as serviceActions from '../../../store/actions/service';
import GenericButton from '../../../components/GenericButton';
import platform from '../../../theme/variables/platform';
// import images from '../../../assets/images';
import Scale from '../../../utils/Scale';
import NavigationEvent from '../../../NavigationEvent';
import GenericModal from '../../../components/GenericModal';
import IssueImageButton from '../SupportCenter/IssueItem/IssueImageButton';

const BACKGROUNDCOLOR = 'rgb(250, 250, 250)';

@connect(
  null,
  {
    ...questionActions,
    ...answerActions,
    ...serviceActions
  }
)
export default class QuestionDetail extends React.PureComponent {
  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true
  };

  constructor(props) {
    super(props);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      dataQuestion: {},
      dataAnswer: {},
      dataDefaultf: null,
      loadingQuestion: true,
      loadingAnswer: true,
      loadingDataDefault: true
    };
  }

  componentDidMount() {
    const { id, navigator } = this.props;

    this.props.questionDetail({ id }, (err, result) => {
      this.setState({
        dataQuestion: result,
        loadingQuestion: false
      });

      const {
        created_at,
        service: { name },
        service_issue_detail_id
      } = result;

      this.props.fetchServiceIssueDetailById(service_issue_detail_id, (error, data) => {
        this.setState({
          dataDefaultf: data,
          loadingDataDefault: false
        });
      });

      navigator.setStyle({
        navBarCustomView: 'nav_bar',
        navBarCustomViewInitialProps: {
          date: moment(created_at).format('DD/MM/YYYY'),
          title: name,
          code: id
        }
      });
    });

    this.props.answerDetail(id, (err, result) => {
      this.setState({
        dataAnswer: result.items[0],
        loadingAnswer: false
      });
    });
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);
    }

    switch (event.id) {
      case 'willAppear':
        // On enter on this screen, enable the drawer
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
        // On leave from this screen, enable the drawer
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

  _onPhotoSelected = (photos, index) => {
    const { navigator } = this.props;
    navigator.showModal({
      screen: 'photo_viewer',
      navBarHidden: true,
      passProps: {
        // photos: this.state.dataQuestion.image_urls,
        photos,
        startAt: index,
        onDone: () => {
          navigator.dismissModal();
        }
      }
    });
  };

  render() {
    const { loadingQuestion, loadingAnswer, loadingDataDefault } = this.state;
    let sugeriesData = null;

    if (loadingQuestion || loadingAnswer || loadingDataDefault) return <ActivityIndicator />;

    const {
      dataQuestion: {
        // created_at: createAt,
        // id,
        image_urls: imagesUrl,
        x_ray_image_urls: xRayUrl,
        // service: { name },
        service_issue: { title: titleServiceIssue }
      },
      dataAnswer,
      dataDefaultf: {
        // content_title,
        content_result,
        content_time,
        content_surgery,
        gallery: { image_before_url, image_after_url }
      }
    } = this.state;
    let answerDentist = 'Chưa có câu trả lời...';
    let imageBeforeUrl = '';
    let imageAfterUrl = '';

    if (dataAnswer !== undefined) {
      const { assumed_surgeries, gallery } = dataAnswer;

      sugeriesData = assumed_surgeries.map((item, index) => (
        <Text key={index} style={styles.titleStatus}>{`     ${item.assumed_surgery.name}`}</Text>
      ));

      if (dataAnswer.content !== '' && dataAnswer.content !== null) {
        answerDentist = dataAnswer.content;
      }

      if (gallery !== null) {
        imageBeforeUrl = gallery.image_before_url;
        imageAfterUrl = gallery.image_after_url;
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: Scale.getSize(15) }}>
          <View style={styles.wrapStatusBox}>
            <Text style={[styles.txtTitleTop, { color: platform.primaryOrange }]}>
              {'Câu trả lời của bác sỹ'}
            </Text>
            <View style={styles.statusContentBox}>
              <View style={styles.triangleContainer}>
                <View style={styles.triangle} />
                <View style={styles.innerTriangle} />
              </View>
              <View style={styles.hiddenBox}>
                <Text style={styles.titleStatus}>{`${answerDentist}`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.modelBox}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
              <View style={styles.textBox}>
                <Text style={styles.title}>{titleServiceIssue.toUpperCase()}</Text>
              </View>
              <View style={styles.optionsBo}>
                <Text style={styles.txtInfo}>{'1) Kết quả'}</Text>
                <Text style={styles.titleStatus}>
                  {`     ${
                    dataAnswer === undefined ? content_result : dataAnswer.assumed_result.name
                  }`}
                </Text>
                <Text style={styles.txtInfo}>{'2) Thời gian dự kiến'}</Text>
                <Text style={styles.titleStatus}>
                  {`     ${dataAnswer === undefined ? content_time : dataAnswer.assumed_time.name}`}
                </Text>
                <Text style={styles.txtInfo}>{'3) Thủ thuật cần làm'}</Text>
                {sugeriesData === null ? (
                  <Text style={styles.titleStatus}>{`     ${content_surgery}`}</Text>
                ) : (
                  sugeriesData
                )}
                <Text style={styles.txtInfo}>{'4) Before & After'}</Text>
                <Text style={styles.titleStatus}>{'     Hai ảnh Before và After'}</Text>
                <View style={styles.beforeAfterImagesRow}>
                  <GenericModal style={styles.beforeAfterImageOuterContainer}>
                    <GenericModal style={styles.beforeAfterImageContainer}>
                      <IssueImageButton
                        source={imageBeforeUrl === '' ? image_before_url : imageBeforeUrl}
                        // onPress={() => this._onBeforeAfterImagePress(image_before_url)}
                      />
                    </GenericModal>
                  </GenericModal>
                  <GenericModal style={styles.beforeAfterImageOuterContainer}>
                    <GenericModal style={styles.beforeAfterImageContainer}>
                      <IssueImageButton
                        source={imageAfterUrl === '' ? image_after_url : imageAfterUrl}
                        // onPress={() => this._onBeforeAfterImagePress(image_after_url)}
                      />
                    </GenericModal>
                  </GenericModal>
                </View>
              </View>
            </ScrollView>
          </View>

          <Text style={styles.txtTitleTop}>{'Ảnh chụp'}</Text>
          <View style={styles.genericModalBotStyle}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {imagesUrl.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => this._onPhotoSelected(this.state.dataQuestion.image_urls, index)}
                >
                  <View style={styles.wrapImage}>
                    <Image style={styles.image} source={{ uri: item }} />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Text style={styles.txtTitleTop}>{'Ảnh X-Quang'}</Text>
          <View style={styles.genericModalBotStyle}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {xRayUrl.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() =>
                    this._onPhotoSelected(this.state.dataQuestion.x_ray_image_urls, index)
                  }
                >
                  <View style={styles.wrapImage}>
                    <Image
                      style={{ height: Scale.getSize(70), width: Scale.getSize(70) }}
                      source={{ uri: item }}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.footerStyle}>
          <View style={styles.wrapButtonLeft}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigator.pop()}>
              <View style={styles.backButton}>
                <Text style={styles.txtBackButton}>{'Quay lại'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapButtonRight}>
            <GenericButton
              caption={'Đặt lịch'}
              containerStyle={styles.genericButtonCotainer}
              textStyle={styles.genericButtonText}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250,250,250)',
    marginTop: 60
  },
  wrapStatusBox: {
    paddingTop: Scale.getSize(25),
    paddingBottom: Scale.getSize(15)
  },
  statusContentBox: {},
  txtTitleTop: {
    fontSize: Scale.getSize(15),
    fontWeight: '800',
    color: 'rgb(82,82,82)'
  },
  titleStatus: {
    fontWeight: '100',
    fontSize: Scale.getSize(14),
    color: 'rgb(82,82,82)',
    paddingBottom: Scale.getSize(4)
  },
  triangleContainer: {
    flexDirection: 'row',
    marginLeft: Scale.getSize(20),
    zIndex: 1,
    transform: [
      {
        translateY: Scale.getSize(2)
      }
    ]
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: Scale.getSize(5),
    borderRightWidth: Scale.getSize(5),
    borderBottomWidth: Scale.getSize(10),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: platform.primaryOrange
  },

  innerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: Scale.getSize(5),
    borderRightWidth: Scale.getSize(5),
    borderBottomWidth: Scale.getSize(10),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [
      {
        translateX: -Scale.getSize(10)
      },
      {
        translateY: Scale.getSize(5)
      }
    ]
  },

  hiddenBox: {
    borderWidth: 2,
    borderColor: platform.primaryOrange,
    padding: Scale.getSize(15),
    backgroundColor: 'white',
    borderRadius: Scale.getSize(12),
    alignItems: 'center'
  },
  modelBox: {
    paddingVertical: Scale.getSize(15),
    borderWidth: 2,
    borderColor: platform.primaryOrange,
    borderRadius: Scale.getSize(12),
    // height: Scale.getSize(350),
    marginBottom: Scale.getSize(25)
  },
  contentContainerStyle: {
    paddingHorizontal: Scale.getSize(15)
  },
  genericModalBotStyle: {
    // backgroundColor: '#fff',
    paddingVertical: Scale.getSize(15)
  },
  titleBox: {
    flexDirection: 'row',
    paddingTop: Scale.getSize(18),
    paddingBottom: Scale.getSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237,237,237)'
  },
  title: {
    fontSize: Scale.getSize(18),
    fontWeight: '800',
    color: 'rgb(82,82,82)',
    paddingLeft: Scale.getSize(10)
  },
  optionsBox: {
    paddingTop: Scale.getSize(18)
  },
  txtInfo: {
    fontSize: Scale.getSize(15),
    fontWeight: '800',
    color: 'rgb(82,82,82)',
    paddingTop: Scale.getSize(15),
    paddingBottom: Scale.getSize(5)
  },
  textBox: {
    paddingBottom: Scale.getSize(15),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237,237,237)'
  },
  contentTextBox: {
    fontSize: Scale.getSize(14),
    fontWeight: '200',
    color: 'rgb(82,82,82)',
    paddingBottom: Scale.getSize(40)
  },
  footerStyle: {
    flexDirection: 'row',
    paddingVertical: Scale.getSize(30),
    paddingHorizontal: Scale.getSize(15)
  },
  wrapButtonLeft: {
    flex: 1,
    paddingRight: Scale.getSize(5)
  },
  wrapButtonRight: {
    flex: 1,
    paddingLeft: Scale.getSize(5)
  },
  genericButtonCotainer: {
    paddingVertical: Scale.getSize(15),
    alignItems: 'center'
  },
  genericButtonText: {
    fontSize: Scale.getSize(18),
    color: platform.containerBg,
    fontWeight: '900'
  },
  backButton: {
    backgroundColor: BACKGROUNDCOLOR,
    paddingVertical: Scale.getSize(15) - 1,
    borderRadius: 40,
    alignItems: 'center',
    borderColor: 'rgb(137,137,137)',
    borderWidth: 2
  },
  txtBackButton: {
    color: 'rgb(137,137,137)',
    fontSize: Scale.getSize(16),
    fontWeight: '900'
  },
  wrapImage: {
    borderRadius: Scale.getSize(6),
    overflow: 'hidden',
    marginRight: Scale.getSize(10)
  },
  image: {
    width: Scale.getSize(50),
    height: Scale.getSize(50)
  },
  beforeAfterImagesRow: {
    flexDirection: 'row',
    paddingLeft: Scale.getSize(15),
    paddingVertical: Scale.getSize(15)
  },
  beforeAfterImageOuterContainer: {
    marginRight: Scale.getSize(15)
  },
  beforeAfterImageContainer: {
    overflow: 'hidden'
  }
});
