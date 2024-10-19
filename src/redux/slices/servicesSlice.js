import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
