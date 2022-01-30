import {createReducer} from "@reduxjs/toolkit";
import { AddTransaction, DeleteTransaction } from "./actons";
const initialState = {
    transactions: []
}
const transactionsReducer = createReducer(initialState, (builder)=>{
    builder.addCase(AddTransaction, (state, action)=>{
        state.transactions.push(action.payload);
    }).addCase(DeleteTransaction, (state, action)=>{
        state.transactions.filter(x => x.id !== action.payload.id)
    })
})

export default transactionsReducer;