import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import GenericModal from '../GenericModal';
import platform from '../../theme/variables/platform';
import Scale from '../../utils/Scale';

const ICON_SIZE = Scale.getSize(16);

export default class ConsultingHistoryItem extends React.PureComponent {
  static propTypes = {
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingVertical: PropTypes.number,
    day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    code: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    reason: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static defaultProps = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    day: 0,
    month: 0,
    label: '',
    code: '',
    reason: ''
  };

  render = () => {
    const { status } = this.props;

    return (
      <View
        style={{
          paddingVertical: this.props.paddingVertical,
          paddingTop: this.props.paddingTop,
          paddingBottom: this.props.paddingBottom
        }}
      >
        <View style={[{ height: this._itemHeight }]}>
          <GenericModal style={styles.container} borderWidth={1}>
            <View style={styles.leftPartContainer}>
              <View style={styles.dateContainer}>
                <Text style={styles.monthText}>{`Tháng ${this.props.month}`}</Text>
                <Text style={styles.dayText}>{`${this.props.day}`}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.contentContainer}>
                <View style={styles.firstLineContainer}>
                  <Text style={styles.labelText}>{`${this.props.label}`}</Text>
                </View>
                <View style={styles.secondLineContainer}>
                  <Text style={styles.reasonText}>{`${this.props.reason.toUpperCase()}`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.arrowContainer}>
              <Icon name="ios-arrow-forward" color={platform.primaryOrange} size={ICON_SIZE} />
            </View>
          </GenericModal>
          <View style={styles.expandedContainerBackground}>
            <GenericModal
              borderTopLeftRadius={Scale.getSize(20)}
              borderTopRightRadius={Scale.getSize(20)}
              borderBottomLeftRadius={Scale.getSize(20)}
              borderBottomRightRadius={Scale.getSize(20)}
              borderWidth={status === 1 ? 0 : 1}
              backgroundColor={
                status === 1
                  ? [platform.primaryOrange, platform.primaryOrange]
                  : [platform.containerBg, platform.containerBg]
              }
              style={styles.expandedContainer}
            />
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: Scale.getSize(20)
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: Scale.getSize(20),
    paddingRight: Scale.getSize(10),
    paddingVertical: Scale.getSize(14),
    zIndex: 1
  },

  leftPartContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  separator: {
    width: Scale.getSize(1),
    height: Scale.getSize(50),
    borderRadius: Scale.getSize(1),
    backgroundColor: platform.primaryOrange,
    marginHorizontal: Scale.getSize(17)
  },

  contentContainer: {},

  monthText: {
    fontSize: Scale.getSize(12),
    fontWeight: '700',
    marginBottom: Scale.getSize(5),
    color: '#333'
  },

  dayText: {
    fontSize: Scale.getSize(23),
    fontWeight: '400',
    color: '#333'
  },

  firstLineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Scale.getSize(5)
  },

  labelText: {
    fontWeight: '800',
    fontSize: Scale.getSize(16),
    marginRight: Scale.getSize(3),
    color: '#333'
  },

  codeText: {
    fontSize: Scale.getSize(12),
    fontWeight: '400',
    color: '#555'
  },

  reasonText: {
    fontSize: Scale.getSize(14),
    fontWeight: '700',
    color: '#999'
  },

  secondLineContainer: {},

  arrowContainer: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(20),
    justifyContent: 'center'
  },

  expandedContainerBackground: {
    paddingHorizontal: Scale.getSize(10)
  },

  expandedContainer: {
    height: Scale.getSize(15),
    transform: [{ translateY: -Scale.getSize(4) }]
  }
});
