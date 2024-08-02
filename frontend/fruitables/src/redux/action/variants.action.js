import axios from "axios"
import { ADD_VARIANTS, DELETE_VARIANTS, EDIT_VARIANTS, GET_VARIANTS } from "../ActionType"
import {  variantURL } from "../../utils/baseURL"

// const loadingProducts = () => async (dispatch) => {
//     dispatch({ type: LOADING_PRODUCTS })
// }

// const errorProduct = (error) => async (dispatch) => {
//     dispatch({ type: ERROR_PRODUCTS, payload: error })
// }

export const getVariant = () => (dispatch) => {

    try {
        // dispatch(loadingProducts())

        axios.get(variantURL + 'list-variant')
            .then((response) => {
                console.log(response.data.data);
                dispatch({ type: GET_VARIANTS, payload: response.data.data })
            })
            .catch((error) => {
                // dispatch(errorProduct(error.message));
            })


    } catch (error) {
        // dispatch(errorProduct(error.message));
    }


}

export const addVariant = (data) => async (dispatch) => {
    try {
        // dispatch(loadingProducts())

        await axios.post(variantURL + 'add-variant', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => dispatch({ type: ADD_VARIANTS, payload: response.data }))
            .catch((error) => {
                // dispatch(errorProduct(error.message));
            })
    } catch (error) {
        // dispatch(errorProduct(error.message));
    }
}

export const deleteVariant = (_id) => async (dispatch) => {
    try {
        // dispatch(loadingProducts())

        await axios.delete(variantURL + 'delete-variant/' + _id)
            .then(dispatch({ type: DELETE_VARIANTS, payload: _id }))
            .catch((error) => {
                // dispatch(errorProduct(error.message));
            })
    } catch (error) {
        // dispatch(errorProduct(error.message));
    }
}

export const editVariant = (data) => async (dispatch) => {
    try {
        // dispatch(loadingProducts())
        // console.log(data);
        const response = await axios.put(variantURL + 'update-variant/' + data._id, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                dispatch({ type: EDIT_VARIANTS, payload: response.data.data })
                console.log(response.data);
            })
            .catch((error) => {
                // dispatch(errorProduct(error.message));
            })
    } catch (error) {
        // dispatch(errorProduct(error.message));
    }
}