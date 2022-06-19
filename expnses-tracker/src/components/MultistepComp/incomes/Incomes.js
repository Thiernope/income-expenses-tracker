import React, { useState, useRef} from 'react'
import CrudIncome from "./CreateIncome";
import {IconButton} from "@material-ui/core"
import Lottie from "react-lottie"
import empty from "../../../assets/empty.json"
import {Delete, Add } from "@material-ui/icons/";
import ReadOnlyIncome from './singleIncome/ReadOnlyIncome'
import EditableIncome from "./singleIncome/EditableIncome"
import "./incomes.css"
const Incomes = ({handleNext,incomesFetchError, incomeList, setIncomeList, incomeId, setIncomeId}) => {
const [formComponent, setFormComponent] = useState(false);



const showForm = () => {
  setFormComponent(true)
}

const hideForm = () => {
  setFormComponent(false)
}

const showIncomeToEdit = (id) => {
setIncomeId(id)
}

const cancelEdit = () => {
  setIncomeId("")
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
     <div className="header">
        <h2 className="title">Sources of income</h2>
        <IconButton edge ="end" area-label ="delete" style={{marginRight: "10px"}}>
         <Delete />
         </IconButton>
        </div>
        <CrudIncome formComponent={formComponent} hideForm ={hideForm} inputRef={inputRef} setIncomeList={setIncomeList} incomeList={incomeList}/>
     
       {incomeList.length >= 1? 
      <div className="h-full">
      {incomeList.map((inc) => (
        <div key={inc._id}>
          {incomeId === inc._id ? 
        <EditableIncome key={inc._id} income={inc} editInputRef = {editInputRef} cancelEdit ={cancelEdit} incomeList={incomeList} setIncomeList={setIncomeList}/>:
        <ReadOnlyIncome key={inc._id} income={inc} showIncomeToEdit={showIncomeToEdit} toggleEditInputRef = {toggleEditInputRef} incomeList={incomeList} setIncomeList={setIncomeList} incomeId={incomeId}/>
        } 
        </div>
      ))}
      </div>: 
      <div className="empty">
      
      <h1>No source of income list</h1>
     
       <Lottie options={defaultOptions}
         className="lottie"
         height={150}
         width={150}
       />
     </div>
     }
      <div className="btDiv">
        <div className="flex justify-start items-center w-1/2">
      <button onClick={handleNext}>View Expenses</button> 
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

export default Incomes