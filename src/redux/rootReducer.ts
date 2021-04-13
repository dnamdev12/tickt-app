import { combineReducers } from 'redux'
import auth from './auth/reducers';
import common from './common/reducers';
import homeSearch from './homeSearch/reducers';

const rootReducer = combineReducers({
        auth,
        common,
        homeSearch,
});

export default rootReducer