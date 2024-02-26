import {
  REQUEST_GAME_STATE_FAILED,
  REQUEST_GAME_STATE_SUCCESS,
  REQUEST_GAME_STATE_PENDING,
  SET_GAME_STATE_PENDING,
  SET_GAME_STATE_SUCCESS,
  SET_GAME_STATE_FAILED,
  PUT_GAME_STATE_PENDING,
  PUT_GAME_STATE_SUCCESS,
  SET_USERNAME_SUCCESS,
  PUT_GAME_STATE_FAILED,
} from "../../utils/constants";

const INITIAL_STATE = {
  userName: "",
  gameCards: null,
  isPending: true,
  score: 0,
  hasDefuseCard: false,
  activeCard: "",
  error: "",
};

export const gameStateReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_USERNAME_SUCCESS:
      return { ...state, userName: action.payload };
    case REQUEST_GAME_STATE_PENDING:
    case SET_GAME_STATE_PENDING:
    case PUT_GAME_STATE_PENDING:
      return { ...state, isPending: true, error: "" };
    case REQUEST_GAME_STATE_SUCCESS:
    case SET_GAME_STATE_SUCCESS:
    case PUT_GAME_STATE_SUCCESS:
      const {
        gameCards,
        activeCard,
        hasDefuseCard,
        score,
        data,
      } = action.payload;
      return {
        ...state,
        gameCards: gameCards || data?.gameCards || state.gameCards,
        activeCard: activeCard || data?.activeCard || state.activeCard,
        hasDefuseCard: hasDefuseCard || data?.hasDefuseCard || state.hasDefuseCard,
        score: score || data?.score || state.score,
        isPending: false,
        error: "",
      };
    case REQUEST_GAME_STATE_FAILED:
    case SET_GAME_STATE_FAILED:
    case PUT_GAME_STATE_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.payload.error || "An error occurred.",
      };
    default:
      return state;
  }
};
