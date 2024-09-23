import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import productReducer from "./features/productSlice";
import categoryReducer from "./features/categorySlice";
import singleProductReducer from "./features/singleProductSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    category: categoryReducer,
    singleProduct: singleProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
