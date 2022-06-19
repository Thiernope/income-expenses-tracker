import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: {},
    error: ""
}

const userSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
       userPending: (state) => {
            state.isLoading = true;
            state.user = {};
            state.error = "";
        },
        userSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.user = payload;
            state.error = ""
        },

        userFailure: (state, {payload}) => {
            state.isLoading = false;
            state.user = {};
            state.error = payload
        }
    }
})


const { reducer , actions } = userSlice;

export const {userPending,userSuccess, userFailure} = actions;
export default reducer;