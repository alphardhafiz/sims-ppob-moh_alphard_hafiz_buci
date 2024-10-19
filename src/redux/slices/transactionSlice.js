import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addMoreTransactions: (state, action) => {
      state.transactions = [...state.transactions, ...action.payload];
    },
  },
});

export const { setTransactions, addMoreTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
