import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, Image, TouchableOpacity } from 'react-native';

import StarRating from 'react-native-star-rating';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/vi';

import GenericButton from '../../components/GenericButton';
import OptionButton from '../../components/OptionButton';
import GenericModal from '../../components/GenericModal';
import PagedScroll from '../../components/PagedScroll';
import FlatlistScroll from '../../components/FlatlistScroll';
import SafeArea from '../../components/SafeArea';
import { ProgressIndicator } from '../Consulting/Common/Elements/ProgressIndicator';
import { styles } from './styles';
import { findScreenById } from '../../route';
import Scale from '../../utils/Scale';

const timesSchedule = [
  {
    name: '9:00 AM'
  },
  {
    name: '10:00 AM'
  },
  {
    name: '11:00 AM'
  },
  {
    name: '11:00 AM'
  },
  {
    name: '11:00 AM'
  },
  {
    name: '11:00 AM'
  },
  {
    name: '11:00 AM'
  },
  {
    name: '11:00 AM'
  },
  {
    name: '11:00 AM'
  }
];

const ARROW_SIZE = Scale.getSize(20);
const STAR_RATING_WIDTH = Scale.getSize(90);

export default class ChooseDentist extends React.PureComponent {
  static propTypes = {
    dentist: PropTypes.object
  };

  state = {
    isDateTimePickerVisible: false,
    choosenDate: moment(Date.now())
      .locale('vi')
      .format('dddd, DD MMMM'),
    colorDateChoosen: 'rgb(82,82,82)',
    backgroundColor: ['#fff', '#fff', '#fff'],
    typeSelected: ''
  };

  onPress = name => {
    this.setState({
      typeSelected: name
    });
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({
      choosenDate: moment(date)
        .locale('vi')
        .format('dddd, DD MMMM'),
      backgroundColor: ['#FB9F28', '#FC872B', '#FE712F'],
      colorDateChoosen: '#fff'
    });
    this._hideDateTimePicker();
  };

  render() {
    const { dentist } = this.props;
    const { choosenDate, colorDateChoosen, backgroundColor, typeSelected } = this.state;
    const timeOptions = timesSchedule.map(({ name }, value) => (
      <View style={styles.wrapTimeButton} key={value}>
        <OptionButton
          containerStyle={styles.timeButtonContentContainer}
          caption={name}
          highlight={name === typeSelected}
          onPress={() => this.onPress(name)}
          textStyle={styles.textStyle}
        />
      </View>
    ));

    return (
      <SafeArea>
        <View style={styles.container}>
          <ProgressIndicator percentage={25} />
          <View style={styles.card}>
            <View style={styles.boxContentWithoutBookingButtonAndTimePicker}>
              <View style={styles.boxContentWithoutBookingButton}>
                <View style={styles.profileDentist}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: dentist.image }} style={styles.image} />
                  </View>
                  <View style={styles.profileContentRight}>
                    <Text style={styles.name}>{dentist.name}</Text>
                    <StarRating
                      disabled
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={dentist.score}
                      fullStarColor={'#FE712F'}
                      starSize={17}
                      containerStyle={{ width: STAR_RATING_WIDTH }}
                    />
                    <Text style={styles.degree}>{dentist.degree}</Text>
                  </View>
                </View>
                <View style={styles.wrapMiddleContent}>
                  <View style={styles.childMiddleContent}>
                    <AnimatedCircularProgress
                      size={55}
                      width={3}
                      fill={75}
                      tintColor="#ff7936"
                      backgroundColor="rgb(237,237,237)"
                    >
                      {() => <Text style={styles.txtExp}>{dentist.experience}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={styles.experienceTitle}>{'năm kinh nghiệm'}</Text>
                  </View>
                  <View style={styles.childMiddleContent}>
                    <AnimatedCircularProgress
                      size={55}
                      width={3}
                      fill={75}
                      tintColor="#ff7936"
                      backgroundColor="rgb(237,237,237)"
                    >
                      {() => <Text style={styles.txtExp}>{dentist.success}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={styles.experienceTitle}>{'ca thành công'}</Text>
                  </View>
                  <View style={styles.childMiddleContent}>
                    <AnimatedCircularProgress
                      size={55}
                      width={3}
                      fill={75}
                      tintColor="#ff7936"
                      backgroundColor="rgb(237,237,237)"
                    >
                      {() => <Text style={styles.txtExp}>{dentist.satisfied}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={styles.experienceTitle}>{'Hài lòng'}</Text>
                  </View>
                </View>
                <View style={styles.wrapDataContentBottom}>
                  <Text style={styles.titleProfile}>{'Hồ sơ'}</Text>
                  <Text style={styles.contentProfile}>{dentist.profile}</Text>
                </View>
                <View style={styles.wrapTimepicker}>
                  <View style={styles.wrapDateTime}>
                    <Text style={styles.titleSelectDate}>{'Chọn ngày'}</Text>
                    <View style={styles.datetimePickerContainer}>
                      <TouchableOpacity onPress={this._showDateTimePicker}>
                        <GenericModal
                          backgroundColor={backgroundColor}
                          style={styles.optionDateTime}
                        >
                          <Icon name="ios-arrow-back" size={ARROW_SIZE} color={colorDateChoosen} />
                          <Text style={[styles.dateTimeContent, { color: colorDateChoosen }]}>
                            {choosenDate}
                          </Text>
                          <Icon
                            name="ios-arrow-forward"
                            size={ARROW_SIZE}
                            color={colorDateChoosen}
                          />
                        </GenericModal>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.wrapSchedulePicker}>
                <Text style={styles.dateTimeContent}>{'Chọn thời gian'}</Text>
                <View style={styles.timeSelectorContainer}>
                  <PagedScroll
                    contentContainerStyle={styles.contentContainerStyle}
                    paginationStyle={styles.paginationStyle}
                    type="datetimepicker"
                    numberInScreen={3}
                  >
                    {timeOptions}
                  </PagedScroll>
                </View>
              </View>
            </View>
            <View style={styles.bookingButtonContainer}>
              <GenericButton
                onPress={() =>
                  this.props.navigator.push({
                    screen: findScreenById('booking_info')
                  })
                }
                caption={'Đặt lịch'}
                containerStyle={styles.bookingButtonContentContainer}
              />
            </View>
          </View>
        </View>
      </SafeArea>
    );
  }
}
