import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '../../store/ducks/teams';
import AuthActions from '../../store/ducks/auth';


import Modal from '../Modal';
import Button from  '../../styles/components/Button';

import { Container, TeamList, Team, NewTeam, Logout } from './styles';

function TeamSwitcher(props) {
    const [newTeam, setNewTeam] = useState('');

    useEffect(() => {
        function handleTeams () {
            const { getTeamsRequest } = props;
            getTeamsRequest();
        }

        handleTeams();
    },[]);

    function handleTeamSelect (team) {
        const { selectTeam } = props;

        selectTeam(team);
    }

    function openTeamModal () {
        const { openTeamModal } = props;

         openTeamModal();

    }

    function handleCreateTeam (e) {
        e.preventDefault();
        
        const { createTeamRequest } = props;
        createTeamRequest(newTeam);
    }

    function logout(){
        const { signOut } = props;
        signOut();
    }

    return (
        <Container>
            <TeamList>
               {props.teams.data.map(team => (
                    <Team key={team.id} onClick={() => handleTeamSelect(team)}>
                        <img src={`https://api.adorable.io/avatars/50/${team.name}`} alt={team.name} />
                    </Team>
               ))} 

               <NewTeam onClick={() => openTeamModal()}>  NOVO  </NewTeam>
               {
                 props.teams.teamModalOpen && (
                     <Modal>
                         <h1>Criar time</h1> 
                         <form onSubmit={ handleCreateTeam }>
                             <span>NOME</span>
                             <input
                                type="text" 
                                name="newTeam"
                                value = {newTeam}
                                onChange = { (e) => setNewTeam( e.target.value ) }
                              />

                             <Button size="big" type="submit">
                                Salvar
                             </Button>

                             <Button 
                                onClick={props.closeTeamModal} 
                                size="small" 
                                color="gray"
                             >
                                Cancelar
                             </Button>
                         </form>
                     </Modal>
                 )
               } 

                             
            </TeamList> 

            <Logout onClick = { logout }> SAIR </Logout>  
        </Container>
    )
}

const mapStateToProps = state => ({
    teams: state.teams,
});

const mapDispatchToProps = dispatch => bindActionCreators({...TeamsActions, ...AuthActions}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(TeamSwitcher);