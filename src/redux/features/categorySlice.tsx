/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

interface Category {
  id: string;
  categoryName: string;
}

interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Async thunks for CRUD operations
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await API.get("/categories"); // Adjust the API endpoint as necessary
    return response.data;
  },
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData: any) => {
    const response = await API.post("/categories", categoryData);
    return response.data;
  },
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }: { id: string; categoryData: any }) => {
    const response = await API.put(`/categories/${id}`, categoryData);
    return response.data;
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string) => {
    const response = await API.delete(`/categories/${id}`);
    return response.data;
  },
);

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload; // Payload should be an array of categories
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load categories";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id,
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.meta.arg,
        );
      });
  },
});

export default categorySlice.reducer;
