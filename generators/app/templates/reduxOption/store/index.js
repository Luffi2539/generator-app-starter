import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
<% if (!Saga && !rxJS) { %>import thunk from 'redux-thunk';<% } %>

// router
import history from './history';
import { routerMiddleware } from 'connected-react-router/immutable';

// middlewares
<% if (Saga) { %>import createSagaMiddleware from 'redux-saga';<% } %>
<% if (rxJS) { %>import { createEpicMiddleware } from 'redux-observable';<% } %>
import persistState from 'redux-localstorage';

//helpers
import getLocalStorageConfig from 'services/localstorage';
import rootReducer from 'reducers';
<% if (Saga) { %>import rootSaga from 'sagas';<% } %>
<% if (rxJS) { %>import { rootEpic } from 'epics/root';<% } %>

// constants
import LOCAL_STORAGE_CONFIG from 'constants/localstorage';

const initialState = Map();

const enhancers = [persistState(['token'], getLocalStorageConfig(LOCAL_STORAGE_CONFIG))];
<% if (Saga) { %>const sagaMiddleware = createSagaMiddleware();<% } %>
<% if (rxJS) { %>const epicMiddleware = createEpicMiddleware();<% } %>
const middleware = [
  routerMiddleware(history),
  <% if (Saga) { %>sagaMiddleware,<% } %>
  <% if (!Saga && !rxJS) { %>thunk,<% } %>
  <% if (rxJS) { %>epicMiddleware,<% } %>
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  installDevTools(Immutable);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer(history),
  initialState,
  composedEnhancers,
);

<% if (Saga) { %>sagaMiddleware.run(rootSaga);<% } %>
<% if (rxJS) { %>epicMiddleware.run(rootEpic);<% } %>
export default store;
