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
    routeName: "Viewer",
    isAuthenticated: true,
    navData: {
        brand: "Sweetums",
        links: [
            {name: 'OtherPage', id: '2', children: [
                {name: 'OtherPage Child 1', id: 3},
                {name: 'OtherPage Child 2', id: 1}
            ]},
            {name: 'SecondOtherPage', id: '3'}
        ]
    }

    //this is test data for the nav links
    //have a separate nav component that always sits on top of viewer component
    //elements are now wrapped based on authentication status
    //other things I can't recall
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
            console.log('SAVE_PAGE_FAILURE');
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
                    console.log('pageData element updated');
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
                renderableElements: renderableElements
            }
        case ELEMENT_DELETED:
            return {
                ...state,
                activeElement: null
            }
        case ROUTE_CHANGED:
            return{
                ...state,
                routeName: action.payload
            }
        case AUTH_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case AUTH_SUCCESS:
            //setRoute('editor');
            return{
               ...state,
               isLoading: false,
               isAuthenticated: true,
               routeName: 'editor'
            }
        case AUTH_FAILURE:
            return{
               ...state,
               isLoading: false,
               isAuthenticated: false 
            }   
        case CREATE_CHILD_PAGE_REQUEST:
            console.log("CREATE_CHILD_PAGE_REQUEST");
            return{
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
            return{
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
        default:
            return state;
    }
}

function setRoute(route){
    window.location.href = "http://localhost:3000/" + route;
}