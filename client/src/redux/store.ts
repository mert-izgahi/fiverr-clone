import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { colorSchemaSlice } from "./colorSchema/slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  colorSchema: colorSchemaSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["colorSchema"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);

export default store;
