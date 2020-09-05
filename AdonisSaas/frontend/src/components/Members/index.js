import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import api from '../../services/api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MembersActions from '../../store/ducks/members';

import Modal from '../Modal';
import Button from '../../styles/components/Button';
import Can from '../Can';

import { MembersList, Invite} from './styles';

function Members (props) {
    const [roles, setRoles] = useState('');
    const [invite, setInvite] = useState('');

   useEffect(() => {
       function listMembers (){
           const { getMembersRequest } = props;

           getMembersRequest();
       }

       listMembers();
   },[]);

   useEffect( () => {
        async function listRoles() {
            const response = await api.get('roles');

            setRoles(response.data);
        }

        listRoles();
   },[])

   function handleRolesChange(id, roles){
       const { updateMemberRequest } = props;

       updateMemberRequest(id, roles);
   }

   function handleInvites(e) {
        e.preventDefault();

        const { inviteMemberRequest  } = props;
        
        inviteMemberRequest(invite);
   }

   return (
        <Modal size='big'>
            <h1>Members</h1>

            <Can checkPermission="invites_create">
                    <Invite onSubmit={handleInvites}>
                        <input  
                            name="invite"
                            placeholder="Convidar para time"
                            value={invite}
                            onChange={(e) => { setInvite(e.target.value)}}
                        />

                        <Button type="submit">
                            Enviar
                        </Button>
                    </Invite>
            </Can>
           

            <form>
                <MembersList>
                    {
                        props.members.data.map(member => (
                            <li key={member.id}>
                                <strong>{member.user.name}</strong>
                                <Can checkRole="administrador">
                                    {
                                        can => (
                                            <Select 
                                                isMulti
                                                options={roles}
                                                isDisabled={!can}
                                                value={member.roles}
                                                getOptionLabel={role => role.name}
                                                getOptionValue={role => role.id}
                                                onChange={ value => handleRolesChange(member.id, value)}
                                            />   
                                        )
                                    }
                                </Can>                                 
                            </li>
                        ))
                    }
                </MembersList>

                <Button onClick={props.closeMembersModal} filled={false} color="gray">
                  Cancelar
                </Button>
            </form>
        </Modal>
    )
}

const mapStateToProps = state => ({
    members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Members);