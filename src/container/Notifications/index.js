import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
  Image
} from 'react-native';

import {
  listNotification,
  deleteNotification,
  deleteAllNotification
} from '../../store/actions/notification';
import platform from '../../theme/variables/platform';
import Scale from '../../utils/Scale';
import NotifItem from './NotifItem';
import images from '../../assets/images';
import NavigationEvent from '../../NavigationEvent';
import withModal from '../../utils/withModal';

@withModal()
@connect(
  null,
  dispatch => ({
    dispatch,
    listNotification: (...args) => dispatch(listNotification(...args)),
    deleteNotification: (...args) => dispatch(deleteNotification(...args)),
    deleteAllNotification: (...args) => dispatch(deleteAllNotification(...args))
  })
)
export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      data: [],
      animDelete: new Animated.Value(1),
      refresh: true,
      page: 1,
      isLoading: false,
      hasMore: true
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);
    }

    this.onRefresh();
  }

  onRefresh = () => {
    this.props.listNotification(1, (error, data) => {
      if (!error && data !== null) {
        this.setState({
          data: data.items,
          refresh: false
        });
      }
    });
  };

  onConfirmed = () => {
    Animated.timing(this.state.animDelete, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease
    }).start(() => {
      this.setState(
        {
          data: [],
          isLoading: false
        },
        () =>
          this.props.deleteAllNotification(null, error => {
            if (!error) {
              this.setState({
                animDelete: new Animated.Value(1)
              });
            }
          })
      );
    });
  };

  onDeleteAll = () => {
    this.props.modal.showAlert({
      title: 'Cảnh báo!',
      description: 'Bạn có muốn xoá hết thông báo?',
      buttons: [
        {
          label: 'Huỷ'
        },
        {
          label: 'Đồng ý',
          callback: this.onConfirmed
        }
      ]
    });
  };

  onDeleteOneItem = id => {
    const { data } = this.state;

    this.setState(
      {
        data: data.filter(item => item.id !== id)
      },
      () => this.props.deleteNotification(id)
    );
  };

  onLoadMoreData = () => {
    const { isLoading, refresh, hasMore } = this.state;

    if (isLoading || refresh || !hasMore) return;

    this.setState(
      {
        page: this.state.page + 1,
        isLoading: true
      },
      () => {
        this.props.listNotification(this.state.page, (error, data) => {
          if (!error && data !== null) {
            this.setState({
              data: [...this.state.data, ...data.items],
              isLoading: false,
              hasMore: data.items.length === data.limit
            });
          }
        });
      }
    );
  };

  renderItem = ({ item }) => {
    const {
      title,
      content,
      id,
      status,
      meta: { onesignal }
    } = item;
    const opacity = this.state.animDelete;

    return (
      <Animated.View
        style={{
          opacity
        }}
      >
        <NotifItem
          id={id}
          title={title}
          content={content}
          status={status}
          onesignal={onesignal}
          dispatch={this.props.dispatch}
          onDeleteOneItem={idDelete => this.onDeleteOneItem(idDelete)}
        />
      </Animated.View>
    );
  };

  render() {
    const { data, isLoadMore } = this.state;

    const emptyNotifView = (
      <View style={styles.wrapEmptyNotif}>
        <Image source={images.emptyNotif} resizeMode="cover" />
        <Text style={styles.bigTitleEmpty}>{'Bạn chưa có thông báo nào'}</Text>
        <Text style={styles.smallTitleEmpty}>{'Khi bạn đặt câu hỏi tư vấn hoặc đặt lịch,'}</Text>
        <Text style={styles.smallTitleEmpty}>{'kết quả của bạn sẽ được thông báo ở đây.'}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.wrapHeaderTitle}>
          <Text style={styles.txtHeaderTitle}>{'Danh sách thông báo'}</Text>
          <TouchableOpacity onPress={this.onDeleteAll}>
            <Text style={styles.txtClear}>{'Xóa hết'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data.reverse()}
          contentContainerStyle={styles.contentContainerStyle}
          refreshing={this.state.refresh}
          onEndReachedThreshold={platform.platform === 'ios' ? -1 : 0}
          onEndReached={this.onLoadMoreData}
          ListFooterComponent={isLoadMore ? <ActivityIndicator /> : null}
          ListEmptyComponent={emptyNotifView}
          onRefresh={this.onRefresh}
          renderItem={this.renderItem}
          extraData={this.state.data}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapHeaderTitle: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(235,235,235)',
    alignItems: 'flex-end',
    paddingBottom: 15,
    paddingLeft: Scale.getSize(30),
    paddingRight: Scale.getSize(15)
  },
  txtHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: platform.primaryOrange
  },
  txtClear: {
    color: 'rgb(82,82,82)',
    fontWeight: '700',
    fontSize: 12
  },
  contentContainerStyle: {
    paddingHorizontal: Scale.getSize(30)
  },
  wrapEmptyNotif: {
    flex: 1,
    paddingTop: Scale.getSize(120),
    alignItems: 'center'
  },
  bigTitleEmpty: {
    fontSize: Scale.getSize(18),
    paddingVertical: Scale.getSize(15),
    fontWeight: '700'
  },
  smallTitleEmpty: {
    fontSize: Scale.getSize(13),
    color: 'rgb(137,137,137)'
  }
});
