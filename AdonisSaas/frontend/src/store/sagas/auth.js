import { call, put, select} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import AuthActions from '../ducks/auth';
import api from '../../services/api';
import history from '../../routes/history';

export function* signIn( { email, password}) {
    try {
        const response = yield call(api.post, 'sessions', { email, password });

        localStorage.setItem('Omni:token', response.data.token);

        yield put(AuthActions.signInSuccess(response.data.token));

        history.push('/');
      
    } catch (err) {
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Falha no login',
                message: 'Verifique seu e-mail e senha!',
            })
        )
    }
}

export function* signUp( {name, email, password}) {
    try {
        const response = yield call(api.post, 'users', { name, email, password });

        localStorage.setItem('Omni:token', response.data.token);

        yield put(AuthActions.signInSuccess(response.data.token));

        history.push('/');
      
    } catch (err) {
        yield put(
            toastrActions.add({
                type: 'error',
                title: 'Falha no cadastro',
                message: 'Você foi convidado para algum time?',
            })
        )
    }
}

export function signOut() {
    localStorage.removeItem('Omni:token');
    localStorage.removeItem('Omni:tema');

    history.push('/signin');
}

export function* getPermissions(){
    const team = yield select(state => state.teams.active);
    const signedIn = yield select(state => state.auth.signedIn);

    if(!signedIn || !team) return;

    const response = yield call(api.get, 'permissions');

    const { roles, permissions } = response.data;

    yield put(AuthActions.getPermissionsSuccess(roles, permissions))
}
