import React from 'react';
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide} from "@material-ui/core"
import {Delete, AttachMoney, MoneyOff } from "@material-ui/icons";
import useStyles from "./styles"
import { useSelector, useDispatch } from 'react-redux';
import { DeleteTransaction } from '../transactions/actons';

const List = () => {
const dispatch = useDispatch();
const { transactions } = useSelector(state => state.transactions)
const classes = useStyles();
const deleteTransaction = (id) => {
    dispatch(DeleteTransaction(id));
}
  return (
   <MUIList dense={false} className={classes.list}>
    { transactions.map((transaction) => (
    <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
         <ListItem>
         <ListItemAvatar>
             <Avatar className={transaction.type === "Income"? classes.avatarIncome:classes.avatarExpense}>
                 {transaction.type ==="Income"? <AttachMoney/> : <MoneyOff/>}
             </Avatar>
         </ListItemAvatar>
         <ListItemText primary={transaction.category} secondary = {`${transaction.amount} - ${transaction.date}`}/>
         <ListItemSecondaryAction>
             {console.log(transaction.id)}
             <IconButton edge ="end" area-label ="delete" onClick= {()=> deleteTransaction(transaction.id)}>
             <Delete />
             </IconButton>
         </ListItemSecondaryAction>
     </ListItem>
    </Slide>
    ))}
   </MUIList>
  );
}

export default List;
