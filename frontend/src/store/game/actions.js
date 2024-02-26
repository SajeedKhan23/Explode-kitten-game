import axiosInstance from "../../api/client";
import { endpoints } from "../../api/Base";
import {
  REQUEST_GAME_STATE_PENDING,
  REQUEST_GAME_STATE_SUCCESS,
  REQUEST_GAME_STATE_FAILED,
  PUT_GAME_STATE_PENDING,
  PUT_GAME_STATE_SUCCESS,
  PUT_GAME_STATE_FAILED,
  SET_USERNAME_SUCCESS,
} from "../../utils/constants";

const requestGameState = (params) => async (dispatch) => {
  dispatch({ type: REQUEST_GAME_STATE_PENDING });
  try {
    const response = await axiosInstance.get(endpoints.game, { params });
    dispatch({ type: REQUEST_GAME_STATE_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error fetching game state:", error);
    dispatch({ type: REQUEST_GAME_STATE_FAILED });
  }
};

const putGameState = (params) => async (dispatch) => {
  dispatch({ type: PUT_GAME_STATE_PENDING });
  try {
    const response = await axiosInstance.put(endpoints.game, params);
    dispatch({ type: PUT_GAME_STATE_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error updating game state:", error);
    dispatch({ type: PUT_GAME_STATE_FAILED, payload: { error } });
  }
};
const setUserName = (username) => (dispatch) => {
  dispatch({ type: SET_USERNAME_SUCCESS, payload: username });
};

export { requestGameState, putGameState, setUserName };
