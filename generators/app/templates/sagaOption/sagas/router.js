import { LOCATION_CHANGE } from 'connected-react-router';
import { takeEvery, cancel, call, fork, take } from 'redux-saga/effects';

// constants
import * as Routes from 'constants/routing';

// view sagas
import home from './views/home';

// init
import initialize from './initialize';

const viewSagas = {
  [Routes.HOME]: home,
};

let task = null;

function* onchange(action) {
  const {
    hash,
    pathname,
    search,
  } = action.payload.location;

  if (task) {
    yield cancel(task);
  }

  if (pathname in viewSagas) {
    task = yield fork(viewSagas[pathname], search, hash);
  }
}

export default function* routerSaga() {
  const action = yield take(LOCATION_CHANGE);

  yield call(initialize);
  yield call(onchange, action);

  yield takeEvery(LOCATION_CHANGE, onchange);
}
