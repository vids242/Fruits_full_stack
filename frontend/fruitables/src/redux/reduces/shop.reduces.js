import { GET_SHOPDATA } from "../ActionType";

const initialState = {
    isLoding: false,
    shop: [],
    error: null
}

export const shopReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {
        case GET_SHOPDATA:

            return {
                isLoding: false,
                shop: action.payload,
                error: null
            }

        default:
            return state
    }

}