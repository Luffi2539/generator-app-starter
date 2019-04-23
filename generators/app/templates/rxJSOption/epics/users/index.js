import { ajax } from 'rxjs/ajax';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import { ofType } from 'redux-observable';

// action creators
const fetchUser = username => ({ type: 'FETCH_USER', payload: username });
const fetchUserFulfilled = payload => ({ type: 'FETCH_USER_FULFILLED', payload });
const fetchUserRejected = payload => ({ type: 'FETCH_USER_REJECTED', payload, error: true });
const cancelFetchUser = () => ({ type: 'FETCH_USER_CANCELLED' });

// epic
export const fetchUserEpic = action$ => action$.pipe(
  ofType('FETCH_USER'),
  mergeMap(action =>
    ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
      map(response => fetchUserFulfilled(response)),
      catchError(error => of({
        type: 'FETCH_USER_REJECTED',
        payload: error.xhr.response,
        error: true
      })),
      takeUntil(action$.pipe(
        ofType('FETCH_USER_CANCELLED')
      ))
    )
  )
);
