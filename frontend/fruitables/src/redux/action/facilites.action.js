import { ADD_FACILITES, DELETE_FACILITES, GET_FACILITES, UPDATE_FACILITES } from "../ActionType"

export const facilites_data = (data) => (dispatch) => {
    dispatch({ type: ADD_FACILITES, payload: data })
}

export const DeleteFacilites = (id) => (dispatch) => {
    dispatch({ type: DELETE_FACILITES, payload: id })
}

export const UpdateFacilites = (data) => (dispatch) => {
    dispatch({ type: UPDATE_FACILITES, payload: data })
}
export const GetFacilites = () => (dispatch) => {
    dispatch({ type: GET_FACILITES})
}

