import { combineReducers } from 'redux';

import metaReducer from './metaReducer';
import pageReducer from './pageReducer';

export default combineReducers({
    metas: metaReducer,
    pages: pageReducer
});