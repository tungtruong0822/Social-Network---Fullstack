import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { postAPI, getAPI, pathAPI } from "../../utils/fetchData";
import { setIsLoading, setMsg, setStatus } from "./alert";
import { imageUpload } from "../../utils/imageUpload";

// Reducer Thunk

export const login = createAsyncThunk("login", async (user, { dispatch }) => {
  try {
    dispatch(setIsLoading(true));
    const res = await postAPI("login", user);
    dispatch(setStatus(true));
    dispatch(setMsg(res.data.msg));
    localStorage.setItem("login", true);
    localStorage.setItem("userId", res.data.user._id);
    window.location.replace("/");
    dispatch(setLoading(false));

    return res;
  } catch (err) {
    dispatch(setIsLoading(true));
    dispatch(setStatus(false));
    dispatch(setMsg(err.response.data.msg));
    throw isRejectedWithValue(err.response.data.msg);
  }
});

export const register = createAsyncThunk(
  "register",
  async (user, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));
      const res = await postAPI("register", user);
      dispatch(setStatus(true));
      dispatch(setMsg(res.data.msg));
      dispatch(setLoading(false));

      return res;
    } catch (err) {
      dispatch(setIsLoading(true));
      dispatch(setStatus(false));
      dispatch(setMsg(err.response.data.msg));
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

export const refreshToken = createAsyncThunk("refreshToken", async () => {
  try {
    if (localStorage.getItem("login")) {
      const res = await postAPI("refreshToken", {
        userId: `${localStorage.getItem("userId")}`,
      });

      return res;
    }
  } catch (err) {
    throw isRejectedWithValue(err.response.data.msg);
  }
});

export const editProfile = createAsyncThunk(
  "editProfile",
  async (editUser, { dispatch }) => {
    try {
      let avatar = editUser.avatar;
      let coverPicture = editUser.coverPicture;
      if (Array.isArray(editUser.avatar)) {
        avatar = await imageUpload(editUser.avatar);
        avatar = avatar[0].url;
      }
      if (Array.isArray(editUser.coverPicture)) {
        coverPicture = await imageUpload(editUser.coverPicture);
        coverPicture = coverPicture[0].url;
      }
      const newUpdateUser = { ...editUser, avatar, coverPicture };
      const res = await postAPI(
        `/${newUpdateUser._id}/editprofile`,
        newUpdateUser
      );
      dispatch(setStatus(true));
      dispatch(setIsLoading(true));
      dispatch(setMsg(res.data.msg));
      dispatch(setLoading(false));
      console.log(res.data.user);
      return res;
    } catch (err) {
      dispatch(setIsLoading(true));
      dispatch(setStatus(false));
      dispatch(setMsg(err.response.data.msg));
      throw isRejectedWithValue(err.response.data.msg);
    }
  }
);

export const getUser = createAsyncThunk("getUser", async (id) => {
  try {
    const res = await getAPI(`${id}`);
    return res;
  } catch (err) {
    throw isRejectedWithValue(err.response.data.msg);
  }
});
export const getAllUser = createAsyncThunk("getAllUser", async () => {
  try {
    const res = await postAPI("getalluser");
    return res;
  } catch (err) {
    console.log(err.response.data.msg);
    throw isRejectedWithValue(err.response.data.msg);
  }
});
export const searchUser = createAsyncThunk("searchUser", async (name) => {
  try {
    const res = await postAPI(`findname?name=${name}`);
    return res;
  } catch (err) {
    throw isRejectedWithValue(err.response.data.msg);
  }
});
export const handleFollow = createAsyncThunk("handleFollow", async (id) => {
  try {
    const res = await pathAPI(`${id.id}/follower`, { _id: id._id });
    console.log(res);
    return res;
  } catch (err) {
    throw isRejectedWithValue(err.response.data.msg);
  }
});
export const handleUnFollow = createAsyncThunk("handleUnFollow", async (id) => {
  try {
    const res = await pathAPI(`${id.id}/unfollower`, { _id: id._id });
    console.log(res);
    return res;
  } catch (err) {
    throw isRejectedWithValue(err.response.data.msg);
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    user: {},
    userParams: {},
    loading: false,
    searchUsers: [],
    statusFollow: "",
    allUser: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setStatusFollow(state, action) {
      state.statusFollow = "";
    },
    clearSearchUser(state, action) {
      state.searchUsers = [];
    },
  },
  extraReducers: {
    //Get all todos
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.data.user;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.user = action.payload.data.user;
    },
    [register.fulfilled]: (state, action) => {
      state.user = "registered";
    },
    [editProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [editProfile.fulfilled]: (state, action) => {
      state.user = action.payload.data.user;
      state.userParams = action.payload.data.user;
      state.loading = false;
    },
    [editProfile.rejected]: (state, action) => {
      state.loading = false;
    },
    [getUser.fulfilled]: (state, action) => {
      state.userParams = action.payload.data.user;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.allUser = action.payload.data.user;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.searchUsers = action.payload.data.users;
    },
    [handleUnFollow.fulfilled]: (state, action) => {
      state.statusFollow = action.payload.data.msg;
    },
    [handleFollow.fulfilled]: (state, action) => {
      state.statusFollow = action.payload.data.msg;
    },
  },
});

// Action export
export const { setLoading, setStatusFollow, clearSearchUser } =
  todosSlice.actions;

const auth = todosSlice.reducer;
export default auth;
