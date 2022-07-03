import React, { useEffect, useState } from 'react';
import {BsFillLockFill} from "react-icons/bs"
import {PulseLoader} from "react-spinners"
import { useSelector, useDispatch} from "react-redux"
import { Link } from 'react-router-dom';
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
const [profile, setProfile ] = useState(false);
const [userProfileInfo, setUserProfileInfo] = useState({});
const [close, setClose] = useState(false)
const [imageProf, setImageProf] = useState(true)

//tour states

const [start, setStart ] = useState(null);
const [switchIndicator, setSwitchIndicator] = useState(false)
const [createIndicator, setCreateIndicator] = useState(false)
const [dipositIndicator, setDipositIndicator] = useState(false)
const [withdrawIndicator, setWithdrawIndicator] = useState(false)
const [balanceIndicator, setBalanceIndicator] = useState(false)
const [updateLoader, setUpdateLoader ] = useState(null)
const toggleProfile = () => {
  setProfile(!profile)
  setClose(!close)
  setImageProf(!imageProf)
}

const showBalanceModal = () => {
  setBalanceModal(!balanceModal)
}
const allIncomesUrl = "https://money-tracking-app-20.herokuapp.com/incomes/";
const allExpensesUrl = "https://money-tracking-app-20.herokuapp.com/expenses";

useEffect(()=>{
  const fetchAllExpenses = async ()=>{
    try {
      dispatch(ExpenseFetchPending());
        const res = await fetch(allExpensesUrl,{
          headers: {
            'Content-Type': 'application/json',
            'token': 'Bearer ' + token
          },
        });
        const expenseFromServer = await res.json();
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
    fetchAllExpenses();
 },[dispatch, token])

 

 useEffect(()=>{
  const fetchAllIncomes = async ()=>{
    try {
      dispatch(IncomeFetchPending());
        setUpdateLoader(<PulseLoader size={5}/>)
        const response = await fetch(allIncomesUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': 'Bearer ' + token
          },
        });
        const getIncomesFromServer= await response.json();
        if(getIncomesFromServer.error) {
          setUpdateLoader(null)
        settIncomesFetchError(getIncomesFromServer.error)
        dispatch(IncomeFetchFailure(getIncomesFromServer.error))
        } 
  
        else if(getIncomesFromServer.length >= 0) {
          setUpdateLoader(null)
          setIncomeList(getIncomesFromServer)
          dispatch(IncomeFetchSuccess(getIncomesFromServer))
        }
      
    } catch (error) {
        console.log(error)
    }
    
    }
    fetchAllIncomes()

 },[dispatch, token])



  const transanctionUrl = 'https://money-tracking-app-20.herokuapp.com/transactions'
  useEffect(()=>{
        const fetchTransctions = async () => {
          dispatch(transactionPending())
          setUpdateLoader(<PulseLoader size={5}/>)
          try {
              const res = await fetch(transanctionUrl, {
                  method: 'GET',
                  headers: {
                      'token': 'Bearer ' + token
                  }
              })
              const transactions = await res.json();
              if(transactions.length >= 1) {
                setUpdateLoader(null)
                   setTransactionList(transactions)
                   dispatch(transactionSuccess(transactions))
               } 
      
               if(transactions.error) {
                setUpdateLoader(null)
                   dispatch(transactionFailure(transactions.error))
               }
            
          } catch (error) {
              console.log(error)
          }
        }

        fetchTransctions();
},[dispatch, token])
   


    //userProfile 
    const userProfileUrl = "https://money-tracking-app-20.herokuapp.com/user/user-profile"
    useEffect(()=>{
      const fetchUserProfile = async() => {
        dispatch(userPending())
        try {
          const res = await fetch(userProfileUrl, {
            headers: {
              'token': 'Bearer ' + token
            }
          })
     
          const userProfile = await res.json();
          if(userProfile) {
           dispatch(userSuccess(userProfile))
           setUserProfileInfo(userProfile)
           setStart(userProfile.finishedTour);
         }
   
        } catch (error) {
         console.log(error)
         dispatch(userFailure(error))
        }
        }
      fetchUserProfile();
    },[dispatch, token])
    
    
     
   //Finish Tour

       const finishTourUrl = "https://money-tracking-app-20.herokuapp.com/user/finish-tour"
       const finishTour = async () => {
        setUpdateLoader(<PulseLoader size={5}/>)
        try {
          const res = await fetch(finishTourUrl , {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'token': 'Bearer ' + token
            }
          })
      
          const data = await res.json();
          console.log("DAFLA", data)
          if(data.message === "Finished tour") {
            setUpdateLoader(null)
            setStart(data.updatedUser.finishedTour)
            setBalanceIndicator(false);
          }
        } catch (error) {
          console.log(error)
        }
      }
      
    
