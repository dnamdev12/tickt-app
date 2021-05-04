import { all, call } from 'redux-saga/effects';
import auth from './auth/sagas';
import homeSearch from './homeSearch/sagas';
import postJob from './jobs/sagas';

export default function* rootSaga(): any {
    return yield all([
        call(auth),
        call(postJob),
        call(homeSearch),
    ])
}