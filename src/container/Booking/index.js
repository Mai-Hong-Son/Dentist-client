import React from 'react';
// import { connect } from 'react-redux';
import { View, Text } from 'react-native';
// import I18n from 'react-native-i18n';
// import * as commonActions from '../../store/actions/common';
import Icon from 'react-native-vector-icons/Ionicons';

import OptionButton from '../../components/OptionButton';
import EmptyDentist from './Content/EmptyDentist';
import DataDentist from './Content/DataDentist';
import FlatlistScroll from '../../components/FlatlistScroll';
import SafeArea from '../../components/SafeArea';
import { ProgressIndicator } from '../Consulting/Common/Elements/ProgressIndicator';
import { styles } from './styles';

const dentistType = [
  {
    name: 'Niềng răng',
    type: 'nr',
    dentist: [
      {
        name: 'Ns. Nguyễn Huy Hoàng',
        score: 5,
        degree: 'ĐH Y Hà Nội',
        image: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t31.0-8/18077105_137490696790657_7981059525501176301_o.jpg?_nc_cat=0&oh=e4542031cfb2eebcfc7c32df332a3032&oe=5C0DE13D',
        experience: 10,
        success: 52,
        satisfied: '98%',
        profile: 'Rambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic type setting, remaining essentially unchanged.',
      },
      {
        name: 'Ns. Nguyễn Huy Hoàng',
        score: 5,
        degree: 'ĐH Y Hà Nội',
        image: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t31.0-8/18077105_137490696790657_7981059525501176301_o.jpg?_nc_cat=0&oh=e4542031cfb2eebcfc7c32df332a3032&oe=5C0DE13D',
        experience: 10,
        success: 52,
        satisfied: '98%',
        profile: 'Nothing'
      }
    ]
  },
  {
    name: 'Bọc sứ',
    type: 'bs',
    dentist: []
  },
  {
    name: 'Hàn răng',
    type: 'hr',
    dentist: []
  },
  {
    name: 'Nhổ răng',
    type: 'nhr',
    dentist: []
  },
  {
    name: 'Tẩy trắng',
    type: 'tr',
    dentist: []
  },
  {
    name: 'Tẩy trắng',
    type: 'tr',
    dentist: []
  },
  {
    name: 'Tẩy trắng',
    type: 'tr',
    dentist: []
  },
  {
    name: 'Tẩy trắng',
    type: 'tr',
    dentist: []
  }
];

export default class Booking extends React.PureComponent {
  state = {
    selectingType: dentistType[0].type
  };

  onPress = type => {
    this.setState(
      {
        selectingType: type
      },
      () => this.renderProfileDentist()
    );
  };

  renderProfileDentist = () => {
    const { selectingType } = this.state;

    const dentists = dentistType.find(item => item.type === selectingType);

    if (dentists.dentist.length === 0) {
      return <EmptyDentist />;
    }

    return <DataDentist navigator={this.props.navigator} dentists={dentists} />;
  };

  renderOptionButton = ({ item: { name, type }, index }) => (
    <View key={index} style={styles.btnContainer}>
      <OptionButton
        caption={name}
        highlight={type === this.state.selectingType}
        onPress={() => this.onPress(type)}
        textStyle={styles.textStyleOBtn}
      />
      <View style={styles.helpStyle}>
        <Icon
          name={'ios-help-circle'}
          size={11}
          color={type === this.state.selectingType ? '#fff' : 'rgb(137,137,137)'}
        />
      </View>
    </View>
  );

  render() {
    const { selectingType } = this.state;

    return (
      <SafeArea>
        <View style={styles.container}>
          <ProgressIndicator percentage={25} />
          <Text style={styles.title}>{'Dịch vụ'}</Text>
          <FlatlistScroll
            contentContainerStyle={styles.contentContainerStyle}
            paginationStyle={styles.paginationStyle}
            data={dentistType}
            numColumns={3}
            numItemOnScreen={3}
            extraData={selectingType}
            _itemRender={this.renderOptionButton}
          />
          <View style={styles.contentBottom}>{this.renderProfileDentist()}</View>
        </View>
      </SafeArea>
    );
  }
}
