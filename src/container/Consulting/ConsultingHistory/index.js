import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Image from 'react-native-fast-image';
// import moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import AskButton from '../../../components/AskButton';
import ConsultingHistoryItem from '../../../components/ConsultingHistoryItem';
import GenericModal from '../../../components/GenericModal';
import images from '../../../assets/images';
import { listQuestions } from '../../../store/actions/question';
import Scale from '../../../utils/Scale';
import SafeArea from '../../../components/SafeArea';
import NavigationEvent from '../../../NavigationEvent';

const PAGE_SIZE = 10;

const ITEM_VERTICAL_PADDING = 5;

const IMAGE_SIZE = Scale.getSize(80);

@connect(
  null,
  dispatch => ({
    dispatch,
    listQuestions: (...args) => dispatch(listQuestions(...args))
  })
)
export default class ConsultingHistory extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      loading: false,
      data: [],
      triedLoading: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  // componentDidMount = () => {

  // };

  page = 1;
  hasMore = true;

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);

      const { type, id } = event;

      if (type === 'ScreenChangedEvent') {
        if (id === 'willAppear') {
          this._refreshData();
        }
      }
    }
  }

  _refreshData = () => {
    if (this.state.refreshing || this.state.loading) {
      return;
    }

    const newState = { refreshing: true, error: false };

    if (!this.state.triedLoading) {
      newState.triedLoading = true;
    }

    this.page = 1;
    this.setState(newState, () => {
      this.props.listQuestions(
        {
          page: 1,
          page_size: PAGE_SIZE
        },
        (err, result = {}) => {
          let data = [];
          if (!err) {
            data = result.items;
            this.hasMore = result.items.length === PAGE_SIZE;
            this.setState({ refreshing: false, data });
          } else {
            this.setState({ refreshing: false, data, error: true });
          }
        }
      );
    });
  };

  _loadMore = () => {
    if (this.state.refreshing || this.state.loading || !this.hasMore) {
      return;
    }

    this.page += 1;
    this.setState({ loading: true }, () => {
      this.props.listQuestions(
        {
          page: this.page,
          page_size: PAGE_SIZE
        },
        (err, result = {}) => {
          let data = [...this.state.data];
          if (!err) {
            data = [...data, ...result.items];
            this.hasMore = result.items.length === PAGE_SIZE;
          }
          this.setState({ loading: false, data });
        }
      );
    });
  };

  _renderItem = ({
    item: {
      id,
      service: { name },
      service_issue: { title },
      created_at,
      status
    }
  }) => {
    const dateComponents = created_at.split('T')[0].split('-');
    const month = dateComponents[1];
    const day = dateComponents[2];
    const { navigator, findScreenById } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigator.push({
            screen: findScreenById('question_detail'),
            passProps: {
              id
            },
            navigatorStyle: {
              tabBarHidden: true
            }
            // navigatorStyle: {
            //   tabBarHidden: true,
            //   navBarCustomView: 'nav_bar',
            //   navBarCustomViewInitialProps: {
            //     date: moment(created_at).format('DD/MM/YYYY'),
            //     title: name,
            //     code: id
            //   }
            // }
          })
        }
      >
        <ConsultingHistoryItem
          paddingBottom={ITEM_VERTICAL_PADDING}
          key={id}
          month={month}
          day={day}
          label={name}
          reason={title}
          code={id}
          status={status}
        />
      </TouchableOpacity>
    );
  };

  _renderEmptyList = () => (
    <SafeArea>
      <View style={styles.container}>
        <View style={[styles.flatListContainer, styles.flatListContentContainer]}>
          <GenericModal style={styles.card}>
            <Image style={styles.image} source={images.history_empty} />
            <Text style={styles.modalTitle}>
              {'Chào mừng quý khách đến với\nHệ thống nha khoa tiết kiệm chi phí!'}
            </Text>
            <Text style={styles.modalSubtitle}>
              {
                'Nhằm mang tới cho quý khách hàng: giá, khuyến mại & lịch thanh toán tối ưu nhất, mời quý khách hàng gửi tình trạng răng chi của bạn.'
              }
            </Text>
          </GenericModal>
        </View>
        {this._renderAskButton()}
      </View>
    </SafeArea>
  );

  _renderErrorList = () => (
    <SafeArea>
      <View style={styles.container}>
        <View style={[styles.flatListContainer, styles.flatListContentContainer]}>
          <GenericModal style={styles.card}>
            <TouchableOpacity activeOpacity={0.5} onPress={this._refreshData}>
              <View style={styles.errorTextContainer}>
                <Text style={styles.errorText}>
                  {'Không tải được dữ liệu.\nHãy kiểm tra lại kết nối và ấn vào đây để thử lại.'}
                </Text>
                <SimpleLineIcons name="reload" size={Scale.getSize(30)} />
              </View>
            </TouchableOpacity>
          </GenericModal>
        </View>
        {this._renderAskButton()}
      </View>
    </SafeArea>
  );

  _renderAskButton = () => (
    <View style={styles.buttonContainer}>
      <AskButton
        caption="Đặt câu hỏi tư vấn"
        onPress={() => {
          this.props.navigator.push({
            screen: 'ask',
            navigatorStyle: {
              tabBarHidden: true
            },
            title: 'Bạn cần tư vấn?'
          });
        }}
      />
    </View>
  );

  render() {
    if (this.state.triedLoading && !this.state.refreshing && this.state.data.length === 0) {
      if (!this.state.error) {
        return this._renderEmptyList();
      }

      return this._renderErrorList();
    }

    return (
      <SafeArea>
        <View style={styles.container}>
          <View style={styles.flatListContainer}>
            <FlatList
              onRefresh={this._refreshData}
              onEndReached={this._loadMore}
              refreshing={this.state.refreshing}
              contentContainerStyle={styles.flatListContentContainer}
              data={this.state.data}
              renderItem={this._renderItem}
              ListFooterComponent={this.state.loading ? <ActivityIndicator /> : null}
            />
          </View>
          <View style={styles.buttonContainer}>
            <AskButton
              caption="Đặt câu hỏi tư vấn"
              onPress={() => {
                this.props.navigator.push({
                  screen: this.props.findScreenById('ask'),
                  navigatorStyle: {
                    tabBarHidden: true
                  },
                  title: 'Bạn cần tư vấn?'
                });
              }}
            />
          </View>
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },

  flatListContainer: {
    paddingVertical: Scale.getSize(15),
    flex: 1
  },

  flatListContentContainer: {
    paddingHorizontal: Scale.getSize(18)
  },

  buttonContainer: {
    paddingHorizontal: Scale.getSize(18),
    paddingBottom: Scale.getSize(25)
  },

  emptyListContainer: {
    flex: 1,
    paddingHorizontal: Scale.getSize(18),
    paddingTop: Scale.getSize(10),
    paddingBottom: Scale.getSize(25)
  },

  modalTitle: {
    fontSize: Scale.getSize(16),
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Scale.getSize(25)
  },

  modalSubtitle: {
    fontSize: Scale.getSize(12),
    paddingHorizontal: Scale.getSize(50),
    color: '#888',
    textAlign: 'center'
  },

  card: {
    flex: 1,
    paddingHorizontal: Scale.getSize(15),
    marginBottom: Scale.getSize(20),
    alignItems: 'center'
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
    height: IMAGE_SIZE,
    marginBottom: Scale.getSize(25)
  }
});
