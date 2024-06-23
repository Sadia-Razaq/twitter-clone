// 1.always import these two packages in every slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, loginUser, logoutUser, myProfile, registerUser } from "./authService";

// check for user in the localStorage
// get the item with the name of user
// convert the string into object

const isUserAvailable = JSON.parse(localStorage.getItem("user"));

// 2.define your initial state

const initialState = {
  user: isUserAvailable ? isUserAvailable : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  allUsers:[]
};

// handle the states of register user

export const regUser = createAsyncThunk(
  "auth/reg-user",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logUser = createAsyncThunk(
  "auth/log-user",
  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", (_, thunkAPI) => {
  try {
    return logoutUser();
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});


export const getAllUsersData = createAsyncThunk(
  "auth/all-users", 
  async(_, thunkAPI) => {
  try {
    return await getAllUsers();
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const myProfileData = createAsyncThunk(
  "auth/my-profile",
  async(user_id, thunkAPI) =>{

try {
  return await myProfile(user_id);
} catch (error) {
  const message = error.response.data.message;
  return thunkAPI.rejectWithValue(message);
}

});



// 3. create your slice to make your state global

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(logUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Error loging out";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = true;
      })
      .addCase(getAllUsersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Error loging out";
      })
      .addCase(getAllUsersData.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.isSuccess = true;
      })
      // .addCase(myProfileData.pending, (state) => {

      // })
  },
});

// 4.export your slice
export const { reset } = authSlice.actions;
export default authSlice.reducer;