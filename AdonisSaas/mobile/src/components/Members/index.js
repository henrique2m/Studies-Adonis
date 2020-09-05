import React, {useEffect, useState} from 'react';

import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MembersActions from '../../store/ducks/members';

import Icon from 'react-native-vector-icons/MaterialIcons';
import InviteMember from '../../components/InviteMember';
import RoleUpdater from '../RoleUpdater';
import styles from './styles';

function Members(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);

  useEffect(() => {
    function loadMembers() {
      const {getMembersRequest} = props;

      getMembersRequest();
    }

    loadMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleModal() {
    if (isModalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  function toggleModalRole(member) {
    if (isRoleModalOpen) {
      setRoleModalOpen(false);
    } else {
      setRoleModalOpen(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEMBROS</Text>

      <FlatList
        style={styles.memberList}
        data={props.members.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <View style={styles.memberContainer}>
            <Text style={styles.memberName}>{item.user.name}</Text>

            <TouchableOpacity
              hitSlop={{
                top: 5,
                bottom: 5,
                right: 5,
                left: 5,
              }}
              onPress={toggleModalRole}
            >
              <Icon name="settings" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}> NOVO </Text>
          </TouchableOpacity>
        )}
      />

      <InviteMember visible={isModalOpen} onRequestClose={toggleModal} />
      <RoleUpdater visible={isRoleModalOpen} onRequestClose={toggleModalRole} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  members: state.members,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
