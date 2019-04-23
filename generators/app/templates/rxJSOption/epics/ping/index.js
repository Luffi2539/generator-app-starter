import { filter, mapTo, delay } from 'rxjs/operators';

export const pingEpic = action$ => action$.pipe(
  filter(action => action.type === 'PING'),// also yo can use ofType operator from redux-observable (ofType('PING'));
  delay(1000),
  mapTo({ type: 'PONG' })
);
