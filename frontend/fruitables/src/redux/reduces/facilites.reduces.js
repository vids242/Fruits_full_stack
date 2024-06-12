import { ADD_FACILITES, DELETE_FACILITES, UPDATE_FACILITES } from "../ActionType";

const inistialState = {
    isLodaing: false,
    facilites: [],
    error: null
}

export const FacilitesReducer = (state = inistialState, action) => {
    // console.log(action);

    switch (action.type) {
        case ADD_FACILITES:

            return {
                ...state,
                facilites: state.facilites.concat(action.payload)
            }
        case DELETE_FACILITES:

            return {
                ...state,
                facilites: state.facilites.filter((v) => v.id !== action.payload)
            }

        case UPDATE_FACILITES:

            return {
                ...state,
                facilites: state.facilites.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            }


        default:
            return state
    }
}