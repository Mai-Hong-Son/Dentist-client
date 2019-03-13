import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import IssueOption from '../../../components/IssueOption';
import OptionButton from '../../../components/OptionButton';
import FlatlistScroll from '../../../components/FlatlistScroll';
import { FooterSection } from '../Common/Components/FooterSection';
import Scale from '../../../utils/Scale';
import SafeArea from '../../../components/SafeArea';
import { ProgressIndicator } from '../Common/Elements/ProgressIndicator';
import * as serviceActions from '../../../store/actions/service';

const COLUMN_NUMBER = 3;
const CONTAINER_HORIZONTAL_PADDING = 18;
const { width: WIDTH_SCREEN } = Dimensions.get('window');
const IMAGE_SIZE =
  (WIDTH_SCREEN - (COLUMN_NUMBER + 1) * CONTAINER_HORIZONTAL_PADDING) / COLUMN_NUMBER;

const OPTION_BUTTON_BORDER_RADIUS = Scale.getSize(12);
const ISSUE_OPTION_BORDER_RADIUS = Scale.getSize(15);

@connect(
  null,
  { ...serviceActions }
)
export default class Ask extends React.Component {
  state = {
    loadingServices: true,
    loadingIssues: false,
    services: null,
    issues: null,
    selectingServiceId: -1,
    selectingIssueId: -1
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount = () => {
    const { services, selectedService } = this.props;
    if (services) {
      this.setState({ loadingServices: false, services }, () => {
        this._selectService(selectedService);
      });
      return;
    }
    this._loadServices(true);
  };

  shouldComponentUpdate = () => false;

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
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

  _loadServices = ignoreLoadingServicesTest => {
    if (this.state.loadingServices && !ignoreLoadingServicesTest) {
      return;
    }
    this.setState({ loadingServices: true, error: false }, () => {
      this.props.fetchServices((error, data = {}) => {
        if (!error) {
          const services = (data.items || [{}]).filter(e => !!e.active);
          this.setState({ loadingServices: false, services }, () => {
            this._selectService(services[0].id);
          });
        } else {
          this.setState({ loadingServices: false, error: true }, () => {
            this.forceUpdate();
          });
        }
      });
    });
  };

  _loadServiceIssues = serviceId => {
    this.props.fetchServiceIssues(serviceId, (error, data = {}) => {
      let issues = null;
      let selectingIssueId = -1;

      if (!error) {
        issues = data.items || [{}];
        if (issues.length > 0) {
          selectingIssueId = issues[0].id;
        }
        this.setState({ issues, loadingIssues: false }, () => {
          this._selectIssue(selectingIssueId);
        });
      } else {
        this.setState({ loadingIssues: false, error: true }, () => {
          this.forceUpdate();
        });
      }
    });
  };

  _selectService(serviceId) {
    if (this.state.selectingServiceId === serviceId) {
      return;
    }
    this.setState({ selectingServiceId: serviceId, loadingIssues: true }, () => {
      this.forceUpdate();
    });

    this._loadServiceIssues(serviceId);
  }

  _selectIssue(issueId) {
    this.setState({ selectingIssueId: issueId }, () => {
      this.forceUpdate();
    });
  }

  _renderServiceButtonItem = ({ item: { id, name } }) => (
    <View key={id} style={styles.optionButtonContainer}>
      <OptionButton
        containerStyle={styles.optionBtnStyle}
        textStyle={styles.textOptionBtnStyle}
        borderRadius={OPTION_BUTTON_BORDER_RADIUS}
        caption={name}
        highlight={id === this.state.selectingServiceId}
        onPress={() => this._selectService(id)}
      />
    </View>
  );

  _findElementById = (array, value) => array.find(item => item.id === value);

  _renderIssueItem = ({ item: { id, title, image_url }, index }) => (
    <View key={index} style={styles.photoContainer}>
      <IssueOption
        key={index}
        name={title}
        icon={image_url}
        size={IMAGE_SIZE}
        borderRadius={ISSUE_OPTION_BORDER_RADIUS}
        selected={id === this.state.selectingIssueId}
        onPress={() => {
          this._selectIssue(id);
        }}
      />
    </View>
  );

  _renderIssues() {
    if (this.state.loadingIssues) {
      return <ActivityIndicator />;
    }

    const { issues } = this.state;
    if (!issues || issues.length === 0) {
      return null;
    }

    return (
      <FlatlistScroll
        contentContainerStyle={styles.contentContainerStyle}
        paginationStyle={styles.paginationStyle}
        data={issues}
        numColumns={3}
        numItemOnScreen={6}
        extraData={this.state.selectingIssueId}
        _itemRender={this._renderIssueItem}
      />
    );
  }

  _onNextPress = () => {
    const { navigator, findScreenById } = this.props;

    const issue = this._findElementById(this.state.issues, this.state.selectingIssueId);
    if (!issue) {
      return;
    }

    const { title, id } = this._findElementById(this.state.issues, this.state.selectingIssueId);

    navigator.push({
      screen: findScreenById('support_center'),
      title: 'Trung tâm trợ giúp',
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: {
        title,
        parentId: 0,
        serviceId: this.state.selectingServiceId,
        serviceIssueId: id
      }
    });
  };

  _renderLoadingServices = () => (
    <SafeArea>
      <View style={styles.container}>
        <ProgressIndicator percentage={33} />
        <ActivityIndicator />
      </View>
    </SafeArea>
  );

  _renderLoadingServicesFinishedError = () => (
    <SafeArea>
      <View style={styles.container}>
        <ProgressIndicator percentage={33} />
        <TouchableOpacity activeOpacity={0.5} onPress={this._loadServices}>
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorText}>
              {'Không tải được dữ liệu.\nHãy kiểm tra lại kết nối và ấn vào đây để thử lại.'}
            </Text>
            <SimpleLineIcons name="reload" size={Scale.getSize(30)} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );

