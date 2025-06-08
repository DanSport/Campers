import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

/* ─────────────────────────  THUNKS  ───────────────────────── */
export const fetchVans = createAsyncThunk(
  "vans/fetchVans",
  async ({ page, filters = {} }, thunkAPI) => {
    try {
      let query = `page=${page}&limit=6`; // пагінація
      if (filters.location)
        query += `&location=${encodeURIComponent(filters.location)}`;

      /* чек-бокси «AC / kitchen / …» */
      Object.entries(filters.options || {}).forEach(([k, v]) => {
        if (v) query += `&${k.toLowerCase()}=true`;
      });

      /* radio «form» (тип кузова) */
      if (filters.form) query += `&form=${encodeURIComponent(filters.form)}`;

      const { data } = await axios.get(`${BASE_URL}?${query}`);
      return { items: data, page, filters }; 
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

        const sameFilter =
          JSON.stringify(state.savedFilters) === JSON.stringify(filters);

        state.status = "succeeded";
        state.page = page;
        state.vans =
          page === 1 || !sameFilter
            ? items 
            : [...state.vans, ...items]; 

        state.savedFilters = filters;
      })
      .addCase(fetchVans.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });

    
    builder
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

export const { loadMore } = vanSlice.actions;
export default vanSlice.reducer;
