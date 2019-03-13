import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import IssueDetailSelectButton from './IssueDetailSelectButton';
import IssueImageButton from './IssueImageButton';
import Scale from '../../../../utils/Scale';

export default class IssueItem extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onTitlePress: PropTypes.func,
    imageSources: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  };

  static defaultProps = {
    title: '',
    onTitlePress: null,
    imageSources: []
  };

  _onImagePress = source => {
    this.props.navigator.showLightBox({
      screen: 'image_viewer',
      style: {
        tapBackgroundToDismiss: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      },
      passProps: { source }
    });
  };

  render = () => (
    <View style={styles.container}>
      <IssueDetailSelectButton title={this.props.title} onPress={this.props.onTitlePress} />
      <ScrollView style={styles.issueImagesContainer} horizontal>
        {this.props.imageSources.map((source, index) => (
          <View key={index} style={styles.imageContainer}>
            <IssueImageButton source={source} onPress={() => this._onImagePress(source)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  issueImagesContainer: {
    flexDirection: 'row',
    paddingTop: Scale.getSize(5)
  },

  imageContainer: {
    paddingRight: Scale.getSize(10)
  }
});