//Tour functions::::::


const showSwitch = () => {
  setStart(!start);
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
  setSwitchIndicator(true)
}

const hideSwitch = () => {
  setSwitchIndicator(false)
  window.scrollTo({
  top: 0,
  behavior: 'smooth',
  });
  setStart(false);
}

 const hideSwitchAndForward = () => {
 showCreate();
 window.scrollTo({
  top: document.body.scrollHeight,
  behavior: 'smooth',
});
 setSwitchIndicator(false)
 }

const showCreate = () => {
  setCreateIndicator(true)
}

const hideCreate = () => {
  setCreateIndicator(false)
  setSwitchIndicator(true)
}

 const hideCreateAndForWard = () => {
  setCreateIndicator(false);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  setDipositIndicator(true)
 }

 const showDeposit = () => {
   setDipositIndicator(true)
 }

 const hideDeposit = () => {
  setCreateIndicator(true)
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
  setDipositIndicator(false)
}

const hideDepostAndForward = () => {
  setDipositIndicator(false)
  setWithdrawIndicator(true);
}

const showWithdraw = () => {
  setWithdrawIndicator(true)
}

const hideWithdraw = () => {
  setWithdrawIndicator(false)
  setDipositIndicator(true)
}

const hideWidthdrawAndForward = () => {
  setWithdrawIndicator(false)
  setBalanceIndicator(true)
}


const hideBalance = () => {
  setBalanceIndicator(false)
  showWithdraw();
}

  const logout = () => {
    localStorage.removeItem("persist:root");
    return window.location.replace("/login");
  }

    return (
      <div>
        { Object.keys(user).length !== 0?
        <div className="dashboard">
           <Nav showBalanceModal= {showBalanceModal} toggleProfile ={toggleProfile} userProfileInfo={userProfileInfo} close={close} imageProf={imageProf}/>
           
           {/*MOBIL */ } 



           {/*DESKTOP*/ } 

          <div className="hidden sm:block">
          <Split 
          gutterSize={4}
          direction="vertical" 
          minSize={0}
          sizes={[100,0]}
          style = {{height: "700px"}}
          >
            <Split 
            gutterSize={4}
            direction="horizontal" 
            minSize={0}
            sizes={[30, 40, 30]}
            className="flex">
              <div className="overflow-hidden">
              <IncomeExpeParent 
              expenseFetchError = {expenseFetchError}
              expenseList={expenseList} 
              setExpenseList={setExpenseList} 
              expenseId={expenseId} 
              setExpenseId={setExpenseId}
              updateLoader ={updateLoader}

              incomesFetchError = {incomesFetchError}
              incomeList = {incomeList}
              setIncomeList = {setIncomeList}
              incomeId = {incomeId}
              setIncomeId ={setIncomeId}
             
              start = {start}
              showSwitch ={showSwitch}

              switchIndicator = {switchIndicator}
              createIndicator = {createIndicator}
              hideSwitch  = { hideSwitch }
              showCreate = {showCreate }
              showDeposit = {showDeposit}
              hideSwitchAndForward = {hideSwitchAndForward}
              hideCreateAndForWard = {hideCreateAndForWard}
              hideCreate = {hideCreate}
              />
              </div>
              <div className="">
               <Split 
               sizes={[50,50]}
               gutterSize={4}
               minSize={10}
               direction="vertical"
               >
               <Tabs expenseList={expenseList} incomeList={incomeList} transactionList={transactionList} setTransactionList={setTransactionList} balanceModal={balanceModal}
               hideDepostAndForward = {hideDepostAndForward} finishTour = {finishTour } updateLoader ={updateLoader}
               hideDeposit = {hideDeposit} dipositIndicator={dipositIndicator} balanceIndicator ={balanceIndicator} withdrawIndicator = {withdrawIndicator} hideWithdraw = {hideWithdraw } hideWidthdrawAndForward = {hideWidthdrawAndForward } hideBalance = {hideBalance } 
               /> 
                <List transactionList={transactionList} setTransactionList={setTransactionList} updateLoader ={updateLoader}/>
               </Split>
               </div>



               <div className="">
                 <ChartDisplay transactionList={transactionList} profile={profile} logout={logout} token={token} userProfileInfo = {userProfileInfo} setUserProfileInfo = { setUserProfileInfo}/>
               </div>
            </Split>
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
      <div className="mt-5 flex flex-col justify-center items-center">
        <p className="text-gray-400 text-xs">Powered by Thiernope</p>
        <p className="text-gray-400 text-xs">copyright @Thiernope 2022</p>
        </div>

       </div>
    )
}

export default Dashboard