import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    income: {},
    error: ""
}

const IncomeSlice = createSlice({
    name: "Income",
    initialState,
    reducers: {
        IncomeFetchPending: (state)=> {
         state.isLoading = true;
         state.income = {};
         state.error = ""
        },

        IncomeFetchSuccess : (state, {payload})=>{
        state.isLoading = false;
        state.income = payload;
        state.error = ""
        },

        IncomeFetchFailure : (state, {payload})=> {
        state.isLoading = false;
        state.income = {};
        state.error = payload;
        }
    }
})

const { reducer, actions } = IncomeSlice;
export const { IncomeFetchPending, IncomeFetchSuccess,  IncomeFetchFailure } = actions;
export default reducer;