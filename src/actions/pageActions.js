import { PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE, ROUTE_CHANGED } from './types';

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
    console.log('changing route');
    dispatch({type: ROUTE_CHANGED, payload: route});
}
