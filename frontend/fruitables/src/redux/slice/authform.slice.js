import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosinstance"
import { setAlert } from "./alert.slice"

const initialState = {
    isAuthentication: false,
    isLoggedOut: true,
    isLoding: false,
    user: null,
    error: null,
}

export const ragister = createAsyncThunk(
    'auth/ragister',
    async (data, {dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post( 'users/ragister', data)
            console.log(response);

            if (response.status === 201) {
                dispatch(setAlert({color:"success",message:response.data.message}))
                return response.data
            }
        } catch (error) {
            // console.log(error);
            dispatch(setAlert({color:"error",message:error.data.message}))
            return rejectWithValue("Ragistration Error " + error.response.data.message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, {dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post( 'users/login', data)
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem("_id", response.data.data._id)
                dispatch(setAlert({color:"success",message:response.data.message}))
                return response.data
            }
        } catch (error) {
            // console.log(error);
            dispatch(setAlert({color:"error",message:error.data.message}))
            return rejectWithValue("Login Error " + error.response.data.message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, { dispatch,rejectWithValue }) => {
        try {
            const response = await axiosInstance.post( 'users/logout', {_id})
            console.log(response);
            if (response.status === 200) {
                dispatch(setAlert({color:"error",message:response.data.message}))
                return response.data
            }
        } catch (error) {
            // console.log(error);
            dispatch(setAlert({color:"error",message:error.data.message}))
            return rejectWithValue("LogOut Error " + error.response.data.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { dispatch,rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('users/checkAuth')
            console.log(response);

            if (response.data.success) {
                dispatch(setAlert({color:"success",message:response.data.message}))
                return response.data
            }
            
        } catch (error) {
            // console.log(error);
            dispatch(setAlert({color:"error",message:error.data.message}))
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