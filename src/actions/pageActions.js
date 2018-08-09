import { PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, ROUTE_CHANGED } from './types';

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
