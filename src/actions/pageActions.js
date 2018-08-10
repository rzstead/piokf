import {
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAILURE,
    CREATE_PAGE_REQUEST,
    CREATE_PAGE_SUCCESS,
    CREATE_PAGE_FAILURE,
    SAVE_PAGE_REQUEST,
    SAVE_PAGE_SUCCESS,
    SAVE_PAGE_FAILURE,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    ROUTE_CHANGED,
    CREATE_CHILD_PAGE_REQUEST
} from './types';

import { PageService } from '../services/PageService';

export const fetchPage = (id) => dispatch => {
    console.log('pageActions => fetchPage');

    dispatch({ type: PAGE_REQUEST });

    PageService.getPage(id)
        .then(json => dispatch({
            type: PAGE_SUCCESS,
            payload: json
        }))
        .catch(err => dispatch({
            type: PAGE_FAILURE,
            error: err
        }));
}

export const savePage = (page) => dispatch => {
    console.log('pageActions => savePage');
    dispatch({ type: SAVE_PAGE_REQUEST });
    PageService.savePage(page)
        .then(json => dispatch({
            type: SAVE_PAGE_SUCCESS,
            payload: json
        }))
        .catch(err => dispatch({
            type: SAVE_PAGE_FAILURE,
            error: err
        }));
}

export const createPage = (page) => dispatch => {
    console.log('pageActions => addPage');
    dispatch({ type: CREATE_PAGE_REQUEST });
    PageService.createPage(page)
        .then(json => dispatch({
            type: CREATE_PAGE_SUCCESS,
            payload: json
        }))
        .catch(err => dispatch({
            type: CREATE_PAGE_FAILURE,
            error: err
        }));
}

export const createChildPage = (childTitle, parentId) => dispatch => {
    console.log('pageActions => createChildPage');
    dispatch({ type: CREATE_CHILD_PAGE_REQUEST });
    PageService.createChildPage(childTitle, parentId)
        .then(json => dispatch({
            type: CREATE_PAGE_SUCCESS,
            payload: {
                json: json,
                parentId: parentId
            }
        }))
        .catch(err => dispatch({
            type: CREATE_PAGE_FAILURE,
            error: err
        }));
}

export const changeRoute = (route) => dispatch => {
    console.log('changing route to ' + route);
    dispatch({type: ROUTE_CHANGED, payload: route});
}

export const login = (user, pass) => dispatch => {
    console.log('logging in...');
    dispatch({type: AUTH_SUCCESS});

    // AuthService.authenticate(user, pass)
    //     .then(json => dispatch({
    //         type: AUTH_SUCCESS
    //     }))
    //     .catch(err => dispatch({
    //         type: AUTH_FAILURE,
    //         error: err
    //     }));
}
