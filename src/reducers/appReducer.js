import React from 'react';

import {
    PAGE_META_REQUEST,
    PAGE_META_SUCCESS,
    PAGE_META_FAILURE,
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAILURE,
    ELEMENT_SELECTED,
    ELEMENT_ADDED
} from '../actions/types';

import { ElementHelper } from '../util/ElementHelper';

const initialState = {
    isLoading: true,
    isEditing: false,
    error: null,
    pageMetas: [],
    pageData: {},
    renderableElements: [],
    activeElement: {
        id: '',
        attributes: {

        },
        styles: {

        },
        innerHTML: null
    }
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
                renderableElements: ElementHelper.createElements(action.payload),
                activeElement: initialState.activeElement
            }
        case PAGE_FAILURE:
            console.log('PAGE_FAILURE');
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case ELEMENT_SELECTED:
            console.log('ELEMENT_SELECTED');
            return {
                ...state,
                activeElement: action.payload
            }
        case ELEMENT_ADDED:
            let type = action.payload;
            // TODO this element needs to be wrapped so that we can edit later!
            let element = ElementHelper.createElementFromType(type);
            let elements = [...state.renderableElements];
            elements.push(element);
            return {
                ...state,
                renderableElements: elements
            }
        default:
            return state;
    }
}