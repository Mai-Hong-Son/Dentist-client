import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Image from 'react-native-fast-image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// import I18n from 'react-native-i18n';
import GenericModal from '../../components/GenericModal';
import SafeArea from '../../components/SafeArea';
// import Loading from '../../elements/Loading';
// import { setNavigator } from '../../App';
import NavigationEvent from '../../NavigationEvent';
import Scale from '../../utils/Scale';
import images from '../../assets/images';
import platform from '../../theme/variables/platform';
import { fetchServices } from '../../store/actions/service';
import { dispatchAsync } from '../../utils/common';
import withModal from '../../utils/withModal';

const ICON_SIZE = Scale.getSize(16);
const IMAGE_WIDTH = platform.deviceWidth * 0.92;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.75;
const ISSUE_CONTAINER_SIZE = Scale.getSize(145);
const IMAGE_SIZE = Scale.getSize(65);

@withModal()
@connect(
  null,
  dispatch => ({ dispatch, dispatchAsync: dispatchAsync(dispatch) })
)
export default class Home extends React.Component {
  static navigatorStyle = {
    tabBarHidden: false
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    loading: true,
    refreshing: false,
    services: null
  };

  componentDidMount() {
    this._loadServices(true);
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);
    }
  }

  _loadServices = ignoreLoadingTest => {
    if (this.state.loading && !ignoreLoadingTest) {
      return;
    }

    this.setState({ loading: true, error: false }, async () => {
      try {
        const { items } = await this.props.dispatchAsync(fetchServices());
        this.setState({
          loading: false,
          error: false,
          services: items.filter(e => !!e.active)
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  };

  register() {
    this.listener.register();
  }

  unregister() {
    if (this.listener) {
      this.listener.unregister();
      this.listener = null;
    }
  }

  _renderLoading = () => (
    <SafeArea>
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    </SafeArea>
  );

  _renderLoadingFinishedError = () => (
    <SafeArea>
      <TouchableOpacity activeOpacity={0.5} onPress={this._loadServices}>
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>
            {'Không tải được dữ liệu.\nHãy kiểm tra lại kết nối và ấn vào đây để thử lại.'}
          </Text>
          <SimpleLineIcons name="reload" size={Scale.getSize(30)} />
        </View>
      </TouchableOpacity>
    </SafeArea>
  );

  _renderLoadingFinished = () => (
    <SafeArea>
      <ScrollView style={styles.container}>
        <View style={styles.sectionNameLine}>
          <Text style={styles.sectionNameLineLeftText}>Khuyến mại</Text>
          <TouchableOpacity onPress={this._onSelectAllPromotions}>
            <View style={styles.wordPhrase}>
              <Text style={styles.sectionNameLineRightText}>Xem tất cả</Text>
              <Ionicons name="ios-arrow-forward" size={ICON_SIZE} style={styles.arrow} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={images.discount} resizeMode="contain" style={styles.offerImage} />
        </View>
        <View style={styles.sectionNameLine}>
          <Text style={styles.sectionNameLineLeftText}>Dịch vụ</Text>
          <TouchableOpacity onPress={this._onSelectAllServices}>
            <View style={styles.wordPhrase}>
              <Text style={styles.sectionNameLineRightText}>Xem tất cả</Text>
              <Ionicons name="ios-arrow-forward" size={ICON_SIZE} style={styles.arrow} />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollViewContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentContainer}
        >
          {this.state.services.map((service, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => this._onSelectService(service.id)}
            >
              <GenericModal
                backgroundColor={platform.primaryOrangeGradient}
                style={styles.issueContainer}
              >
                <Image
                  source={{ uri: service.image_url }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.serviceText}>{service.name}</Text>
              </GenericModal>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeArea>
  );

  _findElementById = (array, value) => array.find(item => item.id === value);

  _onSelectService = serviceId => {
    this.props.navigator.push({
      screen: 'ask',
      navigatorStyle: {
        tabBarHidden: true
      },
      title: 'Bạn cần tư vấn?',
      passProps: {
        services: [this._findElementById(this.state.services, serviceId)],
        selectedService: serviceId
      }
    });
  };

  _onSelectAllServices = () => {
    this.props.navigator.push({
      screen: 'ask',
      navigatorStyle: {
        tabBarHidden: true
      },
      title: 'Bạn cần tư vấn?'
    });
  };

  _onSelectAllPromotions = () => {
    this.props.navigator.push({
      screen: 'promotions',
      navigatorStyle: {
        tabBarHidden: true
      },
      title: 'Khuyến mại'
    });
  };

  render() {
    if (this.state.loading) {
      return this._renderLoading();
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
    backgroundColor: '#fafafa',
    paddingHorizontal: Scale.getSize(18)
  },

  sectionNameLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Scale.getSize(10)
  },

  imageContainer: {
    paddingVertical: Scale.getSize(10)
  },

  offerImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT
  },

  sectionNameLineLeftText: {
    fontSize: Scale.getSize(16),
    fontWeight: 'bold',
    color: '#333'
  },

  sectionNameLineRightText: {
    fontSize: Scale.getSize(12),
    fontWeight: 'bold',
    color: '#888',
    paddingRight: Scale.getSize(5)
  },

  wordPhrase: {
    flexDirection: 'row'
  },

  arrow: {
    color: '#888'
  },

  issueContainer: {
    width: ISSUE_CONTAINER_SIZE,
    height: ISSUE_CONTAINER_SIZE,
    alignItems: 'center',
    marginRight: Scale.getSize(15)
  },

  serviceText: {
    paddingTop: Scale.getSize(4),
    fontSize: Scale.getSize(14),
    fontWeight: '900',
    color: 'white'
  },

  scrollViewContainer: {
    marginHorizontal: Scale.getSize(-18),
    paddingLeft: Scale.getSize(18)
  },

  contentContainer: {
    paddingVertical: Scale.getSize(20),
    paddingRight: Scale.getSize(18)
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

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  }
});
