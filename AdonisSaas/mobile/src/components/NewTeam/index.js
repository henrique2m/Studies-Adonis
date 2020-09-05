import React, {useState} from 'react';

import {Text, TextInput, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from '../../components/Modal';
import TeamActions from '../../store/ducks/teams';

import styles from './styles';

function NewTeam(props) {
  const [newTeam, setNewTeam] = useState('');

  function handleSubmit() {
    const {createTeamRequest, onRequestClose} = props;

    createTeamRequest(newTeam);
    onRequestClose();
  }

  return (
    <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
      <Text style={styles.label}>NOME</Text>

      <TextInput
        style={styles.input}
        autoFocus
        underlineColorAndroid="transparent"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        value={newTeam}
        onChangeText={(text) => setNewTeam(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>CRIAR TIME </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancel} onPress={props.onRequestClose}>
        <Text style={styles.cancelText}>CANCELAR</Text>
      </TouchableOpacity>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(TeamActions, dispatch);

export default connect(null, mapDispatchToProps)(NewTeam);
