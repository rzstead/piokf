import { PAGE_META_REQUEST, PAGE_META_SUCCESS, PAGE_META_FAILURE } from '../actions/types';

const initialState = {
    isLoading: true,
    error: null,
    pageMetas: []
}


export default function(state = initialState, action) {
    switch (action.type) {
        case PAGE_META_REQUEST:
            console.log('metaReducer => PAGE_META_REQUEST');
            return {
                ...state,
                isLoading: true
            }
        case PAGE_META_SUCCESS:
            console.log('metaReducer => PAGE_META_SUCCESS');
            return {
                ...state,
                isLoading: false,
                pageMetas: action.payload
            }
        case PAGE_META_FAILURE:
            console.log('metaReducer => PAGE_META_FAILURE');
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}