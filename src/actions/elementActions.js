import { ELEMENT_SELECTED, ELEMENT_DESELECTED, ELEMENT_UPDATED } from './types';

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