import {call, put} from 'redux-saga/effects';
import {ToastActionsCreators} from 'react-native-redux-toast';

import api from '../../services/api';

import ProjectsActions from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}

export function* createProject({title}) {
  try {
    const response = yield call(api.post, 'projects', {title});

    yield put(ProjectsActions.createProjectSuccess(response.data));
    yield put(ProjectsActions.closeProjectModal());
    yield call(ToastActionsCreators.displayInfo('Projeto criado com sucesso.'));
  } catch (err) {
    yield call(
      ToastActionsCreators.displayError('Não foi possível criar o projeto.'),
    );
  }
}
