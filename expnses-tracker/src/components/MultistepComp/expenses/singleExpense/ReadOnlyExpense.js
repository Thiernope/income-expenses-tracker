import React, {useState} from 'react'
import { List as MUIList, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Slide} from "@material-ui/core"
import { useSelector } from "react-redux"
import {Delete, Edit } from "@material-ui/icons/";
import PulseLoader from "react-spinners/PulseLoader"
import moment from "moment"
import useStyles from "./styles"
const ReadOnlyExpense= ({expense, showExpenseToEdit, toggleEditInputRef, expenseList, setExpenseList, expenseId}) => {
  const { user } = useSelector(state => state.loginUser);
  const token = user.token;
  const [loader, setLoader ] = useState(null)
  const deleteExpenseById = async(id) => {
    setLoader(<PulseLoader size={5}/>)
     try {
       const res = await fetch(`https://money-tracking-app-20.herokuapp.com/expenses/${id}`, {
           method: 'DELETE',
           headers: {
           'Content-Type': 'application/json',
           'token': 'Bearer ' + token
           }
         })
         const data = await res.json();
         if(data.message === "Deleted Successfully") {
          setLoader(null)
           const remainedExpenses = expenseList.filter(exp => exp._id !== expense._id)
           setExpenseList(remainedExpenses);
         }
           } catch (error) {
           console.log(error)
        }
   }


  const classes = useStyles();
  return (
<MUIList dense={false} className={classes.list}>
<div className="flex justify-end items-center">
       {loader}
  </div>
<Slide direction="down" in mountOnEnter unmountOnExit key={expense._id}>
     <ListItem style={{borderLeft:`2px solid ${expense.color}`}}>
     <ListItemText primary={expense.type} secondary = {`${moment(expense.date).format("MMMM Do YYYY")}`}/>
     <ListItemSecondaryAction>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick={()=> showExpenseToEdit(expense._id)}>
         <Edit/>
         </IconButton>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick={()=> deleteExpenseById(expense._id)}>
         <Delete />
         </IconButton>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons}>
         <div className="color" style={{backgroundColor:`${expense.color}`, width: "20px", height: "20px"}}></div>
         </IconButton>
     </ListItemSecondaryAction>
 </ListItem>
</Slide>
</MUIList>
  )
}

export default ReadOnlyExpense