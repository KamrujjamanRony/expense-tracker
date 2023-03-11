import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunks
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transactions = await getTransactions();
    return transactions;
  }
);

export const createTransactions = createAsyncThunk(
  "transaction/createTransactions",
  async (data) => {
    const transactions = await addTransaction(data);
    return transactions;
  }
);

export const changeTransactions = createAsyncThunk(
  "transaction/changeTransactions",
  async ({id, data}) => {
    const transactions = await editTransaction(id, data);
    return transactions;
  }
);

export const removeTransactions = createAsyncThunk(
  "transaction/removeTransactions",
  async (id) => {
    const transactions = await deleteTransaction(id);
    return transactions;
  }
);

// create slice
const transactionSlice = createSlice({
    name : "transaction",
    initialState,
    extraReducers : builder => {
        builder
        .addCase(fetchTransactions.pending, state => {
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.transactions = action.payload;
        })
        .addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.transactions = [];
            state.isError = true;
            state.error = action.error?.message;
        })
        .addCase(createTransactions.pending, state => {
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(createTransactions.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.transactions.push(action.payload);
        })
        .addCase(createTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
        .addCase(changeTransactions.pending, state => {
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(changeTransactions.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id);
            state.transactions[indexToUpdate] = action.payload;
        })
        .addCase(changeTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
        .addCase(removeTransactions.pending, state => {
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(removeTransactions.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.transactions = state.transactions.filter(t => t.id !== action.payload);
        })
        .addCase(removeTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})

export default transactionSlice.reducer;