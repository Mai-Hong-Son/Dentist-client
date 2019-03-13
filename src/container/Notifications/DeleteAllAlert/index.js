import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Scale from '../../../utils/Scale';

const AlertButton = ({ label, callback = () => {} }) => (
  <TouchableOpacity style={styles.button} onPress={callback} activeOpacity={0.7}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const DeleteAllAlert = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirmed,
  onCancelled,
  onDismiss
}) => (
  <TouchableWithoutFeedback onPress={onDismiss}>
    <View style={styles.background}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{description}</Text>
          </View>
          <View style={styles.buttonRow}>
            <AlertButton label={cancelLabel} callback={onCancelled} />
            <AlertButton label={confirmLabel} callback={onConfirmed} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    width: Scale.getSize(300),
    height: Scale.getSize(200),
    backgroundColor: 'white',
    borderRadius: Scale.getSize(3)
  },

  titleContainer: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(20)
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Scale.getSize(20)
  },

  title: {
    fontSize: Scale.getSize(20)
  },

  text: {
    fontSize: Scale.getSize(14),
    fontWeight: Scale.getFontWeight('400')
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  button: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(20)
  },

  buttonText: {
    fontSize: Scale.getSize(14),
    fontWeight: Scale.getFontWeight('500'),
    color: 'rgb(97,167,157)'
  }
});

export default DeleteAllAlert;
