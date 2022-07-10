import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  current,
} from "@reduxjs/toolkit";
import { postAPI, getAPI, pathAPI, deleteAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { setLoading } from "./auth";
import { setIsLoading, setMsg, setStatus } from "./alert";

// Reducer Thunk

export const getAllPost = createAsyncThunk("getAllPost", async (dispatch) => {
  try {
    const res = await postAPI("home");

    return res;
  } catch (err) {
    throw isRejectedWithValue(err.response.data.msg);
  }
});

export const createPost = createAsyncThunk(
  "createPost",
  async (post, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const img = await imageUpload(post.img);
      let newPost = { ...post, img };
      const res = await postAPI("createpost", newPost);
      dispatch(setLoading(false));
      return res;
    } catch (err) {
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

export const getPostUser = createAsyncThunk(
  "getPostUser",
  async (uesrId, { dispatch }) => {
    try {
      const res = await getAPI(`/${uesrId}/getuserpost`);
      return res;
    } catch (err) {
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);
export const likeAndUnlike = createAsyncThunk(
  "likeAndUnlike",
  async ({ postId, userId, socket }, { dispatch }) => {
    try {
      const res = await pathAPI(`/${postId}/like`, { userId });

      socket.emit("likeAndUnlike", res.data.newpost);
    } catch (err) {
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);
export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ authId, post }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const img = await imageUpload(post.img);
      let newPost = { ...post, img };
      dispatch(setIsLoading(true));
      const res = await pathAPI(`/${authId}/updatepost`, newPost);
      dispatch(setStatus(true));
      dispatch(setMsg(res.data.msg));
      dispatch(setLoading(false));
      // socket.emit("likeAndUnlike", res.data.newpost);
      return res;
    } catch (err) {
      dispatch(setIsLoading(true));
      dispatch(setStatus(false));
      dispatch(setMsg(err.response.data.msg));
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async ({ post }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await deleteAPI(`/${post._id}/deletepost`);
      dispatch(setLoading(false));
      // socket.emit("likeAndUnlike", res.data.newpost);
      return res;
    } catch (err) {
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);
export const createComment = createAsyncThunk(
  "createComment",
  async (comment, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await postAPI("/createComment", comment);
      console.log(comment);
      dispatch(setLoading(false));
      // socket.emit("likeAndUnlike", res.data.newpost);
      return res;
    } catch (err) {
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (commentId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await deleteAPI(`/deleteComment/${commentId}`);
      dispatch(setLoading(false));
      // socket.emit("likeAndUnlike", res.data.newpost);
      return res;
    } catch (err) {
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);
export const updateComment = createAsyncThunk(
  "updateComment",
  async (comment, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await pathAPI(`/${comment._id}/updateComment`, {
        content: comment.content,
      });
      dispatch(setLoading(false));
      // socket.emit("likeAndUnlike", res.data.newpost);
      return res;
    } catch (err) {
      console.log(err.response.data.msg);
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    post: [],
    postUser: [],
    postSuccess: "",
  },
  reducers: {
    setClearNotify(state, action) {
      state.postSuccess = "";
    },
    setLikeAndUnlike: (state, action) => {
      state.post = current(state).post.map((post) => {
        if (post._id === action.payload._id) {
          console.log(action.payload);
          return action.payload;
        } else return post;
      });
    },
  },
  extraReducers: {
    //Get all todos
    [getAllPost.fulfilled]: (state, action) => {
      state.post = action.payload.data;
    },
    [getPostUser.fulfilled]: (state, action) => {
      state.postUser = action.payload.data;
    },
    [createPost.fulfilled]: (state, action) => {
      state.postSuccess = action.payload.data.msg;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.postSuccess = action.payload.data.msg;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.postSuccess = action.payload.data.msg;
    },
  },
});

// Action export
export const { setClearNotify, setLikeAndUnlike } = todosSlice.actions;

const post = todosSlice.reducer;
export default post;
