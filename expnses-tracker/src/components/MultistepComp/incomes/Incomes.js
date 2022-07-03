import React, { useState, useRef} from 'react'
import CrudIncome from "./CreateIncome";
import {IconButton} from "@material-ui/core"
import Lottie from "react-lottie"
import { FaRobot } from "react-icons/fa"
import empty from "../../../assets/empty.json"
import {Delete, Add } from "@material-ui/icons/";
import ReadOnlyIncome from './singleIncome/ReadOnlyIncome'
import EditableIncome from "./singleIncome/EditableIncome"
import "./incomes.css"
const Incomes = ({handleNext, incomeList, setIncomeList, incomeId, setIncomeId,
  start,
  showSwitch,
  hideSwitchAndForward,
  switchIndicator,
  createIndicator,
  hideSwitch,
  hideCreateAndForWard,
  hideCreate,
  updateLoader
  
}) => {
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
   
   <div style={{height: "100%", position: "relative", overflow: "scroll", display: "flex", flexDirection: "column"}}>
     <div className="header">
        <h2 className="title p-4">Sources of income</h2>
        {/* <IconButton edge ="end" area-label ="delete" style={{marginRight: "10px"}}>
         <Delete />
         </IconButton> */}
        </div>
        <CrudIncome formComponent={formComponent} hideForm ={hideForm} inputRef={inputRef} setIncomeList={setIncomeList} incomeList={incomeList}/>
     
       {incomeList.length >= 1? 
      <div className="h-full overflow-scroll">
      {incomeList.map((inc) => (
        <div key={inc._id}>
          {incomeId === inc._id ? 
        <EditableIncome key={inc._id} income={inc} editInputRef = {editInputRef} cancelEdit ={cancelEdit} incomeList={incomeList} setIncomeList={setIncomeList}/>:
        <ReadOnlyIncome key={inc._id} income={inc} showIncomeToEdit={showIncomeToEdit} toggleEditInputRef = {toggleEditInputRef} incomeList={incomeList} setIncomeList={setIncomeList} incomeId={incomeId}/>
        } 
        </div>
      ))}
      </div>: updateLoader != null? <div className="flex justify-center items-center h-screen"> {updateLoader}</div>:
      <div className="empty">
        {start === false?  
           <div className="flex flex-col justify-center items-center bg-orange-500 w-48 h-48 absolute top-0 left-0 ">
           <h1>Take a Tour!</h1>
           <p className="text-center text-xs w-5/6">Would you like to use my alan ai Robot? </p>
           <FaRobot className="text-7xl"/>
           <div className="mt-5 flex justify-between items-center">
           <p className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Ignore</p>
            <p onClick={showSwitch} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Next</p>
           </div>
         </div> : null
        }

      <h1>No source of income list</h1>
     
       <Lottie options={defaultOptions}
         className="lottie"
         height={100}
         width={100}
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

      { createIndicator &&
         <div className="flex flex-col justify-center items-center bg-orange-500 w-48 h-48 absolute bottom-12 right-12 rounded-t-full rounded-bl-full ">
         <p className="text-center text-xs w-5/6">Add either new source of income or new potential expense</p>
         <div className="mt-5 flex justify-between items-center">
          <p onClick = {hideCreate} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Prev</p>
           <p onClick = {hideCreateAndForWard}className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Next</p>
          </div>
        </div> 
      }
      { switchIndicator && 
      <div className="flex flex-col justify-center items-center bg-orange-500 w-48 h-48 absolute bottom-12 left-12 rounded-t-full rounded-br-full ">
      <p className="text-center text-xs w-5/6">Switch to see either expenses list or sources of incomes available</p>
      <div className="mt-5 flex justify-between items-center">
      <p onClick = {hideSwitch} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Prev</p>
       <p onClick = {hideSwitchAndForward} className="cursor-pointer bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Next</p>
      </div>
    </div> 
      }
      
      </div>
      </div>
     </div>
  )
}

export default Incomes