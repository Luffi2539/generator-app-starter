import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router/immutable';<% if (Firebase) { %>
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';<% } %>

// generic
import modals from './modals';
import routing from './routing';
import loading from './loading';
import fileUploaders from './fileUploaders';

export default (history) => combineReducers({
  form: formReducer,<% if (Firebase) { %>
  firebase: firebaseReducer,
  firestore: firestoreReducer,<% } %>
  // generic
  router: connectRouter(history),

  // routing,
  modals,
  loading,
  fileUploaders,
});
