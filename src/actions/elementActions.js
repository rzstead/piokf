import { ELEMENT_SELECTED, ELEMENT_DESELECTED } from './types';

export const selectElement = (element) => dispatch => {
    console.log('elementActions => selectElement => ' + JSON.stringify(element));
    dispatch({type: ELEMENT_SELECTED, payload: element});
}

export const deSelectElement = (element) => dispatch => {
    console.log('elementActions => deSelectElement => ' + JSON.stringify(element));
    dispatch({type: ELEMENT_DESELECTED, payload: element});
}