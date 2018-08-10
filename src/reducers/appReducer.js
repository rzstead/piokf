import React from 'react';

import {
    PAGE_META_REQUEST,
    PAGE_META_SUCCESS,
    PAGE_META_FAILURE,
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAILURE,
    SAVE_PAGE_REQUEST,
    SAVE_PAGE_SUCCESS,
    SAVE_PAGE_FAILURE,
    CREATE_CHILD_PAGE_REQUEST,
    CREATE_CHILD_PAGE_SUCCESS,
    CREATE_CHILD_PAGE_FAILURE,
    CREATE_PAGE_REQUEST,
    CREATE_PAGE_SUCCESS,
    CREATE_PAGE_FAILURE,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    ELEMENT_SELECTED,
    ELEMENT_ADDED,
    ELEMENT_UPDATED,
    ROUTE_CHANGED,
    ELEMENT_DELETED
} from '../actions/types';

import { ElementHelper } from '../util/ElementHelper';

const supportedStyles = ['backgroundColor', 'border', 'borderRadius', 'color', 'fontFamily', 'margin', 'padding'];

const initialState = {
    isLoading: true,
    isEditing: false,
    error: null,
    pageMetas: [],
    pageData: {
        elements: []
    },
    renderableElements: [],
    activeElement: {
        id: '',
        attributes: {

        },
        styles: {

        },
        innerHTML: null
    },
    availableStyles: supportedStyles,
    routeName: "Viewer",
    isAuthenticated: false,
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
            console.log(action.payload)
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
                renderableElements: ElementHelper.createElements(action.payload, state.isAuthenticated),
                activeElement: initialState.activeElement
            }
        case PAGE_FAILURE:
            console.log('PAGE_FAILURE');
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case SAVE_PAGE_REQUEST:
            console.log('SAVE_PAGE_REQUEST');
            return {
                ...state,
                isLoading: true
            }
        case SAVE_PAGE_SUCCESS:
            console.log('SAVE_PAGE_SUCCESS');
            return {
                ...state,
                isLoading: false,
                pageData: action.payload
            }
        case SAVE_PAGE_FAILURE:
            console.log('SAVE_PAGE_FAILURE => ' + action.error);
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
            var elementType = action.payload;
            var elementData = ElementHelper.createPlaceholder(elementType);
            elementData.id = state.pageData.elements.length;
            console.log('ELEMENT_ADDED => TYPE => ' + elementType + ' => DATA => ' + JSON.stringify(elementData));

            var pageData = {...state.pageData};
            pageData.elements.push(elementData);

            var renderableElements = [...state.renderableElements];
            var renderableElement = ElementHelper.createWrappedElement(elementType, elementData);
            renderableElements.push(renderableElement);

            return {
                ...state,
                pageData: pageData,
                renderableElements: renderableElements
            }
        case ELEMENT_UPDATED:
            var updatedElementData = action.payload;

            var pageData = {...state.pageData};

            // find the element in our pageData that matches our updatedElement and replace it
            for (let j = 0; j < pageData.elements.length; ++j) {
                var element = pageData.elements[j];
                if (element.id == updatedElementData.id) {
                    pageData.elements[j] = updatedElementData;
                    console.log('pageData element updated: ' + JSON.stringify(updatedElementData));
                    break;
                }
            }

            console.log('ELEMENT_UPDATED => ' + JSON.stringify(updatedElementData));

            // update the renderableElement that matches our updatedElement and replace it
            var renderableElements = [...state.renderableElements];

            for (let j = 0; j < renderableElements.length; ++j) {
                var renderableElement = renderableElements[j];
                if (renderableElement.props.element.id == updatedElementData.id) {
                    var updatedRenderableElement = ElementHelper.createWrappedElement(updatedElementData.type, updatedElementData);
                    renderableElements[j] = updatedRenderableElement;
                    console.log('renderableElement updated');
                    break;
                }
            }

            return {
                ...state,
                activeElement: updatedElementData,
                pageData: pageData,
                renderableElements: renderableElements,
            }
        case ELEMENT_DELETED:
            var elementToDelete = action.payload;
            console.log('ELEMENT_DELETED => ' + JSON.stringify(elementToDelete));

            // remove from page data
            var pageData = {...state.pageData};
            var pageDataIndex = pageData.elements.findIndex(e => e.id == elementToDelete.id);
            
            if (pageDataIndex != -1) {
                console.log('pageDataIndex found and removed => ' + pageDataIndex);
                pageData.elements.splice(pageDataIndex, 1);
            }

            // remove from renderable elements
            var renderableElements = [...state.renderableElements];
            var elementIndex = renderableElements.findIndex(e => e.props.element.id == elementToDelete.id);
            if (elementIndex != -1) {
                console.log('renderableElement index found and removed');
                renderableElements.splice(elementIndex, 1);
            }
            console.log('pageData => ' + JSON.stringify(pageData));

            // TODO somehow pageData is getting lost in multiple deletes... FIX!

            return {
                ...state,
                activeElement: null,
                renderableElements: renderableElements,
                pageData: pageData
            }
        case ROUTE_CHANGED:
            return {
                ...state,
                routeName: action.payload
            }
        case AUTH_REQUEST:
            console.log("AUTH_REQUEST");
            return {
                ...state,
                isLoading: true
            }
        case AUTH_SUCCESS:
            console.log("AUTH_SUCCESS");
            return {
               ...state,
               isLoading: false,
               isAuthenticated: true,
               routeName: 'editor'
            }
        case AUTH_FAILURE:
            return {
               ...state,
               isLoading: false,
               isAuthenticated: false 
            }   
        case CREATE_CHILD_PAGE_REQUEST:
            console.log("CREATE_CHILD_PAGE_REQUEST");
            return {
                ...state,
                isLoading: true
            }
        case CREATE_CHILD_PAGE_SUCCESS:
            console.log("CREATE_CHILD_PAGE_SUCCESS");
            var pageMetas = [...state.pageMetas];
            var foundPageIndex = pageMetas.findIndex(page =>{
                return(page.id === action.payload.parentId);
            });
            pageMetas[foundPageIndex].children.push(action.payload.json);
            return {
                ...state,
                pageMetas: pageMetas
            }
        case CREATE_CHILD_PAGE_FAILURE:
            console.log("CREATE_CHILD_PAGE_FAILURE: " + action.error);
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case CREATE_PAGE_REQUEST:
            console.log("CREATE_PAGE_REQUEST");
            return {
                ...state,
                isLoading: false
            }
        case CREATE_PAGE_SUCCESS:
            console.log("CREATE_PAGE_SUCCESS");
            var pageMetas = [...state.pageMetas];
            pageMetas.push(action.payload);
            return {
                ...state,
                isLoading: false,
                pageMetas: pageMetas
            }

        case CREATE_PAGE_FAILURE:
            console.log("CREATE_PAGE_FAILURE: " + action.error);
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}

function setRoute(route){
    window.location.href = "http://localhost:3000/" + route;
}