import { ADD_VARIANTS, DELETE_VARIANTS, EDIT_VARIANTS, GET_VARIANTS } from "../ActionType";

const initialState = {
    isLoading: null,
    variant: [],
    error: false,
}

export const variantReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {
        // case LOADING_PRODUCTS:
        //     return {
        //         ...state,
        //         isLoading: true,
        //     }

        // case ERROR_PRODUCTS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         error:action.payload
        //     }

        case GET_VARIANTS:
            return {
                isLoading: null,
                variant: action.payload,
                error: false,
            }

        case ADD_VARIANTS:
            return {
                isLoading: null,
                variant: state.variant.concat(action.payload.data),
                error: false,
            }

        case DELETE_VARIANTS:
            return {
                isLoading: null,
                variant: state.variant.filter((v) => v._id !== action.payload),
                error: false,
            }

        case EDIT_VARIANTS:
            return {
                isLoading: null,
                variant: state.variant.map((v) => {
                    if (v._id === action.payload._id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                
                error: false,
            }

        default:
            return state;
    }
}