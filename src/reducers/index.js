import { combineReducers } from 'redux';

import metaReducer from './metaReducer';
import pageReducer from './pageReducer';
import elementReducer from './elementReducer';

export default combineReducers({
    metas: metaReducer,
    pages: pageReducer,
    elements: elementReducer
});