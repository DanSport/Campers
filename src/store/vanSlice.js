import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// ────────── THUNKS ──────────
export const fetchVans = createAsyncThunk(
  "vans/fetchVans",
  async ({ page, filters = {} }, thunkAPI) => {
    try {
      let query = `page=${page}&limit=5`;
      if (filters.location)
        query += `&location=${encodeURIComponent(filters.location)}`;
      Object.entries(filters.filters || {}).forEach(([key, value]) => {
        if (value) query += `&${key.toLowerCase()}=true`;
      });
      Object.entries(filters.vehicleType || {}).forEach(([key, value]) => {
        if (value) query += `&form=${encodeURIComponent(key)}`;
      });
      const { data } = await axios.get(`${BASE_URL}?${query}`);
      return { items: data.items, page, filters };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch vans"
      );
    }
  }
);

export const fetchVanDetails = createAsyncThunk(
  "vans/fetchVanDetails",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch van details"
      );
    }
  }
);

// ────────── SLICE ──────────
const vanSlice = createSlice({
  name: "vans",
  initialState: {
    vans: [],
    currentVan: null,
    status: "idle",
    error: null,
    page: 1,
    savedFilters: {},
  },
  reducers: {
    loadMore: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVans.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVans.fulfilled, (state, { payload }) => {
        const { items, page, filters } = payload;
        state.status = "succeeded";
        state.vans = page === 1 ? items : [...state.vans, ...items];
        state.savedFilters = filters;
      })
      .addCase(fetchVans.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(fetchVanDetails.pending, (state) => {
        state.status = "loading";
        state.currentVan = null;
      })
      .addCase(fetchVanDetails.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.currentVan = { ...payload, features: payload.features || [] };
      })
      .addCase(fetchVanDetails.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { loadMore } = vanSlice.actions;
export default vanSlice.reducer;
