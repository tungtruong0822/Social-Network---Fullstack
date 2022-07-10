import {
  //   createAsyncThunk,
  createSlice,
  //   isRejectedWithValue,
} from "@reduxjs/toolkit";

// Reducer Thunk

// export const login = createAsyncThunk("login", async (user, { dispatch }) => {
//   try {
//   } catch (err) {
//     throw isRejectedWithValue(err.response.data.msg);
//   }
// });

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    msg: "",
    status: false,
    isLoad: false,
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoad = action.payload;
    },
    setMsg(state, action) {
      state.msg = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: {
    //Get all todos
    // [login.fulfilled]: (state, action) => {
    //   state.user = action.payload.data.user;
    // },
  },
});

// Action export
export const { setIsLoading, setMsg, setStatus } = todosSlice.actions;

const alert = todosSlice.reducer;
export default alert;