  _renderLoadingServicesFinished = () => (
    <SafeArea>
      <View style={styles.container}>
        <ProgressIndicator percentage={33} />
        <Text style={styles.sectionHeaderText}>Dịch vụ</Text>
        <FlatlistScroll
          contentContainerStyle={styles.contentContainerStyleButton}
          paginationStyle={styles.paginationStyle}
          data={this.state.services}
          numColumns={3}
          numItemOnScreen={3}
          extraData={this.state.selectingServiceId}
          _itemRender={this._renderServiceButtonItem}
        />
        <View style={styles.lowerPart}>
          <Text style={styles.sectionHeaderText}>{'Vui lòng lựa chọn vấn đề về răng của bạn'}</Text>
          {/* <Text style={styles.sectionContentText}>{'Răng của bạn đang gặp phải vấn đề gì?'}</Text> */}
          {this._renderIssues()}
        </View>
        <View style={styles.wrapFooter}>
          <FooterSection hidePrevButton onNextPress={this._onNextPress} />
        </View>
      </View>
    </SafeArea>
  );

  render() {
    if (this.state.loadingServices) {
      return this._renderLoadingServices();
    }

    if (!this.state.services) {
      if (this.state.error) {
        return this._renderLoadingServicesFinishedError();
      }
      return null;
    }

    return this._renderLoadingServicesFinished();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: Scale.getSize(10),
    backgroundColor: '#FAFAFA',
    paddingVertical: Scale.getSize(10)
  },

  flatListContainer: {
    paddingVertical: Scale.getSize(10)
  },

  lowerPart: {
    paddingTop: Scale.getSize(20),
    flex: 1
    // paddingHorizontal: CONTAINER_HORIZONTAL_PADDING
  },

  sectionHeaderText: {
    fontWeight: '800',
    fontSize: Scale.getSize(17),
    color: '#333',
    paddingBottom: Scale.getSize(10),
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING
  },

  sectionContentText: {
    fontSize: Scale.getSize(14),
    color: '#AAA',
    marginBottom: Scale.getSize(30),
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING
  },

  wrapFooter: {
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING
  },

  servicesContainer: {
    flexDirection: 'row',
    paddingVertical: Scale.getSize(10)
  },

  optionButtonContainer: {
    paddingRight: Scale.getSize(18)
  },

  photosContainer: {
    flex: 1
  },

  contentContainerStyle: {
    paddingLeft: CONTAINER_HORIZONTAL_PADDING,
    paddingTop: CONTAINER_HORIZONTAL_PADDING,
    width: WIDTH_SCREEN
  },

  contentContainerStyleButton: {
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING,
    paddingVertical: Scale.getSize(10),
    width: WIDTH_SCREEN
  },

  photoContainer: {
    paddingRight: CONTAINER_HORIZONTAL_PADDING,
    paddingBottom: CONTAINER_HORIZONTAL_PADDING
  },

  optionBtnStyle: {
    paddingHorizontal: 0,
    paddingVertical: Scale.getSize(20)
  },

  textOptionBtnStyle: {
    width: IMAGE_SIZE,
    textAlign: 'center',
    fontSize: Scale.getSize(14),
    fontWeight: '800'
  },
  paginationStyle: {
    paddingVertical: Scale.getSize(5)
  },
  errorTextContainer: {
    alignItems: 'center'
  },

  errorText: {
    textAlign: 'center',
    marginBottom: Scale.getSize(14),
    fontWeight: '400',
    fontSize: Scale.getSize(15)
  }
});
