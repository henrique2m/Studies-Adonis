import { call, put } from 'redux-saga/effects';
import { actions as toastActions } from 'react-redux-toastr';
import api from '../../services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
    const response = yield call(api.get, 'members');

    yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
    try {
        yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id)});

        yield put(toastActions.add({
            type: 'success',
            title: 'Membro atualizado',
            message: 'O membro foi atualizado.',
        }));
    } catch (error) {
        yield put(toastActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'Houve um erro, tente novamente',
        }));
    }
}

export function* inviteMember( { email } ){
    try {
        yield call(api.post, 'invites', { invites: [email] });

        yield put(toastActions.add({
            type: 'success',
            title: 'Convite',
            message: 'convite Enviado com sucesso',
        }));
    } catch (error) {
        yield put(toastActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'Houve um erro, tente novamente',
        }));
    }
}
