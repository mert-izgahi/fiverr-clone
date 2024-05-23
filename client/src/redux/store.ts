import {
  combineReducers,
  configureStore,
  Middleware,
  MiddlewareAPI,
  isRejected,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import toast from "react-hot-toast";
import { colorSchemaSlice } from "./colorSchema/slice";
import { authSlice } from "./auth/slice";
import { authApi } from "./auth/api";
import { setupListeners } from "@reduxjs/toolkit/query";


const rootReducer = combineReducers({
  colorSchema: colorSchemaSlice.reducer,
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["colorSchema", "auth"],
    blacklist: [authApi.reducerPath],
  },
  rootReducer
);

export const rootMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejected(action) || isRejectedWithValue(action)) {
    toast.error(action.payload as string);
  }
  return next(action);
}



const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .concat(rootMiddleware)
    .concat(authApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);

export default store;
