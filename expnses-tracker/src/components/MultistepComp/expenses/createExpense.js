import React, { useEffect, useState } from 'react'
import {ColorLens, DateRange, Close} from "@material-ui/icons/";
import DatePicker from "react-datepicker"
import { useSelector } from "react-redux"
import Error from "../../notifications/Error"
import Success from "../../notifications/Success"
import "react-datepicker/dist/react-datepicker.css"
import {IconButton} from "@material-ui/core"
import {SliderPicker } from "react-color"
const CreateExpense= ({formComponent, hideForm, inputRef,  expenseList, setExpenseList}) => {
const { user } = useSelector(state => state.loginUser)
const token = user.token;
const [showDatePicker, setShowDatePicker] = useState(false);
const [message, setMessage] = useState(null);
const [colorPicker, setColorPicker ] = useState(false);
const [formData, setFormData ] = useState({
  type: "",
  color: "#EC7063",
  date: null
})

const createExpUrl = "https://money-tracking-app-20.herokuapp.com/expenses/"
const handleSubmit = async (e) => {
  e.preventDefault();
try {
  const res = await fetch(createExpUrl , {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'token': 'Bearer ' + token
    },
    body: JSON.stringify(formData)
  })
  const data = await res.json();
  if(data.message === "Created Successfully") {
    //setMessage(<Success success = { data.message}/>)
    const createdExpense = data.createdExpense;
    setExpenseList([createdExpense, ...expenseList])
    hideForm();
    setFormData({
      type: "",
      color: "#EC7063",
      date: null
    })

    setTimeout(()=>{
      return setMessage(null)
    }, 1000);
  } else if(data.message === "The type of income already exsit") {
    setMessage(<Error error = {data.message}/>)
    hideForm();
    setFormData({
      type: "",
      color: "#EC7063",
      date: null
    })

    setTimeout(()=>{
      return setMessage(null)
    }, 4000);
  }
} catch (error) {
  
}
}
console.log(formData)
const toggleColorPicker = () => {
    setColorPicker(!colorPicker)
}

const closeColorPicker = () => {
  setColorPicker(false)
}
const showColorPicker = () => {
  setColorPicker(true)
}

const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
}

let myRef;
useEffect(()=>{
  document.addEventListener("click", closeForm);
})

const closeForm = (e) => {
if(myRef && !myRef.contains(e.target)) {
  closeColorPicker();
}
}
  return (
    <div>
    {formComponent && 
    <div>
     <div className="flex justify-end items-center">
     <Close style={{fontSize: "15px", marginRight: "10px", cursor: "pointer"}} onClick={hideForm}/>
   </div>
 <form>
 <div className="flex justify-around items-center">
   <div className="relative z-0 w-full mb-6 group">
       <input type="text" name="type" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" 🖊️ ...Your potential expense" required 
       value = {formData.type}
       onChange = {(e)=> {setFormData({...formData, type: e.target.value})}}
       ref={inputRef}
       />
   </div>
   <div onClick={toggleColorPicker}>
   <IconButton edge ="end" area-label ="delete" style={{marginRight: "10px"}}>
     <ColorLens/>
   </IconButton>
   </div>
   <div onClick={toggleDatePicker}>
   <IconButton edge ="end" area-label ="delete" style={{marginRight: "10px"}} onMouseOver={closeColorPicker}>
     <DateRange />
   </IconButton>
   </div>
   <IconButton edge ="end" area-label ="delete" style={{marginRight: "10px"}} type='submit' onClick={handleSubmit}>
     <p className="text-sm text-green-500">Add</p>
   </IconButton>
 </div>
 <div ref={node => {myRef = node}}>
 {colorPicker && 
 <SliderPicker 
 name = "color"
 color ={formData.color} 
 onChange={updatedColor => setFormData({...formData, color : updatedColor.hex})}/>}
 </div>
 <div className="flex justify-between">
 <div>
 {formData.color !== "#fff" ? 
   <div>
 <div onClick ={showColorPicker} style={{backgroundColor: `${formData.color}`, height: "42px", width: "100px", cursor: "pointer"}}></div>
 </div>: null
 }
 </div>

 <div>
 {showDatePicker && 
 <DatePicker
 name = "date"
 placeholderText={'Please select a date'} 
 selected={formData.date}
 onChange={date => setFormData({...formData, date: date})}
 dateFormat = "yyyy/MM/dd"
 isClearable
 showYearDropdown
 scrollableMonthYearDropdown
 />
 }
 </div>
 </div>
 </form>
 </div>
    }
    {message}
    </div>
  )
}

export default  CreateExpense