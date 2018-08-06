import { PAGE_REQUEST, PAGE_SUCCESS, PAGE_FAILURE } from './types';

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
