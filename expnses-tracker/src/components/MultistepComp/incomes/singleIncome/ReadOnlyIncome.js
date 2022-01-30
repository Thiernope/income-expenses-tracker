import React, { useEffect } from 'react'
import { List as MUIList, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Slide} from "@material-ui/core"
import {Delete, Edit } from "@material-ui/icons/";
import { useSelector } from "react-redux"
import moment from "moment"
import useStyles from "./styles"
const ReadOnlyIncome = ({income, showIncomeToEdit, toggleEditInputRef, incomeList, setIncomeList}) => {
  const { user } = useSelector(state => state.loginUser);
  const token = user.token;

  const deleteIncomeById = async(id) => {
    try {
      const res = await fetch(`https://money-tracking-app-20.herokuapp.com/incomes/${id}`, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'token': 'Bearer ' + token
          }
        })
        const data = await res.json();
        if(data.message === "Deleted Successfully") {
          const newIncomes = [...incomeList];
          const index = incomeList.findIndex(inc => inc._id === income._id);
          newIncomes.splice(index, 1)
          setIncomeList(newIncomes)
        }
          } catch (error) {
          console.log(error)
       }
  }


  const classes = useStyles();
  return (
<MUIList dense= {false } className={classes.list}>
<Slide direction="down" in mountOnEnter unmountOnExit key={income._id}>
     <ListItem className={classes.item}>
     <ListItemText primary={income.type} secondary = {`${moment(income.date).format("MMMM Do YYYY")}`}/>
     <ListItemSecondaryAction>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick={()=> showIncomeToEdit(income._id)}>
         <Edit/>
         </IconButton>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons} onClick={()=> deleteIncomeById(income._id)}>
         <Delete />
         </IconButton>
         <IconButton edge ="end" area-label ="delete" className={classes.buttons}>
         <div className="color"style={{backgroundColor:`${income.color}`, width: "20px", height: "20px"}}></div>
         </IconButton>
     </ListItemSecondaryAction>
 </ListItem>
</Slide>
</MUIList>
  )
}

export default ReadOnlyIncome