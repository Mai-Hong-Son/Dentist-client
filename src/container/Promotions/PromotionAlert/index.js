import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import {
  listPromotion,
  promotionRating,
  promotionRatingLike,
  promotionRatingDislike
} from '../../../store/actions/promotion';
import GenericModal from '../../../components/GenericModal';
import FullGradient from '../../../components/FullGradient';
import SafeArea from '../../../components/SafeArea';
import images from '../../../assets/images';
import Scale from '../../../utils/Scale';
import platform from '../../../theme/variables/platform';

const IMAGE_WIDTH = platform.deviceWidth - Scale.getSize(80);
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.75;

@connect(
  null,
  dispatch => ({
    dispatch,
    listPromotion: (...args) => dispatch(listPromotion(...args)),
    promotionRating: (...args) => dispatch(promotionRating(...args)),
    promotionRatingLike: (...args) => dispatch(promotionRatingLike(...args)),
    promotionRatingDislike: (...args) => dispatch(promotionRatingDislike(...args))
  })
)
export default class PromotionAlert extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataDetail: {},
      loading: true
    };
  }

  componentDidMount() {
    this.props.listPromotion(null, (error, data) => {
      if (data.items.length === 0) {
        this.props.navigator.dismissLightBox();
        return;
      }
      if (!error) {
        this.setState({
          dataDetail: data.items[0],
          loading: false
        });

        this.props.promotionRating(data.items[0].id);
      }
    });
  }

  onLinking = link => {
    Linking.openURL(link);
  };

  onLike = () => {
    const { dataDetail } = this.state;
    const { navigator } = this.props;

    if (dataDetail.id) {
      this.props.promotionRatingLike(dataDetail.id, (error, data) => console.warn(data));
    }

    navigator.dismissLightBox();
  };

  onDislike = () => {
    const { dataDetail } = this.state;
    const { navigator } = this.props;

    if (dataDetail.id) {
      this.props.promotionRatingDislike(dataDetail.id);
    }

    navigator.dismissLightBox();
  };

  render() {
    const {
      dataDetail: { title, content, link, image },
      loading
    } = this.state;

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={styles.wrapBigBox}
        onPress={() => this.props.navigator.dismissLightBox()}
      >
        <GenericModal style={styles.genericStyle}>
          <TouchableOpacity activeOpacity={1.0}>
            <View style={styles.wrapIconExit}>
              <TouchableOpacity onPress={() => this.props.navigator.dismissLightBox()}>
                <Image
                  source={require('../../../assets/images/icon_exit.png')}
                  style={styles.imageIcon}
                />
              </TouchableOpacity>
            </View>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView>
                <Text style={styles.titlePromotion}>{title}</Text>
                <TouchableOpacity
                  onPress={() => {
                    link === null ? null : this.onLinking(link);
                  }}
                >
                  <Image source={image === null ? images.discount : image} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.contentPromotion}>{content}</Text>
                <TouchableOpacity
                  onPress={() => {
                    link === null ? null : this.onLinking(link);
                  }}
                >
                  <Text style={styles.subContentPromotion}>{'Xem thêm...'}</Text>
                </TouchableOpacity>
              </ScrollView>
            )}

            <View style={styles.footerStyle}>
              <TouchableOpacity style={{ flex: 1 }} onPress={this.onLike}>
                <FullGradient
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: Scale.getSize(10),
                    borderRadius: 25
                  }}
                >
                  <Text style={styles.txtButtonLeft}>{'Quan tâm'}</Text>
                </FullGradient>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }} onPress={this.onDislike}>
                <View style={styles.buttonRight}>
                  <Text style={styles.txtButtonRight}>{'Không quan tâm'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </GenericModal>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapBigBox: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: Scale.getSize(15),
    justifyContent: 'center',
    width: platform.deviceWidth
  },
  genericStyle: {
    padding: Scale.getSize(25)
  },
  titlePromotion: {
    width: '100%',
    textAlign: 'center',
    fontSize: Scale.getSize(17),
    fontWeight: '700',
    paddingBottom: Scale.getSize(15)
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH
  },
  contentPromotion: {
    paddingVertical: Scale.getSize(15),
    fontWeight: '100',
    fontSize: Scale.getSize(12),
    color: 'rgb(82,82,82)'
  },
  subContentPromotion: {
    fontWeight: '700',
    fontSize: Scale.getSize(14),
    color: platform.primaryOrange
  },
  imageIcon: {
    width: 20,
    height: 20
  },
  wrapIconExit: {
    alignItems: 'flex-end'
  },
  footerStyle: {
    flexDirection: 'row',
    paddingBottom: Scale.getSize(10),
    paddingTop: Scale.getSize(20)
  },
  // buttonLeft: {
  // flex: 1,
  // alignItems: 'center',
  // justifyContent: 'center',
  // borderColor: 'blue',
  // borderWidth: 2,
  // paddingVertical: Scale.getSize(8),
  // borderRadius: 25
  // },
  buttonRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(168,168,168)',
    borderWidth: 2,
    paddingVertical: Scale.getSize(10),
    marginLeft: Scale.getSize(7),
    borderRadius: 25,
    paddingHorizontal: Scale.getSize(10)
  },
  txtButtonLeft: {
    fontSize: Scale.getSize(16),
    fontWeight: '800',
    color: '#fff'
  },
  txtButtonRight: {
    fontSize: Scale.getSize(16),
    fontWeight: '800',
    color: 'rgb(168,168,168)'
  }
});
