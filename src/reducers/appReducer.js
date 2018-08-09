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
    isAuthenticated: false,
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
        default:
            return state;
    }
}

function setRoute(route){
    window.location.href = "http://localhost:3000/" + route;
}