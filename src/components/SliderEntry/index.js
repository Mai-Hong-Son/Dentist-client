import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './styles';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const { data: { illustration }, parallax, parallaxProps, even } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  }

  render() {
    const { data: { title, subtitle }, even } = this.props;

    const uppercaseTitle = title ? (
      <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => alert(`You've clicked '${title}'`)}
      >
        <View style={styles.shadow} />
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : styles.imageContainerOdd
          ]}
        >
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : styles.imageContainerOdd]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : styles.imageContainerOdd]}
        >
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : styles.imageContainerOdd]}
            numberOfLines={2}
          >
            {I18n.t('product.price', { price: subtitle })}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
