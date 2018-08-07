import { PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE, ELEMENT_ADDED_TO_PAGE } from '../actions/types';

const initialState = {
    isLoading: true,
    error: null,
    page: {
        elements: []
    }
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
        case ELEMENT_ADDED_TO_PAGE:
            console.log('pageReducer => ELEMENT_ADDED_TO_PAGE ==> TODO IMPLEMENT ME!!');
            let page = state.page;
            page.elements.push(action.payload);
            return {
                ...state,
                page: page
            }
        default:
            return state;
    }
}
