import { createSlice } from "@reduxjs/toolkit";

interface IState {
  colorSchema: "light" | "dark";
  setColorSchema: (colorSchema: "light" | "dark") => void;
}

const initialState: IState = {
  colorSchema: "dark",
  setColorSchema: (colorSchema: "light" | "dark") => {},
};

export const colorSchemaSlice = createSlice({
  name: "colorSchema",
  initialState,
  reducers: {
    setColorSchema: (state, action) => {
      state.colorSchema = action.payload;
    },
  },
});

export const { setColorSchema } = colorSchemaSlice.actions;
