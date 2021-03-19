import { combineReducers } from 'redux'
import auth from './auth/reducers';
import common from './common/reducers';

const rootReducer = combineReducers({
        auth,
        common
});

export default rootReducer