import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: {},
    error: ""
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        LoginUserPending: (state)=> {
        state.isLoading = true
        },

        LoginUserSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.user = payload;
            state.error = ""
        },

        LoginUserFailure: (state, {payload})=>{
            state.isLoading = false;
            state.error = payload
        }
    }
})

const { reducer, actions } = loginSlice;
export const { LoginUserPending, LoginUserSuccess, LoginUserFailure } = actions;
export default reducer;