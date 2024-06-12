import { ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS } from "../ActionType";

const initialState = {
    isLoading: false,
    products: [],
    error: null
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_PRODUCTS:
            return {
                ...state,
                isLoading: true 
            };

        case ERROR_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case GET_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                error: null
            };

        case ADD_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: [...state.products, action.payload],
                error: null
            };

        case DELETE_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: state.products.filter(product => product._id !== action.payload),
                error: null
            };

        case EDIT_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: state.products.map(product => 
                    product._id === action.payload._id ? action.payload : product
                ),
                error: null
            };

        default:
            return state;
    }
};