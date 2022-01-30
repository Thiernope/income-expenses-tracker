import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signup: {},
    isLoading: false,
    error: ""
}

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        signupPending: (state)=>{
          state.isLoading = true;
        },
        signupSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.signup = payload;
            state.error = ""
        },
        signupError: (state, {payload})=> {
            state.isLoading = false;
            state.error = payload;
        }
    }
})


const { reducer, actions } = signupSlice;
export const { signupPending, signupSuccess, signupError } = actions;
export default reducer