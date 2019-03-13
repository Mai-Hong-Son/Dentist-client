import React from 'react';
// import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import I18n from 'react-native-i18n';
// import * as commonActions from '../../store/actions/common';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';

import GenericModal from '../../components/GenericModal';
import FlatlistScroll from '../../components/FlatlistScroll';
import AskButton from '../../components/AskButton';
import { findScreenById } from '../../route';
import { styles } from './styles';
import platform from '../../theme/variables/platform';
import Scale from '../../utils/Scale';
import NavigationEvent from '../../NavigationEvent';

const myschedule = [
  {
    date: '30 tháng 7, 2018',
    time: '03:00 PM',
    image:
      'https://scontent.fhan2-4.fna.fbcdn.net/v/t31.0-8/18077105_137490696790657_7981059525501176301_o.jpg?_nc_cat=0&oh=e4542031cfb2eebcfc7c32df332a3032&oe=5C0DE13D',
    score: 5,
    name: 'Niềng răng',
    code: '#HR2018',
    dentist: 'Nguyễn Huy Hoàng'
  },
  {
    date: '30 tháng 7, 2018',
    time: '11:00 PM',
    image:
      'https://scontent.fhan2-4.fna.fbcdn.net/v/t31.0-8/18077105_137490696790657_7981059525501176301_o.jpg?_nc_cat=0&oh=e4542031cfb2eebcfc7c32df332a3032&oe=5C0DE13D',
    score: 5,
    name: 'Hàn răng',
    code: '#HR2018',
    dentist: 'Nguyễn Huy Hoàng'
  },
  {
    date: '30 tháng 7, 2018',
    time: '10:00 PM',
    image:
      'https://scontent.fhan2-4.fna.fbcdn.net/v/t31.0-8/18077105_137490696790657_7981059525501176301_o.jpg?_nc_cat=0&oh=e4542031cfb2eebcfc7c32df332a3032&oe=5C0DE13D',
    score: 5,
    name: 'Niềng răng',
    code: '#HR2018',
    dentist: 'Nguyễn Huy Hoàng'
  },
  {
    date: '30 tháng 7, 2018',
    time: '10:00 PM',
    image:
      'https://scontent.fhan2-4.fna.fbcdn.net/v/t31.0-8/18077105_137490696790657_7981059525501176301_o.jpg?_nc_cat=0&oh=e4542031cfb2eebcfc7c32df332a3032&oe=5C0DE13D',
    score: 5,
    name: 'Niềng răng',
    code: '#HR2018',
    dentist: 'Nguyễn Huy Hoàng'
  },
  {
    date: '30 tháng 7, 2018',
    time: '10:00 PM',
    image:
      'https://scontent.fhan2-4.fna.fbcdn.net/v/t31.0-8/18077105_137490696790657_7981059525501176301_o.jpg?_nc_cat=0&oh=e4542031cfb2eebcfc7c32df332a3032&oe=5C0DE13D',
    score: 5,
    name: 'Niềng răng',
    code: '#HR2018',
    dentist: 'Nguyễn Huy Hoàng'
  },
  {
    date: '30 tháng 7, 2018',
    time: '10:00 PM',
    image:
      'https://i.pinimg.com/originals/a2/31/05/a2310567d6b52482d7063204b72ebc92.png',
    score: 5,
    name: 'Niềng răng',
    code: '#HR2018',
    dentist: 'Nguyễn Huy Hoàng'
  },
  {
    date: '30 tháng 7, 2018',
    time: '10:00 PM',
    image:
      'https://i.pinimg.com/originals/a2/31/05/a2310567d6b52482d7063204b72ebc92.png',
    score: 5,
    name: 'Niềng răng',
    code: '#HR2018',
    dentist: 'Nguyễn Huy Hoàng'
  }
];

@connect(
  null,
  dispatch => ({ dispatch })
)
export default class MySchedule extends React.PureComponent {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      loading: true
    };
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);
    }
  }

  onPress = () => {
    this.props.navigator.push({
      screen: findScreenById('booking'),
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  };

  renderUpComing = ({ item, index }) => (
    <GenericModal key={index} style={styles.itemScroll}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <View style={styles.image}>
        <Image source={{ uri: item.image }} style={styles.scaleImage} />
      </View>
      <StarRating
        disabled
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        containerStyle={{ paddingTop: 5 }}
        maxStars={5}
        rating={item.score}
        fullStarColor={platform.primaryOrange}
        starSize={Scale.getSize(11)}
      />
      <Text numberOfLines={1} style={styles.name}>
        {item.name.toUpperCase()}
      </Text>
      <Text style={styles.code}>{item.code}</Text>
      <Text style={styles.titleDentist}>{'Nha sỹ'}</Text>
      <Text style={styles.dentist}>{item.dentist}</Text>
    </GenericModal>
  );

  renderList() {
    if (myschedule.length === 0) {
      return (
        <GenericModal style={styles.itemEmty}>
          <Text style={styles.txtEmty}>
            {I18n.t('schedule.empty_reservation')}
          </Text>
        </GenericModal>
      );
    }
    return (
      <FlatlistScroll
        contentContainerStyle={styles.contentContainerStyle}
        data={myschedule}
        numColumns={2}
        numItemOnScreen={2}
        _itemRender={this.renderUpComing}
      />
    );
  }

  render() {
    // if (this.state.loading) {
    //   return (
    //     <View
    //       style={[
    //         styles.container,
    //         { justifyContent: 'center', alignItems: 'center' }
    //       ]}
    //     >
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }

    return (
      <View style={styles.container}>
        {/* <GenericModal style={styles.contentTop} />
        <View style={styles.contentMiddle}>
          <Text style={styles.title}>{I18n.t('schedule.up_coming')}</Text>
        </View>
        <View style={styles.wrapFlatlistScroll}>{this.renderList()}</View>
        <View style={styles.contentBottom}>
          <AskButton
            caption={I18n.t('schedule.title_btnreservation')}
            onPress={() => this.onPress()}
          />
        </View> */}
        <Image
          style={{ height: Scale.getSize(200), width: Scale.getSize(200) }}
          source={require('../../assets/images/working.gif')}
        />
        <Text style={{ fontSize: Scale.getSize(16), fontWeight: '700', color: platform.primaryOrange, paddingTop: Scale.getSize(7) }}>{'Tính năng đang phát triển'}</Text>
        <Text style={{ fontSize: Scale.getSize(16), fontWeight: '700', color: platform.primaryOrange, paddingTop: Scale.getSize(7) }}>{'Mời bạn quay lại sau.'}</Text>
      </View>
    );
  }
}
