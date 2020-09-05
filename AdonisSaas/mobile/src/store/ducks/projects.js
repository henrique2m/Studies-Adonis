import {createReducer, createActions} from 'reduxsauce';

import immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  openProjectModal: null,
  closeProjectModal: null,
  createProjectRequest: ['title'],
  createProjectSuccess: ['projects'],
});

export const ProjectsTypes = Types;
export default Creators;

export const INITIAL_STATE = immutable({
  data: [],
  projectModalOpen: false,
});

export const success = (state, {data}) => state.merge({data});

export const openModal = (state) => state.merge({projectModalOpen: true});
export const closeModal = (state) => state.merge({projectModalOpen: false});

export const createSuccess = (state, {project}) =>
  state.merge({data: [...state.data, project]});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: success,
  [Types.OPEN_PROJECT_MODAL]: openModal,
  [Types.CLOSE_PROJECT_MODAL]: closeModal,
  [Types.CREATE_PROJECT_SUCCESS]: createSuccess,
});
