// src/store/vanSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchVans = createAsyncThunk(
  "vans/fetchVans",
  async ({ page = 1, filters = {} }, thunkAPI) => {
    try {
      let query = `page=${page}&limit=6`;

      if (filters.location) {
        query += `&location=${encodeURIComponent(filters.location)}`;
      }

      const response = await axios.get(`${BASE_URL}?${query}`);
      let { items } = response.data;

      let filteredItems = items;

      const selectedOptions = Object.keys(filters.options || {}).filter(
        (key) => filters.options[key]
      );
      if (selectedOptions.length > 0) {
        filteredItems = filteredItems.filter((van) => {
          return selectedOptions.every((optionKey) => {
            return van[optionKey.toLowerCase()] === true;
          });
        });
      }

      if (filters.form) {
        filteredItems = filteredItems.filter((van) => {
          return van.form.toLowerCase() === filters.form.toLowerCase();
        });
      }

      return {
        items: filteredItems,
        totalItemsFetched: items.length,
        page,
        filters,
      };
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
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch van details"
      );
    }
  }
);

const vanSlice = createSlice({
  name: "vans",
  initialState: {
    displayedVans: [],
    allVans: [],
    total: 0,
    currentVan: null,
    status: "idle",
    error: null,
    page: 1,
    savedFilters: {},
    hasMore: true,
  },
  reducers: {
    loadMoreVans: (state) => {
      
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
        const { items, totalItemsFetched, page, filters } = payload;
        const sameFilter =
          JSON.stringify(state.savedFilters) === JSON.stringify(filters);

        state.status = "succeeded";
        state.page = page;

        if (page === 1 || !sameFilter) {
          state.displayedVans = items;
          state.total = items.length; 
        } else {
          state.displayedVans = [...state.displayedVans, ...items];
          state.total = state.displayedVans.length; 
        }

        state.hasMore = totalItemsFetched === 6;

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
        payload.features = payload.features ?? [];
        payload.reviews = payload.reviews ?? [
          { reviewer: "Alex", rating: 4, comment: "Great for weekend trips!" },
          { reviewer: "Olena", rating: 5, comment: "Brand-new interior." },
        ];

        state.status = "succeeded";
        state.currentVan = payload;
      })
      .addCase(fetchVanDetails.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { loadMoreVans } = vanSlice.actions; 
export default vanSlice.reducer;
