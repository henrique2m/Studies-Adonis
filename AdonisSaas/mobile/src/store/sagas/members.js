import {call, put} from 'redux-saga/effects';
import {ToastActionsCreators} from 'react-native-redux-toast';

import api from '../../services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({id, roles}) {
  try {
    yield call(api.put, `members/${id}`, {roles: roles.map((role) => role.id)});

    yield call(ToastActionsCreators.displayInfo('Membro atualizado.'));
  } catch (error) {
    yield call(
      ToastActionsCreators.displayError('Erro ao tentar  atualizar o membro.'),
    );
  }
}

export function* inviteMember({email}) {
  try {
    yield call(api.post, 'invites', {invites: [email]});

    yield call(ToastActionsCreators.displayInfo('Convite realizado.'));
  } catch (error) {
    yield call(
      ToastActionsCreators.displayError('Error ao tentar realizar o convite.'),
    );
  }
}
