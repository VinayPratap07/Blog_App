import { createSlice } from "@reduxjs/toolkit";

type userInfo = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
};

interface user {
  userInfo: userInfo | null;
  isAuthenticated: boolean;
}

const initialState: user = {
  userInfo: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { updateUser, logout } = userSlice.actions;
export default userSlice.reducer;
