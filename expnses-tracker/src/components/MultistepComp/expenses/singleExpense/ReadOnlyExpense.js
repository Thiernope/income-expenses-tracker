import React from 'react'
import { List as MUIList, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Slide} from "@material-ui/core"
import { useSelector } from "react-redux"
import {Delete, Edit } from "@material-ui/icons/";
import moment from "moment"
import useStyles from "./styles"
const ReadOnlyExpense= ({expense, showExpenseToEdit, toggleEditInputRef, expenseList, setExpenseList, expenseId}) => {
  const { user } = useSelector(state => state.loginUser);
  const token = user.token;

  const deleteExpenseById = async(id) => {
  
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
<Slide direction="down" in mountOnEnter unmountOnExit key={expense._id}>
     <ListItem className={classes.item}>
     <ListItemText primary={expense.type} secondary = {`${moment(expense.date).format("MMMM Do YYYY")}`}/>
     <ListItemSecondaryAction>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick={()=> showExpenseToEdit(expense._id)}>
         <Edit/>
         </IconButton>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick={()=> deleteExpenseById(expense._id)}>
         <Delete />
         </IconButton>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons}>
         <div className="color"style={{backgroundColor:`${expense.color}`, width: "20px", height: "20px"}}></div>
         </IconButton>
     </ListItemSecondaryAction>
 </ListItem>
</Slide>
</MUIList>
  )
}

export default ReadOnlyExpense