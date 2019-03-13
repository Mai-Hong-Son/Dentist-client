import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import { listPromotion } from '../../store/actions/promotion';
import GenericModal from '../../components/GenericModal';
import SafeArea from '../../components/SafeArea';
import Scale from '../../utils/Scale';
import NavigationEvent from '../../NavigationEvent';

@connect(
  null,
  dispatch => ({
    dispatch,
    listPromotion: (...args) => dispatch(listPromotion(...args))
  })
)
export default class Promotions extends React.PureComponent {
  constructor(props) {
    super(props);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      promotionData: [],
      refresh: true
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

  onRefresh = () => {
    this.props.listPromotion(null, (error, data) => {
      if (!error) {
        this.setState({
          promotionData: data.items,
          refresh: false
        });
      }
    });
  };

  onNavigateToDetail = item => {
    this.props.navigator.push({
      screen: 'promotion_detail',
      passProps: {
        id: item.id
      },
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  };

  renderItem = ({ item }) => {
    const { title, content, date_start } = item;

    return (
      <TouchableOpacity onPress={() => this.onNavigateToDetail(item)}>
        <View style={styles.containerItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.txtTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.txtContent} numberOfLines={1}>
              {content}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.txtDate}>{moment(date_start).format('DD/MM/YYYY')}</Text>
            <Icon name="ios-arrow-forward" color={'rgb(137,137,137)'} size={Scale.getSize(20)} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeArea>
        <View style={styles.container}>
          <GenericModal style={styles.genericStyle}>
            <FlatList
              data={this.state.promotionData}
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </GenericModal>
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale.getSize(15)
  },
  genericStyle: {
    flex: 1
  },
  contentContainerStyle: {
    padding: Scale.getSize(15)
  },
  containerItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(235,235,235)',
    flexDirection: 'row',
    paddingVertical: Scale.getSize(7),
    justifyContent: 'space-between'
  },
  txtTitle: {
    fontSize: Scale.getSize(15),
    fontWeight: '700',
    paddingBottom: Scale.getSize(8),
    color: 'rgb(91,91,91)'
  },
  txtContent: {
    fontSize: Scale.getSize(11),
    fontWeight: '600',
    color: 'rgb(91,91,91)'
  },
  txtDate: {
    fontSize: Scale.getSize(11),
    paddingBottom: Scale.getSize(8),
    fontWeight: '600',
    color: 'rgb(137,137,137)'
  }
});
