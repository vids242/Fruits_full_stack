import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Base_url } from "../../utils/baseURL"

const initialState = {
    isAuthentication: false,
    isLoggedOut: true,
    isLoding: false,
    user: null,
    error: null,
}
export const ragister = createAsyncThunk(
    'auth/ragister',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(Base_url + 'users/ragister', data)
            console.log(response);

            if (response.status === 201) {
                return response
            }
        } catch (error) {
            // console.log(error);
            return rejectWithValue("Ragistration Error " + error.response.data.message)
        }
    }
)
export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(Base_url + 'users/login', data)
            console.log(response);
            if (response.status === 200) {
                return response
            }
        } catch (error) {
            // console.log(error);
            return rejectWithValue("Login Error " + error.response.data.message)
        }
    }
)
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(ragister.fulfilled, (state, action) => {
            state.isAuthentication = false;
            state.isLoggedOut = true;
            state.isLoding = false;
            state.user = action.payload.data;
            state.error = null;
        });

        builder.addCase(ragister.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLoggedOut = true;
            state.isLoding = false;
            state.user = null;
            state.error = action.payload;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuthentication = true;
            state.isLoggedOut = false;
            state.isLoding = false;
            state.user = action.payload.data;
            state.error = null;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLoggedOut = true;
            state.isLoding = false;
            state.user = null;
            state.error = action.payload;
        });



    }
})

export default AuthSlice.reducer