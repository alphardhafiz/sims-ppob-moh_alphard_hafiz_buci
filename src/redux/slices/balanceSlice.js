import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    subtractBalance: (state, action) => {
      state.balance -= action.payload;
    }
  },
});

export const { setBalance, subtractBalance} = balanceSlice.actions;
export default balanceSlice.reducer;
