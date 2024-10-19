import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banners: [],
};

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
  },
});

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
