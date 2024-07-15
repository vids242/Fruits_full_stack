import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../utils/baseURL';

export const getVariants = createAsyncThunk(
  'variants/get',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(baseURL + 'variants/list-variants');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addVariant = createAsyncThunk(
  'variants/add',
  async (variantData, thunkAPI) => {
    try {
      const response = await axios.post(baseURL + 'variants/add-variant', variantData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editVariant = createAsyncThunk(
  'variants/edit',
  async (variantData, thunkAPI) => {
    try {
      const response = await axios.put(baseURL + `variants/update-variant/${variantData._id}`, variantData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteVariant = createAsyncThunk(
  'variants/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(baseURL +  `variants/delete-variant/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const variantsSlice = createSlice({
  name: 'variants',
  initialState: {
    isLoading: false,
    variants: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVariants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVariants.fulfilled, (state, action) => {
        state.variants = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getVariants.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addVariant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addVariant.fulfilled, (state, action) => {
        state.variants.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addVariant.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(editVariant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editVariant.fulfilled, (state, action) => {
        state.variants = state.variants.map((variant) =>
          variant._id === action.payload._id ? action.payload : variant
        );
        state.isLoading = false;
      })
      .addCase(editVariant.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteVariant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVariant.fulfilled, (state, action) => {
        state.variants = state.variants.filter((variant) => variant._id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteVariant.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default variantsSlice.reducer;