import React from 'react';

import { PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE, ELEMENT_ADDED_TO_PAGE, RENDERABLE_ELEMENTS_CREATED } from '../actions/types';

const initialState = {
    isLoading: true,
    error: null,
    page: {
        elements: [],
    },
    renderableElements: [
        <p>No elements loaded!</p>
    ]
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
            return {
                ...state,
                renderableElements: action.payload
            }
        case RENDERABLE_ELEMENTS_CREATED:
            console.log('pageReducer => RENDERABLE_ELEMENTS_CREATED');
            return {
                ...state,
                renderableElements: action.payload
            }
        default:
            return state;
    }
}
