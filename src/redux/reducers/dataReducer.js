import {
  SET_SPARKS,
  LIKE_SPARK,
  UNLIKE_SPARK,
  LOADING_DATA,
  DELETE_SPARK,
  POST_SPARK,
  SET_SPARK,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  sparks: [],
  spark: {},
  loading: false,
};

export default function (state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SPARKS:
      return {
        ...state,
        sparks: action.payload,
        loading: false,
      };
    case SET_SPARK:
      return {
        ...state,
        spark: action.payload,
      };
    case LIKE_SPARK:
    case UNLIKE_SPARK:
      index = state.sparks.findIndex(
        (spark) => spark.sparkId === action.payload.sparkId
      );
      state.sparks[index] = action.payload;
      if (state.spark.sparkId === action.payload.sparkId) {
        state.spark = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SPARK:
      index = state.sparks.findIndex(
        (spark) => spark.sparkId === action.payload
      );
      state.sparks.splice(index, 1);
      return {
        ...state,
      };
    case POST_SPARK:
      return {
        ...state,
        sparks: [action.payload, ...state.sparks],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        spark: {
          ...state.spark,
          comments: [action.payload, ...state.spark.comments],
        },
      };
    default:
      return state;
  }
}
