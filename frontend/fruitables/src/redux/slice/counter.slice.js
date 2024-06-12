import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count : 0,
}

export const counterSlice = createSlice({
    name:"counter",
    initialState : initialState,
    reducers:{
        increment : (state,action) => {
            console.log(action);
            state.count += 1
        },
        dicrement : (state,action) => {
            state.count -= 1
        }
    }
})

export const {increment,dicrement}  = counterSlice.actions

export default  counterSlice.reducer