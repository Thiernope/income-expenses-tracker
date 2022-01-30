import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from "../components/signup/signUpSlice"
import loginReducer from "../components/login/loginSlice"
import incomeFetchReducer from "../components/MultistepComp/incomes/IncomeSlice"
import expenseFetchReducer from "../components/MultistepComp/expenses/ExpenseSlice"
import transactionReducer from "../components/transactions/reducers"
const rootReducer = combineReducers({
   signupUser: signupReducer,
   loginUser: loginReducer,
   fetchAllIncomes: incomeFetchReducer,
   fetchAllExpenses: expenseFetchReducer,
   transactions: transactionReducer
})

export default rootReducer;