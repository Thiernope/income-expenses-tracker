import React, {useState} from 'react'
import { Link } from "react-router-dom"
import {useSelector } from "react-redux"
import DatePicker from "react-datepicker"
import { PulseLoader } from 'react-spinners'
import "react-datepicker/dist/react-datepicker.css"
const Income = ({handleNext, incomeList, transactionList, setTransactionList,
  hideDepostAndForward,
  hideDeposit, 
  dipositIndicator,
  balanceIndicator,
  withdrawIndicator,
  hideWithdraw,
  hideWidthdrawAndForward,
  hideBalance,
  finishTour,
  updateLoader
}) => {
const { user } = useSelector(state => state.loginUser);
const token = user.token; 
const [message, setMessage] = useState(null);
const [loader, setLoader ] = useState(null)
  const [formData, setFormData ] = useState({
    category: "Income",
    type:"",
    amount: null,
    date: "",
    color: ""
  })

const depositUrl = "https://money-tracking-app-20.herokuapp.com/transactions"
const handleSubmit = async (e) => {
  e.preventDefault();
const selectedIncome = incomeList.filter(inc => inc.type === formData.type);
const newFormData = {...formData, color: selectedIncome[0].color}
console.log("FORM", formData)
console.log("FFF", formData.type)
if(formData.type === "") {
  return setMessage("Please select the income name")
} else if(formData.data === "") {
  return setMessage("Please select the date") 
} else if(formData.amount === null) {
  return setMessage("Please select the amount for your transaction")
}

try {
  setLoader(<PulseLoader size={5}/>)
  const res = await fetch(depositUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'token': 'Bearer ' + token
    },
    body: JSON.stringify(newFormData)
  })

  const data = await res.json();
  if(data.message === 'Created Successfully') {
    setLoader(null)
    setTransactionList([data.createdTransaction, ...transactionList])
   return setFormData({
    category: "Income",
    type:"",
    amount: 0,
    date: null,
    color: ""
   })
  } else if(data.status === "error") {
    setLoader(null)
    return setFormData({
      category: "Income",
      type:"",
      amount: null,
      date: null,
      color: ""
     })
  }
} catch (error) {
  console.log(error)
}

}


  return (
<div className="relative ">
<div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
    <ul className="flex justify-center">
    <li className="bg-green-50 w-full">
            <Link to="" className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">Make Diposit</Link>
        </li>
        <li className="bg-red-100 w-full"onClick={handleNext}>
            <Link to="" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Withdraw</Link>
        </li>
    </ul>
</div>
<form>
<div className="bg-green-50 flex flex-col justify-center items-center pt-8">
  <div className="w-9/12">
<div className="grid xl:grid-cols-2 xl:gap-6">
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
        value="Income"
        />
    </div>
    <div className="relative z-0 w-full mb-6 group">
    <select required value={formData.type} defaultValue={"default"} onChange = {e => setFormData({...formData, type: e.target.value})} id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
    <option defaultValue={"default"}>
          Choose one
        </option>
        {incomeList.map(inc => (
        <option key={inc._id} value={inc.type}>{inc.type}</option>
        ))}
    </select>
    </div>
  </div>
  <div className="grid xl:grid-cols-2 xl:gap-6">
    <div>
    <style>
        {`.dat-picker input {
          width: 100%;
          padding: 20px;
          padding-left: 0px;
          font-size: 14px;
          height: 16px;
          cursor: pointer;
          color: gray;
          border: none;
          border-bottom: 2px solid #d3d3d3;
          outline: none;
          background-color: #f3faf7;
      }
      `     
      }
      </style>
      <DatePicker
    name = "date"
    placeholderText={"Select a date"} 
    autoComplete = "off"
    selected={formData.date}
    onChange={date => setFormData({...formData, date: date})}
    dateFormat = "yyyy/MM/dd"
    isClearable
    showYearDropdown
    scrollableMonthYearDropdown
    wrapperClassName='dat-picker'
    />
    </div>
    <div className="relative z-0 w-full mb-6 group">
        <input type="number" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
        value={formData.amount}
        onChange = {e => setFormData({...formData, amount: Number(e.target.value)})}
        />
        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">$ amount</label>
    </div>
  </div>
</div>
<p className="text-red-500 text-xs mb-3"> {message} </p>
<p className="mb-3">{loader}</p>
{formData.type !== "" && formData.amount !== null && formData.date !== "" ? 
 <button type="submit" className="w-9/12 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleSubmit}>Submit</button>:
 <button disabled type="submit" className="w-9/12 cursor-not-allowed bg-gray-200 text-gray-400  focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleSubmit}>Submit</button>
}  
</div>
</form>
    {dipositIndicator &&
     <div className="flex flex-col justify-center items-center bg-orange-500 w-48 h-48 absolute bottom-12 left-32 rounded-b-full rounded-tr-full ">
     <p className="text-center text-xs w-5/6">Make deposit! register any amount earned from any of the registered sources of income.</p>
     <div className="mt-5 flex justify-between items-center">
         <p onClick = {hideDeposit}  className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Prev</p>
          <p onClick = {hideDepostAndForward} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Next</p>
         </div>
       </div>
      }
       {  withdrawIndicator && 
         <div className="z-50 flex flex-col justify-center items-center bg-orange-500 w-48 h-48 absolute bottom-12 -right-20 rounded-b-full rounded-tr-full ">
         <p className="text-center text-xs w-5/6">Withdraw. Register any amount you are going to spent on one of the registered potential expenses.</p>
         <div className="mt-5 flex justify-between items-center">
           <p onClick = { hideWithdraw} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Prev</p>
            <p onClick = { hideWidthdrawAndForward} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Next</p>
           </div>
         </div>
       }
      { balanceIndicator && 
      <div className="z-50 flex flex-col justify-center items-center bg-orange-500 w-48 h-48 absolute -top-7 -right-12 rounded-b-full rounded-tr-full ">
      <p className="text-center text-xs w-5/6">View your balance to see the amount you have spent and the amount remains in your balace.</p>
      {updateLoader}
      <div className="mt-5 flex justify-between items-center">
        <p onClick = { hideBalance} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Prev</p>
         <p onClick = {finishTour} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Finish</p>
        </div>
      </div>
      }
</div>
  )
}

export default Income