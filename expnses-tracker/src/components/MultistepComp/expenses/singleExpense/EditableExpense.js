import React, { useState, useEffect } from 'react'
import { List as MUIList, ListItem, ListItemSecondaryAction, IconButton} from "@material-ui/core"
import {SliderPicker } from "react-color"
import { useSelector } from "react-redux"
import useStyles from "./styles"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { PulseLoader } from 'react-spinners'
const EditableExpense = ({editInputRef, cancelEdit, expense, setExpenseList, expenseList}) => {
    const [loader, setLoader] = useState(null);
    const { user } = useSelector(state => state.loginUser);
    const token = user.token;
    const [colorPicker, setColorPicker ] = useState(false);
    const initialType = expense.type
    const initialColor = expense.color
    const [formData, setFormData ] = useState({
        type: initialType,
        color: initialColor,
        date: null
      })

     const toggleColorPicker = () => {
        setColorPicker(!colorPicker)
    }
    
    const closeColorPicker = () => {
        setColorPicker(false)
      }
    
      let myRef;

      useEffect(()=>{
          document.addEventListener('click', closePicker)
      })


      const closePicker = (e) => {
          if(myRef && !myRef.contains(e.target)) {
              closeColorPicker();
          }
      }

    
    const handleSubmit = async (id) => {
        try {
            setLoader(<PulseLoader size={5}/>)
          const res = await fetch(`https://money-tracking-app-20.herokuapp.com/expenses/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'token': 'Bearer ' + token
              },
              body: JSON.stringify(formData)
             })
  
             const data = await res.json();
             if(data.message === "Updated Successfully") {
              setLoader(null)
              const newExpenseList = [...expenseList];
              const index = expenseList.findIndex(expense => expense._id === data.updatedExpense._id);
              newExpenseList[index] = data.updatedExpense;
              setExpenseList(newExpenseList)
             return cancelEdit();
             } else {
              setLoader(null)
              return cancelEdit();
             }
        } catch (error) {
            console.log(error)
        }
    }
   
 
      
  const classes = useStyles();
  return (
    <div className="border-double border-2 border-sky-500">
        <div className="px-4">{loader}</div>
<MUIList dense={false} className={classes.listUpdated}>
     <ListItem className={classes.itemUpdated}>
     <div className="flex flex-col justify-center items-start">
     <input ref={editInputRef} type="text" className="h-4 block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""required 
     name = "type"
     value={formData.type}
     onChange = {(e)=> {setFormData({...formData, type: e.target.value})}}
     />
     <div>
     <style>
        {`.date-picker input {
          width: 70%;
          padding: 0px;
          font-size: 14px;
          height: 16px;
          cursor: pointer;
          color: gray;
          border: none;
      }`     
      }
      </style>
     <DatePicker
        name = "date"
        placeholderText={'Select a date'} 
        autoComplete = "off"
        selected={formData.date}
        onChange={date => setFormData({...formData, date: date})}
        dateFormat = "yyyy/MM/dd"
        isClearable
        showYearDropdown
        scrollableMonthYearDropdown
        wrapperClassName='date-picker'
        />
     </div>
     </div>
     <ListItemSecondaryAction>
     <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick={toggleColorPicker} >
         <div className="color"style={{backgroundColor:`${formData.color}`, width: "20px", height: "20px"}}></div>
         </IconButton>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick={() => handleSubmit(expense._id)}>
         <p className="text-sm">save</p>
         </IconButton>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick = {cancelEdit}>
         <p className="text-sm">cancel</p>
         </IconButton>
     </ListItemSecondaryAction>
 </ListItem>
<div ref={node => {myRef = node}}>
    {colorPicker && 
    <SliderPicker 
    name = "color"
    color ={formData.color} 
    onChange={updatedColor => setFormData({...formData, color : updatedColor.hex})}
    />
    }
 </div>
</MUIList>
</div>
  )
}

export default EditableExpense