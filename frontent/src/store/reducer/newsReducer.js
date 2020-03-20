import {FETCH_COMMENTS_SUCCESS, FETCH_NEWS_SUCCESS, FETCH_ONE_NEWS_SUCCESS} from "../action/newsActions";


const initialState = {
    news: [],
    oneNews: [],
    comments: []
};

const newsReducer = (state = initialState, action) => {
    if (action.type === FETCH_NEWS_SUCCESS) {
        return {...state, news: action.response};
    }
    if (action.type === FETCH_ONE_NEWS_SUCCESS) {
        return {...state, oneNews: action.response};
    }
    if (action.type === FETCH_COMMENTS_SUCCESS) {
        return {...state, comments: action.response};
    }
    return state;
};

export default newsReducer;