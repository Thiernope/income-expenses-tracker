import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    transaction: {},
    error: ""
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        transactionPending: (state) => {
            state.isLoading = true;
            state.transaction = {};
            state.error = "";
        },
        transactionSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.transaction = payload;
            state.error = ""
        },

        transactionFailure: (state, {payload}) => {
            state.isLoading = false;
            state.transaction = {};
            state.error = payload
        }
    }
})


const { reducer , actions } = transactionSlice;

export const {transactionPending,transactionSuccess, transactionFailure} = actions;
export default reducer;