import axiosApi from "../../axios-api";
import {push} from "connected-react-router";


export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR';

export const fetchNewsRequest = () => {return {type: FETCH_NEWS_REQUEST}};
export const fetchNewsSuccess = (response) => {return {type: FETCH_NEWS_SUCCESS, response}};
export const fetchNewsError = () => {return {type: FETCH_NEWS_ERROR}};

export const FETCH_ONE_NEWS_REQUEST = 'FETCH_ONE_NEWS_REQUEST';
export const FETCH_ONE_NEWS_SUCCESS = 'FETCH_ONE_NEWS_SUCCESS';
export const FETCH_ONE_NEWS_ERROR = 'FETCH_ONE_NEWS_ERROR';

export const fetchOneNewsRequest = () => {return {type: FETCH_ONE_NEWS_REQUEST}};
export const fetchOneNewsSuccess = (response) => {return {type: FETCH_ONE_NEWS_SUCCESS, response}};
export const fetchOneNewsError = () => {return {type: FETCH_ONE_NEWS_ERROR}};

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';

export const fetchCommentsRequest = () => {return {type: FETCH_COMMENTS_REQUEST}};
export const fetchCommentsSuccess = (response) => {return {type: FETCH_COMMENTS_SUCCESS, response}};
export const fetchCommentsError = () => {return {type: FETCH_COMMENTS_ERROR}};

export const getOneNews = (id) => {
    return (dispatch, getState) => {
        const user = getState().users.user;
        dispatch(fetchOneNewsRequest());
         axiosApi.get('/news/' + id, {headers: {'Authorization': 'Token ' + user.token}}).then(response => {
            dispatch(fetchOneNewsSuccess(response.data));
        }, error => {
            dispatch(fetchOneNewsError(error));
        });
    }
};

export const getNews = () => {
    return dispatch => {
        dispatch(fetchNewsRequest());
         axiosApi.get('/news').then(response => {
            dispatch(fetchNewsSuccess(response.data));
        }, error => {
            dispatch(fetchNewsError(error));
        });
    }
};

export const addNews = newsData => {
    return async dispatch => {
        await axiosApi.post('/news', newsData);
        dispatch(push('/'));
        dispatch(getNews());
    }
};

export const getComments = (id) => {
    return (dispatch, getState) => {
        const user = getState().users.user;
        dispatch(fetchCommentsRequest());
         axiosApi.get('/comments/' + id, {headers: {'Authorization': 'Token ' + user.token}}).then(response => {
            dispatch(fetchCommentsSuccess(response.data));
        }, error => {
            dispatch(fetchCommentsError(error));
        });
    }
};

export const addComments = (comments, id) => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApi.post('/comments', comments, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(getComments(id));
    }
};