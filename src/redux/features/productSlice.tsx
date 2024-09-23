import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/api";

interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  images: string[];
}

interface ProductState {
  products: Product[];
  product: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  status: "idle",
  error: null,
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: FormData) => {
    const response = await API.post("/products", newProduct, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await API.get("/products");
    return response.data;
  },
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id: string) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }: { id: string; updatedProduct: FormData }) => {
    const response = await API.patch(`/products/${id}`, updatedProduct, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    await API.delete(`/products/${id}`);
    return id;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add product";
      })

      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })

      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch product";
      })

      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update product";
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product.id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export default productSlice.reducer;
