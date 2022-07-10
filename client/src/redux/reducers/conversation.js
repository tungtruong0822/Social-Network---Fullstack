import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  current,
} from "@reduxjs/toolkit";
import { Socket } from "socket.io";
import { postAPI, getAPI, pathAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { setIsLoading, setStatus, setMsg } from "./alert";
// Reducer Thunk

export const getConversations = createAsyncThunk(
  "getConversations",
  async (id, { dispatch }) => {
    try {
      const res = await postAPI("conversations", id);
      return res;
    } catch (err) {
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

export const getMessages = createAsyncThunk(
  "getMessages",
  async (id, { dispatch }) => {
    try {
      const res = await postAPI(`/${id}/conversation`);
      return res;
    } catch (err) {
      dispatch(setIsLoading(true));
      dispatch(setStatus(false));
      dispatch(setMsg(err.response.data.msg));
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

export const createMessage = createAsyncThunk(
  "createMessage",
  async ({ msg, socket }, { dispatch }) => {
    try {
      const media = await imageUpload(msg.media);
      let newMsg = { ...msg, media };
      socket.emit("createMessage", newMsg);
      const res = await postAPI("message", newMsg);
      return res;
    } catch (err) {
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

export const addUserInConversation = createAsyncThunk(
  "addUserInConversation",
  async (cvst, { dispatch }) => {
    try {
      const res = await pathAPI(`adduserinconversation`, cvst);
      dispatch(setIsLoading(true));
      dispatch(setStatus(true));
      dispatch(setMsg(res.data.msg));
      console.log(res);
      return res;
    } catch (err) {
      dispatch(setIsLoading(true));
      dispatch(setStatus(false));
      dispatch(setMsg(err.response.data.msg));
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    conversations: [],
    messages: [],
    loading: false,
  },
  reducers: {
    pushConversations: (state, action) => {
      const initial = {
        _id: "",
        founder: action.payload.auth._id,
        isGroup: false,
        content: "",
        totalUser: [action.payload.userSearch, action.payload.auth],
        media: [],
      };
      state.conversations.unshift(initial);
    },
    setConversation: (state, action) => {
      state.conversations = action.payload;
    },
    clearMeesages: (state, action) => {
      state.messages = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    pushRealtimeMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
  },
  extraReducers: {
    //Get all todos
    [createMessage.pending]: (state, action) => {
      state.loading = true;
    },
    [createMessage.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addUserInConversation.pending]: (state, action) => {
      state.loading = true;
    },
    [addUserInConversation.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addUserInConversation.rejected]: (state, action) => {
      state.loading = false;
    },
    [getConversations.fulfilled]: (state, action) => {
      state.conversations = action.payload.data;
    },
    [getMessages.fulfilled]: (state, action) => {
      state.messages = action.payload.data.msgs;
    },
  },
});

// Action export
export const {
  pushConversations,
  clearMeesages,
  setConversation,
  pushRealtimeMessage,
} = todosSlice.actions;

const conversation = todosSlice.reducer;
export default conversation;
