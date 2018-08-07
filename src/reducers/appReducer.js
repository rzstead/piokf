import {
    PAGE_META_REQUEST,
    PAGE_META_SUCCESS,
    PAGE_META_FAILURE,
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAILURE
} from '../actions/types';

const initialState = {
    isLoading: true,
    isEditing: false,
    error: null,
    pageMetas: [],
    pageData: {},
    renderableElements: [],
    activeElement: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PAGE_META_REQUEST:
            console.log('PAGE_META_REQUEST');
            return {
                ...state,
                isLoading: true
            }
        case PAGE_META_SUCCESS:
            console.log('PAGE_META_SUCCESS');
            return {
                ...state,
                isLoading: false,
                pageMetas: action.payload,
            }
        case PAGE_META_FAILURE:
            console.log('PAGE_META_FAILURE');
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case PAGE_REQUEST:
            console.log('PAGE_REQUEST');
            return {
                ...state,
                isLoading: true
            }
        case PAGE_SUCCESS:
            console.log('PAGE_SUCCESS');
            return {
                ...state,
                isLoading: false,
                pageData: action.payload,
            }
        case PAGE_FAILURE:
            console.log('PAGE_FAILURE');
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}