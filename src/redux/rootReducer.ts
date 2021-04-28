import { combineReducers } from 'redux'
import auth from './auth/reducers';
import common from './common/reducers';
import homeSearch from './homeSearch/reducers';
import postjob from './postJob/reducers';

const rootReducer = combineReducers({
        auth,
        common,
        homeSearch,
        postjob
});

export default rootReducer