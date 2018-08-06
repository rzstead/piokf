import { ELEMENT_SELECTED, ELEMENT_DESELECTED } from '../actions/types';

const initialState = {
    selectedElement: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ELEMENT_SELECTED:
            console.log('elementReducer => ELEMENT_SELECTED');
            return {
                ...state,
                selectedElement: action.payload
            }
        case ELEMENT_DESELECTED:
            console.log('elementReducer => ELEMENT_DESELECTED');
            return {
                ...state,
                selectedElement: null
            }
        default:
            return state;
    }
}