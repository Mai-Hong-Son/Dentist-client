import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import { promotionDetail } from '../../../store/actions/promotion';
import GenericModal from '../../../components/GenericModal';
import SafeArea from '../../../components/SafeArea';
import images from '../../../assets/images';
import Scale from '../../../utils/Scale';
import platform from '../../../theme/variables/platform';
import NavigationEvent from '../../../NavigationEvent';

const IMAGE_WIDTH = platform.deviceWidth - Scale.getSize(80);
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.75;

@connect(
  null,
  dispatch => ({
    dispatch
    // promotionDetail: (...args) => dispatch(promotionDetail(...args)),
  })
)
export default class PromotionDetail extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
        needRefresh: true,
        dataDetail: null
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setTitle({ title: 'Chi tiết khuyến mại' });

    this.state = {
      needRefresh: true,
      id: null,
      dataDetail: {}
    };
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);
    }

    switch (event.id) {
      case 'willAppear':
        this.fetchData();
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

  onLinking = link => {
    Linking.openURL(link);
  };

  fetchData() {
    this.props.dispatch(
      promotionDetail(this.state.id, (error, data) => {
        if (!!this.props.openLink && this.props.openLink && data.link !== null) {
          this.onLinking(data.link);
          return;
        }

        this.setState({
          dataDetail: data,
          needRefresh: false
        });
      })
    );
  }

  render() {
    if (!this.state.dataDetail) {
      return <ActivityIndicator />;
    }

    const {
      dataDetail: { title, content, link, image }
    } = this.state;

    return (
      <SafeArea>
        <View style={styles.container}>
          <GenericModal>
            <ScrollView contentContainerStyle={styles.genericStyle}>
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
                <Text numberOfLines={3} style={styles.subContentPromotion}>
                  {'Xem thêm...'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </GenericModal>
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Scale.getSize(15),
    paddingTop: Scale.getSize(15)
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
  }
});
