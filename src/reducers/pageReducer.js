import { PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE } from '../actions/types';

const initialState = {
    isLoading: true,
    error: null,
    page: null
}


export default function(state = initialState, action) {
    switch (action.type) {
        case PAGE_REQUEST:
            console.log('pageReducer => PAGE_REQUEST');
            return {
                ...state,
                isLoading: true
            }
        case PAGE_SUCCESS:
            console.log('pageReducer => PAGE_SUCCESS');
            return {
                ...state,
                isLoading: false,
                page: action.payload
            }
        case PAGE_FAILURE:
            console.log('pageReducer => PAGE_FAILURE');
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}
