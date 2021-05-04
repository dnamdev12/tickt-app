import { combineReducers } from 'redux'
import auth from './auth/reducers';
import common from './common/reducers';
import homeSearch from './homeSearch/reducers';
import jobs from './jobs/reducers';

const rootReducer = combineReducers({
        auth,
        common,
        homeSearch,
        jobs
});

export default rootReducer