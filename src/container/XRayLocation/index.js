import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import * as locationActions from '../../store/actions/location';
import GenericModal from '../../components/GenericModal';
import GenericButton from '../../components/GenericButton';
import { findScreenById } from '../../route';
import platform from '../../theme/variables/platform';
import Scale from '../../utils/Scale';

@connect(
  null,
  { ...locationActions }
)
export default class XRayLocation extends React.PureComponent {
  state = {
    titleButton: '',
    loadingXrayList: true,
    locations: [],
    xrayList: []
  };

  componentDidMount() {
    this.props.fetchLocationAdl1s((error, data = {}) => {
      const locations = data.items || [{}];

      this.setState({ locations, titleButton: locations[0].name });

      this.props.fetchXrayLocation(locations[0].id, (err, dt = {}) => {
        const xrayList = dt.items || [{}];

        this.setState({
          xrayList,
          loadingXrayList: false
        });
      });
    });
  }

  onSelect = () => {
    const { locations } = this.state;

    this.props.navigator.showLightBox({
      screen: findScreenById('item_picker'),
      passProps: {
        data: locations,
        itemSelected: item => {
          this.setState({
            loadingXrayList: true,
            titleButton: locations.find(x => x.id === item).name
          });

          this.props.fetchXrayLocation(item, (error, data = {}) => {
            const xrayList = data.items || [{}];

            this.setState({
              xrayList,
              loadingXrayList: false
            });
          });
        }
      }
    });
  };

  renderItem = ({ item, index }) => (
    <View style={styles.wrapItem}>
      <Text style={styles.txtTitle} numberOfLines={1}>{`${index + 1}. ${item.title}`}</Text>
      <View style={styles.bottomBoxItem}>
        <Text style={styles.txtAddress} numberOfLines={1}>
          {item.address}
        </Text>
        <Text style={styles.txtPricing} numberOfLines={1}>
          {item.pricing}
        </Text>
      </View>
    </View>
  );

  render() {
    const { titleButton, xrayList, loadingXrayList } = this.state;
    const xrayListContent = loadingXrayList ? (
      <ActivityIndicator size="small" />
    ) : (
      <FlatList
        data={xrayList}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );

    return (
      <View style={styles.container}>
        <View style={styles.wrapOptionLocation}>
          <Text style={styles.txtOptionLocation}>{'Danh sách TT X-Quang'}</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={this.onSelect}>
            <GenericModal
              style={styles.wrapButtonOption}
              backgroundColor={platform.primaryOrangeGradient}
              borderRadius={17}
            >
              <Text style={styles.txtValueLocation}>{titleButton}</Text>
              <View>
                <Icon name={'ios-arrow-up'} color="#fff" size={12} />
                <Icon name={'ios-arrow-down'} color="#fff" size={12} />
              </View>
            </GenericModal>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapGenericModal}>
          <GenericModal style={styles.wrapXrayListContent}>{xrayListContent}</GenericModal>
        </View>
        <View style={styles.wrapButtonBot}>
          <GenericButton
            onPress={() => null}
            caption={'Đã hiểu'}
            containerStyle={styles.containerStyle}
            textStyle={styles.textStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Scale.getSize(15),
    paddingBottom: Scale.getSize(25)
  },
  wrapOptionLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  txtOptionLocation: {
    fontSize: Scale.getSize(16),
    fontWeight: '700',
    color: 'rgb(82,82,82)'
  },
  txtValueLocation: {
    fontSize: Scale.getSize(16),
    fontWeight: '700',
    color: '#fff',
    paddingRight: Scale.getSize(35)
  },
  wrapButtonOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Scale.getSize(20),
    alignItems: 'center',
    paddingVertical: Scale.getSize(5)
  },
  wrapGenericModal: {
    paddingTop: Scale.getSize(15),
    paddingHorizontal: 15,
    paddingBottom: Scale.getSize(25),
    flex: 1
  },
  wrapXrayListContent: {
    paddingVertical: Scale.getSize(10)
  },
  contentContainerStyle: {
    paddingHorizontal: 15
  },
  wrapItem: {
    paddingVertical: Scale.getSize(10),
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237,237,237)'
  },
  bottomBoxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Scale.getSize(10)
  },
  txtTitle: {
    fontSize: Scale.getSize(14),
    fontWeight: '700',
    color: 'rgb(82,82,82)'
  },
  txtAddress: {
    fontSize: Scale.getSize(14),
    fontWeight: '100',
    color: 'rgb(82,82,82)'
  },
  txtPricing: {
    fontSize: Scale.getSize(14),
    fontWeight: '700',
    color: platform.primaryOrange
  },
  wrapButtonBot: {
    paddingHorizontal: platform.deviceWidth / 4
  },
  containerStyle: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  textStyle: {
    fontSize: Scale.getSize(17),
    color: '#fff',
    fontWeight: '800'
  }
});
