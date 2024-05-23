import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";

interface IState {
  currentUser: IUser;
  isAuthenticated: boolean;
  signInAction: (user: IUser) => void;
  signOutAction: () => void;
}

const initialState: IState = {
  currentUser: {} as IUser,
  isAuthenticated: false,
  signInAction: (user: IUser) => {},
  signOutAction: () => {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInAction: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    signOutAction: (state) => {
      state.currentUser = {} as IUser;
      state.isAuthenticated = false;
    },
  },
});

export const { signInAction, signOutAction } = authSlice.actions;
