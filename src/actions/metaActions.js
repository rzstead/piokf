import { PAGE_META_REQUEST, PAGE_META_SUCCESS, PAGE_META_FAILURE } from './types';

import { PageService } from '../services/PageService';

export const fetchPageMetas = () => dispatch => {
    console.log('metaActions => fetchPageMetas');

    dispatch({ type: PAGE_META_REQUEST });

    PageService.getPageMetas()
        .then(json => dispatch({
            type: PAGE_META_SUCCESS,
            payload: json
        }))
        .catch(err => dispatch({
            type: PAGE_META_FAILURE,
            error: err
        }));
}