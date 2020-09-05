import React, {useState, useEffect} from 'react';

import api from '../../services/api';

import {View, Text, TouchableOpacity} from 'react-native';

import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';

import MembersActions from '../../store/ducks/members';

import Modal from '../Modal';

import styles from './styles';
import {Switch} from 'react-native-gesture-handler';

function RoleUpdater(props) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function loadRoles() {
      const response = await api.get('roles');
      console.log(response.data);

      setRoles(response.data);
    }

    loadRoles();
  }, []);

  if (roles === []) {
    return;
  }

  return (
    <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
      <View>
        {roles.map((role) => (
          <View key={role.id} style={styles.roleContainer}>
            <Text styles={styles.roleText}>{role.name}</Text>
            <Switch />
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={props.onRequestClose} style={styles.cancel}>
        <Text style={styles.cancelText}>Voltar</Text>
      </TouchableOpacity>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(MembersActions, dispatch);

export default connect(null, mapDispatchToProps)(RoleUpdater);
