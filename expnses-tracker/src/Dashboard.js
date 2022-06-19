import React, { useEffect, useState } from 'react';
import {BsFillLockFill} from "react-icons/bs"
import { useSelector, useDispatch} from "react-redux"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Tabs from "./components/Transactions/Create/Tabs"
import ChartDisplay from "./components/Analysis/ChartDisplay"
import Split from "react-split"
import Nav from "./components/Nav"
import List from "./components/Transactions/List"
import IncomeExpeParent from "./components/MultistepComp/IncomeExpeParent"
import { ExpenseFetchPending, ExpenseFetchFailure, ExpenseFetchSuccess } from './components/MultistepComp/expenses/ExpenseSlice'
import { IncomeFetchPending, IncomeFetchFailure, IncomeFetchSuccess } from './components/MultistepComp/incomes/IncomeSlice'
import {transactionPending,transactionSuccess, transactionFailure} from "./components/Transactions/Create/transactionSlice"
import {userPending,userSuccess, userFailure} from "./components/userProfile/UserSlice"
const Dashboard = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const { user } = useSelector(state => state.loginUser);
const token = user.token;
const [expenseList, setExpenseList] = useState([])
const [expenseId, setExpenseId ] = useState(null)
const [expenseFetchError, setExpenseFetchError] = useState(null)
const [incomeList, setIncomeList] = useState([])
const [incomeId, setIncomeId ] = useState(null)
const [incomesFetchError, settIncomesFetchError] = useState(null)
const [transactionList, setTransactionList] = useState([])
const [balanceModal, setBalanceModal] = useState(false);
const [profile, setProfile ] = useState(false)
const toggleProfile = () => {
  setProfile(!profile)
}
const showBalanceModal = () => {
  setBalanceModal(!balanceModal)
}
const allIncomesUrl = "https://money-tracking-app-20.herokuapp.com/incomes/";
const allExpensesUrl = "https://money-tracking-app-20.herokuapp.com/expenses";

useEffect(()=>{
 const getExpenses = async () => {
   try {
    dispatch(ExpenseFetchPending());
    const expenseFromServer = await fetchAllExpenses();
    if(expenseFromServer.error) {
      setExpenseFetchError(expenseFromServer.error)
      dispatch(ExpenseFetchFailure(expenseFromServer.error))
    }  else if(expenseFromServer.length >= 0) {
      setExpenseList(expenseFromServer)
    dispatch(ExpenseFetchSuccess(expenseFromServer));
    }
   } catch (error) {
     console.log(error)
   }
 }
 getExpenses();
 },[])

 const fetchAllExpenses = async ()=>{
  try {
      const res = await fetch(allExpensesUrl,{
        headers: {
          'Content-Type': 'application/json',
          'token': 'Bearer ' + token
        },
      });
      const data = await res.json();
      return data;
  } catch (error) {
      console.log(error)
  }
  
  }
  

 useEffect(()=>{
      dispatch(IncomeFetchPending());
    const getIncomes = async () => {
      try {
        const getIncomesFromServer = await fetchAllIncomes();
        if(getIncomesFromServer.error) {
        settIncomesFetchError(getIncomesFromServer.error)
        dispatch(IncomeFetchFailure(getIncomesFromServer.error))
        } 

        else if(getIncomesFromServer.length >= 0) {
          setIncomeList(getIncomesFromServer)
          dispatch(IncomeFetchSuccess(getIncomesFromServer))
        }
      } catch (error) {
        console.log(error)
      }
    }

    getIncomes();
 },[])

 const fetchAllIncomes = async ()=>{
  try {
      const response = await fetch(allIncomesUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': 'Bearer ' + token
        },
      });
      const result = await response.json();
      return result;
    
  } catch (error) {
      console.log(error)
  }
  
  }

  useEffect(()=>{
    const getTransactions = async () => {
        dispatch(transactionPending())
     try {
         const transactions = await fetchTransctions();
         if(transactions.length >= 1) {
             setTransactionList(transactions)
             dispatch(transactionSuccess(transactions))
         } 

         if(transactions.error) {
             dispatch(transactionFailure(transactions.error))
         }
         
     } catch (error) {
         console.log(error)
     }
    }
    getTransactions()
},[])

  const transanctionUrl = 'https://money-tracking-app-20.herokuapp.com/transactions'
    const fetchTransctions = async () => {
        try {
            const res = await fetch(transanctionUrl, {
                method: 'GET',
                headers: {
                    'token': 'Bearer ' + token
                }
            })
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

     useEffect(()=>{
       const getUserProfile = async() => {
        dispatch(userPending())
         try {
          const userProfile = await fetchUserProfile();
          console.log("User", userProfile)
          if(userProfile) {
            dispatch(userSuccess(userProfile))
          }
         } catch (error) {
           console.log(error)
           dispatch(userFailure(error))
         }
       }

       getUserProfile();
     }, [])



    const userProfileUrl = "https://money-tracking-app-20.herokuapp.com/user/user-profile"

        const fetchUserProfile = async() => {
        try {
          const res = await fetch(userProfileUrl, {
            headers: {
              'token': 'Bearer ' + token
            }
          })

          const data = await res.json();
          return data;
        } catch (error) {
          
        }
        }

  const logout = () => {
    localStorage.removeItem("persist:root");
    return window.location.replace("/login");
  }

    return (
      <div>
        { Object.keys(user).length !== 0 ?
        <div className="dashboard h-screen">
           <Nav showBalanceModal= {showBalanceModal} toggleProfile ={toggleProfile}/>
        <div className="lg:hidden">
          <h1>for smartphones</h1>
        </div>
          <div className="hidden lg:block">
          <Split 
          gutterSize={4}
          direction="vertical" 
          minSize={0}
          sizes={[100, 0]}
          style={{height:'100%'}}>
            <Split 
            gutterSize={4}
            direction="horizontal" 
            minSize={0}
            sizes={[30, 40, 30]}
            className="flex">
              <IncomeExpeParent 
              expenseFetchError = {expenseFetchError}
              expenseList={expenseList} 
              setExpenseList={setExpenseList} 
              expenseId={expenseId} 
              setExpenseId={setExpenseId}

              incomesFetchError = {incomesFetchError}
              incomeList = {incomeList}
              setIncomeList = {setIncomeList}
              incomeId = {incomeId}
              setIncomeId ={setIncomeId}
             
              />
               <Split 
               sizes={[50, 50]}
               gutterSize={4}
               minSize={0}
               direction="vertical"
               >
               <div>
               <div>
               <Tabs expenseList={expenseList} incomeList={incomeList} transactionList={transactionList} setTransactionList={setTransactionList} balanceModal={balanceModal}/> 
               </div>
               </div>
                 <div>
                   <div>
                     <List transactionList={transactionList} setTransactionList={setTransactionList}/>
                   </div>
                 </div>
               </Split>
               <div className="">
                 <ChartDisplay transactionList={transactionList} profile={profile} logout={logout} token={token}/>
               </div>
            </Split>
            <div className=""></div>
          </Split>
      </div>
      </div>:
      <div className="flex flex-col justify-center items-center h-screen">
        <BsFillLockFill className="text-8xl"/>
        <h1 className="mt-5">Access Denied !</h1>
        <Link to="/login" className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Please to login
        </span>
      </Link>
      </div>
      }
       </div>
    )
}

export default Dashboard