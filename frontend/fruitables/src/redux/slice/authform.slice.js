import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosinstance"

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
            const response = await axiosInstance.post( 'users/ragister', data)
            console.log(response);

            if (response.status === 201) {
                return response.data
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
            const response = await axiosInstance.post( 'users/login', data)
            console.log(response);
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            // console.log(error);
            return rejectWithValue("Login Error " + error.response.data.message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post( 'users/logout', {_id})
            console.log(response);
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            // console.log(error);
            return rejectWithValue("LogOut Error " + error.response.data.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('users/checkAuth')
            console.log(response);

            if (response.data.success) {
                return response.data
            }
            
        } catch (error) {
            // console.log(error);
            return rejectWithValue("checkAuth Error " + error.response.data.message)
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

        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAuthentication = false;
            state.isLoggedOut = true;
            state.isLoding = false;
            state.user = action.payload.data;
            state.error = null;
        });

        builder.addCase(logout.rejected, (state, action) => {
            state.isAuthentication = true;
            state.isLoggedOut = false;
            state.isLoding = false;
            state.user = null;
            state.error = action.payload;
        });

        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuthentication = true;
            state.isLoggedOut = false;
            state.isLoding = false;
            state.user = action.payload.data;
            console.log("action", action.payload.data);
            state.error = null;
        });

        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLoggedOut = true;
            state.isLoding = false;
            state.user = null;
            state.error = action.payload;
        });


    }
})

export default AuthSlice.reducer