import {
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAILURE,
    CREATE_PAGE_REQUEST,
    CREATE_PAGE_SUCCESS,
    CREATE_PAGE_FAILURE,
    DELETE_PAGE_REQUEST,
    DELETE_PAGE_SUCCESS,
    DELETE_PAGE_FAILURE,
    SAVE_PAGE_REQUEST,
    SAVE_PAGE_SUCCESS,
    SAVE_PAGE_FAILURE,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    ROUTE_CHANGED,
    CREATE_CHILD_PAGE_REQUEST,
    CREATE_CHILD_PAGE_SUCCESS,
    CREATE_CHILD_PAGE_FAILURE
} from './types';

import { PageService } from '../services/PageService';
import { AuthService } from '../services/AuthService';
import Cookie from 'js-cookie';

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

export const createPage = (title) => dispatch => {
    console.log('pageActions => addPage title:' + title);
    dispatch({ type: CREATE_PAGE_REQUEST });
    PageService.createPage(title)
        .then(json => dispatch({
            type: CREATE_PAGE_SUCCESS,
            payload: json
        }))
        .catch(err => dispatch({
            type: CREATE_PAGE_FAILURE,
            error: err
        }));
}

export const deletePage = (id, parentId) => dispatch => {
    console.log("pageActions => deletePage id: " + id);
    console.log("pageActions => deletePage => parentId: " + parentId);
    dispatch({ type: DELETE_PAGE_REQUEST });
    PageService.deletePage(id)
        .then(status => {
            if (status == 200) {
                dispatch({
                    type: DELETE_PAGE_SUCCESS,
                    payload: { id: id, parentId: parentId }
                })
            }
        }
        )
        .catch(err => dispatch({
            type: DELETE_PAGE_FAILURE,
            error: err
        }));
}

export const createChildPage = (childTitle, parentId) => dispatch => {
    console.log('pageActions => createChildPage');
    dispatch({ type: CREATE_CHILD_PAGE_REQUEST });

    PageService.createChildPage(childTitle, parentId)
        .then(json => dispatch({
            type: CREATE_CHILD_PAGE_SUCCESS,
            payload: {
                json: json,
                parentId: parentId
            }
        }))
        .catch(err => dispatch({
            type: CREATE_CHILD_PAGE_FAILURE,
            error: err
        }));
}

export const changeRoute = (route) => dispatch => {
    console.log('changing route to ' + route);
    dispatch({type: ROUTE_CHANGED, payload: route});
}

export const login = (user, pass) => dispatch => {
    console.log('logging in...');
    dispatch({type: AUTH_REQUEST});

    AuthService.authenticate(user, pass)
        .then(json => {
            if(json.token){
                Cookie.set('Authorization', json.token)
                dispatch({
                    type: AUTH_SUCCESS
                })
            }else{
                alert('Invalid Credentials')
            }
        }
        )
        .catch(err => dispatch({
            type: AUTH_FAILURE,
            error: err
        }));
}
