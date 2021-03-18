import { all, call } from 'redux-saga/effects';
import auth from './auth/sagas';

export default function* rootSaga(): any {
    return yield all([
        call(auth),
    ])
}