import { ADD_REVIEWE, DELETE_REVIEWE, GET_REVIEWE, UPDATE_REVIEWE } from "../ActionType";

const initialState = {
    isLoding: false,
    review: [],
    error: null
}
export const ReviewReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case GET_REVIEWE:

            return {
                isLoding: false,
                review: action.payload,
                error: null
            }

        case ADD_REVIEWE:

            return {
                isLoding: false,
                review: state.review.concat(action.payload),
                error: null
            }

        case DELETE_REVIEWE:

            return {
                isLoding: false,
                review: state.review.filter((v) => v.id !== action.payload),
                error: null
            }
        case UPDATE_REVIEWE:

            return {
                isLoding: false,
                review: state.review.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                error: null
            }


        default:
            return state;
    }
}