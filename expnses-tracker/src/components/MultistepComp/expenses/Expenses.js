import React, {useState, useRef} from 'react'
import CreateExpense from "./createExpense";
import EditableExpense from './singleExpense/EditableExpense';
import {Delete, Add } from "@material-ui/icons/";
import Lottie from "react-lottie"
import empty from "../../../assets/empty.json"
import ReadOnlyExpense from './singleExpense/ReadOnlyExpense'
import {IconButton} from "@material-ui/core"
import "./expenses.css"
const Expenses = ({handlePrev, expenseList, setExpenseList, expenseId, setExpenseId}) => {
const [formComponent, setFormComponent] = useState(false);
const showForm = () => {
  setFormComponent(true)
}

const hideForm = () => {
  setFormComponent(false)
}


const showExpenseToEdit = (id) => {
  setExpenseId(id)
  }
  
  const cancelEdit = () => {
    setExpenseId("")
  }

  const inputRef = useRef();
  const toggleInputFocus = () => {
   inputRef.current.focus();
  }

const editInputRef = useRef();
const toggleEditInputRef = () => {
  editInputRef.current.focus();
}
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
   
   <div style={{height: "calc(100vh - 4rem)", position: "relative", overflow: "scroll", display: "flex", flexDirection: "column"}}>
      <div className="headerExp">
        <h2 className="title">Potential expenses</h2>
        <IconButton edge ="end" area-label ="delete" style={{marginRight: "10px"}}>
         <Delete />
         </IconButton>
        </div>

        <CreateExpense formComponent={formComponent} hideForm ={hideForm} inputRef ={inputRef} expenseList={expenseList} setExpenseList={setExpenseList}/>
     
    {
     expenseList.length >= 1? 
     <div className="h-full">
      {expenseList.map((expense) => (
        <div key={expense._id}>
        {expenseId === expense._id ? 
      <EditableExpense  key={expense._id} expense={expense} editInputRef = {editInputRef} cancelEdit ={cancelEdit} expenseList={expenseList} setExpenseList={setExpenseList}/>:
      <ReadOnlyExpense key={expense._id} expense={expense} showExpenseToEdit={showExpenseToEdit} toggleEditInputRef = {toggleEditInputRef} expenseList ={expenseList} setExpenseList = {setExpenseList} expenseId = {expenseId}/>
      } 
      </div>
      ))}
      </div>:
      <div className="empty">
       <h1>No expenses list</h1>
       
        <Lottie options={defaultOptions}
          className="lottie"
          height={150}
          width={150}
        />
      </div>
      }
      <div className="btDiv">
      <div className="flex justify-start items-center w-1/2">
      <button onClick={handlePrev}>View incomes</button> 
      </div>
      <div className="flex justify-end items-center w-1/2"> 
      <div onClick ={showForm}>
      <IconButton edge ="end" area-label ="delete" style={{marginRight: "10px", border: "1px solid green"}}>
         <Add className="text-green-500"/>
         </IconButton>
      </div>
      </div>
      </div>
     </div>
  )
}

export default Expenses