import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

// Reducer Thunk

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    getSocket(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: {
    //Get all todos
  },
});

// Action export
export const { getSocket } = todosSlice.actions;

const socket = todosSlice.reducer;
export default socket;
