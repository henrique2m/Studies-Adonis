import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TemasActions from '../../store/ducks/teams';

import Icon from 'react-native-vector-icons/MaterialIcons';
import NewTeam from '../../components/NewTeam';

import styles from './styles';

function TeamSwitcher(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const {teams, selectTeam} = props;

  function toggleModal() {
    if (isModalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  useEffect(() => {
    const {getTeamsRequest} = props;

    getTeamsRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {teams.data.map((team) => (
        <TouchableOpacity
          key={team.id}
          style={styles.teamContainer}
          onPress={() => selectTeam(team)}
        >
          <Image
            style={styles.teamAvatar}
            source={{
              uri: `https://api.adorable.io/avatars/100/${team.name}`,
            }}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.newTeam} onPress={toggleModal}>
        <Icon name="add" size={24} color="#999" />
      </TouchableOpacity>

      <NewTeam visible={isModalOpen} onRequestClose={toggleModal} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  teams: state.teams,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(TemasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamSwitcher);
