import React, {useState} from 'react';

import {Text, TextInput, TouchableOpacity} from 'react-native';

import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';

import MembersActions from '../../store/ducks/members';

import Modal from '../../components/Modal';

import styles from './styles';

function InviteMember(props) {
  const [email, setEmail] = useState('');

  function handleSubmit() {
    const {inviteMemberRequest, onRequestClose} = props;

    inviteMemberRequest(email);
    onRequestClose();
  }

  return (
    <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
      <Text style={styles.label}>E-MAIL</Text>

      <TextInput
        style={styles.input}
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        underlineColorAndroid="transparent"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>ENVIAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancel} onPress={props.onRequestClose}>
        <Text style={styles.cancelText}>CANCELAR</Text>
      </TouchableOpacity>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(MembersActions, dispatch);

export default connect(null, mapDispatchToProps)(InviteMember);
