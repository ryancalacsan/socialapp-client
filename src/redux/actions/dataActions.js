import {
  SET_SPARKS,
  LOADING_DATA,
  LIKE_SPARK,
  UNLIKE_SPARK,
  DELETE_SPARK,
  LOADING_UI,
  POST_SPARK,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SPARK,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

//Get all sparks
export const getSparks = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/sparks')
    .then((res) => {
      dispatch({
        type: SET_SPARKS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SPARKS,
        payload: [],
      });
    });
};

export const getSpark = (sparkId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/spark/${sparkId}`)
    .then((res) => {
      dispatch({
        type: SET_SPARK,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
//new post
export const postSpark = (newSpark) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/spark', newSpark)
    .then((res) => {
      dispatch({
        type: POST_SPARK,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Like a spark
export const likeSpark = (sparkId) => (dispatch) => {
  axios
    .get(`/spark/${sparkId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SPARK,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//Unlike a spark
export const unlikeSpark = (sparkId) => (dispatch) => {
  axios
    .get(`/spark/${sparkId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SPARK,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//submit a comment
export const submitComment = (sparkId, commentData) => (dispatch) => {
  axios
    .post(`/spark/${sparkId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//delete a spark
export const deleteSpark = (sparkId) => (dispatch) => {
  axios
    .delete(`/spark/${sparkId}`)
    .then(() => {
      dispatch({ type: DELETE_SPARK, payload: sparkId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SPARKS,
        payload: res.data.sparks,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SPARKS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
