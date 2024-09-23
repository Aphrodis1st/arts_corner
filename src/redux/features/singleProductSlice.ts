import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/api";

interface Product {
  categoryId: string | undefined;
  id: string;
  title: string;
  name: string;
  description: string;
  images: string[];
}

interface SingleProductState {
  singleProduct: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SingleProductState = {
  singleProduct: null,
  status: "idle",
  error: null,
};

// Async thunk to fetch a single product by ID
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id: string) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
  },
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
        state.singleProduct = null; // Reset on new request
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload; // Store the fetched single product
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch product";
        state.singleProduct = null; // Reset on error
      });
  },
});

export const selectSingleProduct = (state: {
  singleProduct: SingleProductState;
}) => state.singleProduct;

export default singleProductSlice.reducer;
