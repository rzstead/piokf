import React from 'react';

import {
    PAGE_META_REQUEST,
    PAGE_META_SUCCESS,
    PAGE_META_FAILURE,
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAILURE,
    ELEMENT_SELECTED,
    ELEMENT_ADDED,
    ELEMENT_UPDATED,
    ROUTE_CHANGED
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
    },
    routeName: "Viewer"
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
            console.log('PAGE_SUCCESS => ' + JSON.stringify(action.payload));
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
            var type = action.payload;
            var placeholder = ElementHelper.createPlaceholder(type);
            console.log('created placeholder => ' + JSON.stringify(placeholder));
            var element = ElementHelper.createWrappedElement(type, placeholder);
            var elements = [...state.renderableElements];
            elements.push(element);

            return {
                ...state,
                renderableElements: elements
            }
        case ELEMENT_UPDATED:
            console.log('ELEMENT_UPDATED');
            var updatedElementData = action.payload;
            var updatedRenderableElement = ElementHelper.createElementFromType(updatedElementData.type, updatedElementData);
            var elements = [updatedRenderableElement];
            console.log('updatedElementData => ' + JSON.stringify(updatedElementData));
            return {
                ...state,
                activeElement: updatedElementData,
                renderableElements: elements
            }
        case ROUTE_CHANGED:
            return{
                ...state,
                routeName: action.payload
            }
        default:
            return state;
    }
}