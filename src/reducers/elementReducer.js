import { ELEMENT_SELECTED, ELEMENT_DESELECTED, ELEMENT_UPDATED, ELEMENT_CREATED, ELEMENT_CREATE_FROM_TYPE } from '../actions/types';

const initialState = {
    selectedElement: null,
    elementTypeToAdd: null,
    elementToAdd: null
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
        case ELEMENT_UPDATED:
            console.log('elementReducer => ELEMENT_UPDATED');
            return {
                ...state,
                selectedElement: action.payload
            }
        case ELEMENT_CREATE_FROM_TYPE:
            console.log('elementReducer => ELEMENT_CREATE_FROM_TYPE');
            return {
                ...state,
                elementTypeToAdd: action.payload
            }
        case ELEMENT_CREATED:
            console.log('elementReducer => ELEMENT_CREATED');
            return {
                ...state,
                elementToAdd: action.payload,
                elementTypeToAdd: null
            }
        default:
            return state;
    }
}