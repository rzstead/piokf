import { ELEMENT_SELECTED, ELEMENT_DESELECTED, ELEMENT_UPDATED, ELEMENT_CREATED, ELEMENT_CREATE_FROM_TYPE, ELEMENT_ADDED, RENDERABLE_ELEMENTS_CREATED } from './types';

export const selectElement = (element) => dispatch => {
    console.log('elementActions => selectElement => ' + JSON.stringify(element));
    dispatch({type: ELEMENT_SELECTED, payload: element});
}

export const deSelectElement = (element) => dispatch => {
    console.log('elementActions => deSelectElement => ' + JSON.stringify(element));
    dispatch({type: ELEMENT_DESELECTED, payload: element});
}

export const updateElement = (element) => dispatch => {
    console.log('elementActions => updateElement');
    dispatch({type: ELEMENT_UPDATED, payload: element});
}

export const createElement = (element) => dispatch => {
    console.log('elementActions => createElement');
    dispatch({type: ELEMENT_CREATED, payload: element});
}

export const createElementFromType = (type) => dispatch => {
    console.log('elementActions => createElementFromType => ' + type);
    dispatch({type: ELEMENT_CREATE_FROM_TYPE, payload: type});
}

export const addElement = (element) => dispatch => {
    console.log('elementActions => addElement');
    dispatch({type: ELEMENT_ADDED, payload: element});
}

export const createRenderableElements = (elements) => dispatch => {
    console.log('elementActions => createRenderableElements');
    dispatch({type: RENDERABLE_ELEMENTS_CREATED, payload: elements});
}