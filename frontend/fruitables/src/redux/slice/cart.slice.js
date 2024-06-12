import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoding: false,
    cart: [],
    error: null
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addTocart: (state, action) => {
            // console.log(action);
            const index = state.cart.findIndex((v) => v.pid === action.payload.id)
            console.log(index);

            if (index !== -1) {
                state.cart[index].qty+= action.payload.count
            } else {
                state.cart.push({ pid: action.payload.id, qty: action.payload.count })
            }

        },
        incrementQty: (state, action) => {
            console.log(action.payload);

            const index = state.cart.findIndex((v) => v.pid === action.payload)

            state.cart[index].qty++
        },
        dicrementQty: (state, action) => {
            console.log(action.payload);

            const index = state.cart.findIndex((v) => v.pid === action.payload)

            state.cart[index].qty--
        },
        deletedata: (state, action) => {
            // console.log(action.payload),
            state.cart = state.cart.filter((v) => v.pid !== action.payload)
        }
    }
})

export const { addTocart, incrementQty, dicrementQty, deletedata } = cartSlice.actions
export default cartSlice.reducer