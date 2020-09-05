import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SideMenu from 'react-native-side-menu';

import TeamSwitcher from '../../components/TeamSwitcher';
import Projects from '../../components/Projects';
import Members from '../../components/Members';
import styles from './styles';

function Main(props) {
  const [menuLeftOpen, setMenuLeftOpen] = useState(false);
  const [menuRightOpen, setMenuRightOpen] = useState(false);

  function toggleLeftMenu() {
    if (menuLeftOpen) {
      setMenuLeftOpen(false);
    } else {
      setMenuLeftOpen(true);
    }
  }

  function toggleRightMenu() {
    if (menuRightOpen) {
      setMenuRightOpen(false);
    } else {
      setMenuRightOpen(true);
    }
  }

  return (
    <View style={styles.backgroundWrapper}>
      <SideMenu
        isOpen={menuLeftOpen}
        disableGestures
        onChange={toggleLeftMenu}
        openMenuOffset={70}
        menu={<TeamSwitcher />}
      >
        <SideMenu
          isOpen={menuRightOpen}
          disableGestures
          onChange={toggleRightMenu}
          openMenuOffset={285}
          menuPosition="right"
          menu={<Members />}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={{
                  top: 5,
                  bottom: 5,
                  left: 10,
                  right: 10,
                }}
                onPress={toggleLeftMenu}
              >
                <Icon name="menu" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.teamTitle}>
                {props.activeTeam ? props.activeTeam.name : 'Selecione um time'}
              </Text>
              <TouchableOpacity
                hitSlop={{
                  top: 5,
                  bottom: 5,
                  left: 10,
                  right: 10,
                }}
                onPress={toggleRightMenu}
              >
                <Icon name="group" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <Projects />
          </View>
        </SideMenu>
      </SideMenu>
    </View>
  );
}

const mapStateToProps = (state) => ({
  activeTeam: state.teams.active,
});

export default connect(mapStateToProps)(Main);
