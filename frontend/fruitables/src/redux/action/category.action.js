import axios from "axios";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionType";

export const getData = () => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/categories/categories-list");
        const data = await response.json();
        console.log(data);
        dispatch({type: GET_CATEGORY, payload: data.data});

    } catch (error) {
        console.log(error);
    }
}

export const handleAdd = (data) => async (dispatch) => {
    try {
        axios.post("http://localhost:8000/api/v1/categories/categories-add", data)
        .then((response) => {
            console.log(response.data);
            dispatch({ type: ADD_CATEGORY, payload:response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}

export const handledelete = (id) => async (dispatch) => {
    try {
        await axios.delete("http://localhost:8000/api/v1/categories/categories-delete/" + id);
        dispatch({type: DELETE_CATEGORY, payload: id});
    } catch (error) {
        console.log(error);
    }

}

export const handleUpdateData = (data) => async (dispatch) => {
    try {
        await axios.put("http://localhost:8000/api/v1/categories/categories-update/" + data._id, data); 
        dispatch({type: UPDATE_CATEGORY, payload: data});
    } catch (error) {
        console.log(error);
    }

}