import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectsActions from '../../store/ducks/projects';
import MembersActions from '../../store/ducks/members';

import Button from '../../styles/components/Button';
import Members from '../Members';
import Modal from '../Modal';
import Can from '../Can';

import { Container, Project } from './styles';

function Projects( props ) {
    const [ newProject, setNewProject ] = useState('');
    const [ teamName, setTeamName ] = useState('');

    useEffect(() => {
        function handleProjects(){
           const { getProjectsRequest, activeTeam } = props;
           
           if(activeTeam) getProjectsRequest();
           
           setTeamName(activeTeam.name)
            
        }

        handleProjects();
    },[]);

    function handleCreateProject (e) {
        e.preventDefault();

        const { createProjectRequest } = props;

        createProjectRequest(newProject);
    }


    return (
        <Container>
            <header>
                <h1>{teamName}</h1>
                <div>
                    <Can checkPermission="projects_create">
                         <Button onClick={props.openProjectModal}> + NOVO </Button>
                    </Can>
                    <Button onClick={props.openMembersModal}> MEMBROS </Button>
                </div>
            </header>

            {
                
                props.projects.data.map(project => (
                    <Project key={project.id}>
                            <p>{project.title}</p>
                    </Project>
                )) 
            }

            {
                props.projects.projectModalOpen && (
                    <Modal>
                        <h1>Criar projects</h1>
                        
                        <form onSubmit={handleCreateProject}>
                            <span>NOME</span>

                            <input 
                                type="text" 
                                value={newProject}
                                onChange = { (e) => setNewProject(e.target.value) }
                            />

                            <Button size="big" type="submit">
                                Salvar
                            </Button>

                            <Button 
                                size="small" 
                                color="gray" 
                                type="button" 
                                onClick={props.closeProjectModal}
                            >
                                Cancelar
                            </Button>
                        </form >
                    </Modal>
                )
            }

            {
                props.members.membersModalOpen && <Members />
            }
       
        </Container>
    );
}

const mapStateToProps = state => ({
    activeTeam: state.teams.active,
    members: state.members,
    projects: state.projects,
})

const mapDispatchToProps = dispatch => bindActionCreators({...ProjectsActions,  ...MembersActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

