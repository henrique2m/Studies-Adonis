import React, {useState} from 'react';

import {Text, TextInput, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from '../../components/Modal';
import ProjectsActions from '../../store/ducks/projects';

import styles from './styles';

function NewProject(props) {
  const [newProject, setNewProject] = useState('');

  function handleSubmit() {
    const {createProjectRequest, onRequestClose} = props;

    createProjectRequest(newProject);
    onRequestClose();
  }

  return (
    <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
      <Text style={styles.label}>TITULO</Text>

      <TextInput
        style={styles.input}
        autoFocus
        underlineColorAndroid="transparent"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        value={newProject}
        onChangeText={(text) => setNewProject(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>CRIAR PROJETO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancel} onPress={props.onRequestClose}>
        <Text style={styles.cancelText}>CANCELAR</Text>
      </TouchableOpacity>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProjectsActions, dispatch);

export default connect(null, mapDispatchToProps)(NewProject);
