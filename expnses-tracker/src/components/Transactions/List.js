import React from 'react';
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide} from "@material-ui/core"
import {Delete, AttachMoney, MoneyOff } from "@material-ui/icons";
import moment from "moment"
import empty from "../../assets/empty.json"
import Lottie from "react-lottie"
import { useSelector } from "react-redux"
import useStyles from "./styles"
const List = ({transactionList, setTransactionList}) => {

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: empty,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    const { user } = useSelector(state => state.loginUser);
    const token = user.token;
    const deleteTransactionById = async (id) => {
        try {
          const response = await fetch(`https://money-tracking-app-20.herokuapp.com/transactions/${id}`, {
              method: 'DELETE',
              headers: {
              'Content-Type': 'application/json',
              'token': 'Bearer ' + token
              }
            })
            const data = await response.json();
            console.log("DDD",data)
            if(data.message === "Deleted Successfully") {
              const remainedTransactions = transactionList.filter(trans => trans._id !== data.trans._id)
              return setTransactionList(remainedTransactions)
            }
              } catch (error) {
              console.log(error)
           }
      }

    const classes = useStyles();
  return (
      <div>
          {transactionList.length >= 1 ? 
            <MUIList dense={false} className={classes.list}>
            {transactionList.map(trans => (
          <Slide direction="down" in mountOnEnter unmountOnExit key={trans._id}>
          <ListItem>
          <ListItemAvatar>
            <Avatar className={trans.category === "Income"? classes.avatarIncome:classes.avatarExpense}>
                  {trans.category ==="Income"? <AttachMoney/> : <MoneyOff/>}
              </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${trans.type}`} secondary = {`$ ${trans.amount} - ${moment(trans.date).format("MMMM Do YYYY")}`}/> 
          <ListItemSecondaryAction>
              <IconButton edge ="end" area-label ="delete" onClick={() => deleteTransactionById(trans._id)}>
              <Delete />
              </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        </Slide>
            ))}
        </MUIList>:
        <div className="flex flex-col justify-center items-center">
            <h1>No transactions found</h1>
            <Lottie options={defaultOptions}
                className="lottie"
                height={150}
                width={150}
            />
        </div>    
        }
   </div>
  );
}

export default List;
