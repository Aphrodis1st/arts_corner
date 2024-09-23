import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../utils/api";

interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  users: User[];
  user: User | null;
  roles: string[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  roles: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await API.get("/users");
  return response.data;
});

export const registerUser = createAsyncThunk(
  "users/register",
  async (userData: User) => {
    const response = await API.post("/users/register", userData);
    return response.data;
  },
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (credentials: { email: string; password: string }) => {
    const response = await API.post("/users/login", credentials);
    localStorage.setItem("access_token", response.data.data.token);
    return response.data;
  },
);

export const fetchUserRoles = createAsyncThunk(
  "users/fetchUserRoles",
  async (userId: number) => {
    const response = await API.get(`/users/${userId}/roles`);
    return response.data;
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      });
  },
});

export default userSlice.reducer;
