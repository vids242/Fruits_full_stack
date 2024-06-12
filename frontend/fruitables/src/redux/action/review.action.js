import { baseURL } from "../../utils/baseURL";
import { ADD_REVIEWE, DELETE_REVIEWE, GET_REVIEWE, UPDATE_REVIEWE } from "../ActionType"
import axios from 'axios';

export const getReview = () => (dispatch) => {
    try {
        axios.get(baseURL + "reviewe")
            .then((response) => {
                dispatch({ type: GET_REVIEWE, payload: response.data })
            })
            .catch((error) => {
                alert(error)
            })
    } catch (error) {
        console.log(error.message);
    }


}

export const addReview = (data) => (dispatch) => {
    axios.post(baseURL + "reviewe", data)
        .then((response) => {
            dispatch({ type: ADD_REVIEWE, payload: response.data })
        })
        .catch((error) => {
            alert(error)
        })

}

export const deletReview = (id) => (dispatch) => {
    axios.delete(baseURL + "reviewe/" + id)
        .then((response) => {
            dispatch({ type: DELETE_REVIEWE, payload: id })
        })
        .catch((error) => {
            alert(error)
        })

}

export const updateReview = (data) => (dispatch) => {
    axios.put(baseURL + "reviewe/" + data.id, data)
        .then((response) => {
            dispatch({ type: UPDATE_REVIEWE, payload: data })
        })
        .catch((error) => {
            alert(error)
        })

}