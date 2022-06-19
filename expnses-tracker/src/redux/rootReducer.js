import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from "../components/signup/signUpSlice"
import loginReducer from "../components/login/loginSlice"
import incomeFetchReducer from "../components/MultistepComp/incomes/IncomeSlice"
import expenseFetchReducer from "../components/MultistepComp/expenses/ExpenseSlice"
import transactionReducer from "../components/Transactions/Create/transactionSlice"
import userReducer from "../components/userProfile/UserSlice"
const rootReducer = combineReducers({
   signupUser: signupReducer,
   loginUser: loginReducer,
   fetchAllIncomes: incomeFetchReducer,
   fetchAllExpenses: expenseFetchReducer,
   createTransaction: transactionReducer,
   userProfile: userReducer
})

export default rootReducer;