import React, {useEffect, useState} from 'react';

import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ProjectsActions from '../../store/ducks/projects';

import Icon from 'react-native-vector-icons/MaterialIcons';

import NewProject from '../../components/NewProject';

import styles from './styles';

function Projects(props) {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function loadProjects() {
      const {getProjectsRequest, activeTeam} = props;

      if (activeTeam) {
        getProjectsRequest();
      }
    }

    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleModal() {
    if (isModalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  if (!props.activeTeam) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.projectContainer}
        data={props.projects.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <View style={styles.projectContainer}>
            <Text style={styles.projectTitle}>{item.title}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.newProjectButton} onPress={toggleModal}>
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <NewProject visible={isModalOpen} onRequestClose={toggleModal} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  activeTeam: state.teams.active,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProjectsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
