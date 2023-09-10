import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    const response = await axios.post("/login", user);

    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.errors;
      return thunkApi.rejectWithValue(message);
    }
  }
});

export const getMe = createAsyncThunk("auth/getMe", async (user, thunkApi) => {
  try {
    const response = await axios.get("/me");
    console.log({ response });

    return response.data.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.errors;
      return thunkApi.rejectWithValue(message);
    }
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (user, thunkApi) => {
    await axios.delete("http://localhost:8000/logout");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get user login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
