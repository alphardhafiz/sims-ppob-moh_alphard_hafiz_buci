import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {}
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfilePicture: (state, action) => {
      state.profile.profile_image = action.payload;
    },
  },
});

export const { setProfile, updateProfilePicture } = profileSlice.actions;
export default profileSlice.reducer;
