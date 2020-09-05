import React from 'react';

import {
  View,
  KeyboardAvoidingView,
  Modal as RNmodal,
  Platform,
} from 'react-native';
import styles from './styles';

const Modal = ({visible, children, onRequestClose}) => (
  <RNmodal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onRequestClose}
  >
    <KeyboardAvoidingView
      styles={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={styles.content}>{children}</View>
    </KeyboardAvoidingView>
  </RNmodal>
);

export default Modal;
