import {
  combineReducers,
  configureStore,
  // Middleware,
  // MiddlewareAPI,
  // isRejected,
  // isRejectedWithValue,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { colorSchemaSlice } from "./colorSchema/slice";
import { authSlice } from "./auth/slice";
import { authApi } from "./auth/api";
import { categoriesApi } from "./categories/api";
import { usersApi } from "./users/api";
import { utilsApi } from "./utils/api";
import { gigsApi } from "./gigs/api";
import { ordersApi } from "./orders/api";

import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  colorSchema: colorSchemaSlice.reducer,
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [utilsApi.reducerPath]: utilsApi.reducer,
  [gigsApi.reducerPath]: gigsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["colorSchema", "auth"],
    blacklist: [
      authApi.reducerPath,
      categoriesApi.reducerPath,
      usersApi.reducerPath,
      utilsApi.reducerPath,
      gigsApi.reducerPath,
      ordersApi.reducerPath,
    ],
  },
  rootReducer
);

// export const rootMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
//   if (isRejected(action) || isRejectedWithValue(action)) {
//     toast.error(action.payload as string);
//   }
//   return next(action);
// }

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      // .concat(rootMiddleware)
      .concat(authApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(usersApi.middleware)
      .concat(utilsApi.middleware)
      .concat(gigsApi.middleware)
      .concat(ordersApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);

export default store;
