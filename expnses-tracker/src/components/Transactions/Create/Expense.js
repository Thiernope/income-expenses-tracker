import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
const Expense = ({handlePrev, expenseList, transactionList, setTransactionList, balance}) => {
  const { user } = useSelector(state => state.loginUser);
  const token = user.token;
    const [formData, setFormData ] = useState({
      category: "Expense",
      type:"",
      amount: 0,
      date: null,
      color: ""
    })
  
  const depositUrl = "https://money-tracking-app-20.herokuapp.com/transactions"
  const handleSubmit = async (e) => {
    e.preventDefault();
  const selectedExp = expenseList.filter(exp => exp.type === formData.type);
  console.log("SEL", selectedExp[0])
  const newFormData = {...formData, color: selectedExp[0].color}
  console.log("FORM", formData)
  console.log("NUM", formData.amount)
  console.log("New", newFormData)

  if(formData.amount > balance) {
    return alert("No enough balance for this transaction")
  }
  try {
    const res = await fetch(depositUrl, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token': 'Bearer ' + token
      },
      body: JSON.stringify(newFormData)
    })
  
    const data = await res.json();
    console.log("DATA", data)
    if(data.message === 'Created Successfully') {
      setTransactionList([data.createdTransaction, ...transactionList])
     return setFormData({
      category: "Expense",
      type:"",
      amount: 0,
      date: null,
      color: ""
     })
    } else if(data.status === "error") {
      return setFormData({
        category: "Expense",
        type:"",
        amount: 0,
        date: null,
        color: ""
       })
    }
  } catch (error) {
    console.log(error)
  }
  
  }
  
  return (
    <div>
<div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
    <ul className="flex justify-center">
        <li className="bg-green-50 w-full" onClick={handlePrev}>
            <Link to="" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Make Diposit</Link>
        </li>
        <li className="bg-red-50 w-full">
            <Link to=""  className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">Withidraw</Link>
        </li>
    </ul>
</div>
<form>
<div className="bg-red-50 flex flex-col justify-center items-center pt-8">
  <div className="w-9/12">
<div className="grid xl:grid-cols-2 xl:gap-6">
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
        value="Expense"
        />
    </div>
    <div className="relative z-0 w-full mb-6 group">
    <select defaultValue={formData.type}  onChange = {e => setFormData({...formData, type: e.target.value})} id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
       <option>
          Select...
        </option>
        {expenseList.map(exp => (
        <option key={exp._id} value={exp.type}>{exp.type}</option>
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
          background-color: #fdf2f2;
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
        <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
        value={formData.amount}
        onChange = {e => setFormData({...formData, amount: e.target.value})}
        />
        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
    </div>
  </div>
  </div>
  <div className="w-9/12 cursor-pointer" onClick = {handleSubmit}>
  <div className="w-full mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
  <span className="w-full relative flex justify-center items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Enter
  </span>
</div>
</div>
</div>
</form>
</div>
  )
}

export default Expense