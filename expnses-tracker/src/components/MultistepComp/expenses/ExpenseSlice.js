import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    expense: {},
    error: ""
}


const ExpenseSlice = createSlice({
name: "expense",
initialState,
reducers: {
    ExpenseFetchPending: (state)=>{
      state.isLoading = true;
      state.expense = {};
      state.error = ""
    },

    ExpenseFetchSuccess: (state, {payload}) => {
        state.isLoading = false;
        state.expense = payload;
        state.error = ""
    },

    ExpenseFetchFailure: (state, {payload})=> {
        state.isLoading = false;
        state.expense = {};
        state.error = payload
    }
}
})


const { reducer, actions } = ExpenseSlice;

export const { ExpenseFetchPending, ExpenseFetchSuccess, ExpenseFetchFailure} = actions;
export default reducer;