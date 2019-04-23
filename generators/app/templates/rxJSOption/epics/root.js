import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { pingEpic } from './ping';
import { fetchUserEpic } from './users';

export const rootEpic = combineEpics(
  pingEpic,
  fetchUserEpic
);
