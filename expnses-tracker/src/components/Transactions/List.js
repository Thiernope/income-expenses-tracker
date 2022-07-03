import React, {useState} from 'react';
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide} from "@material-ui/core"
import {Delete, AttachMoney, MoneyOff } from "@material-ui/icons";
import { PulseLoader } from 'react-spinners';
import moment from "moment"
import empty from "../../assets/empty.json"
import Lottie from "react-lottie"
import { useSelector } from "react-redux"
import useStyles from "./styles"
const List = ({transactionList, setTransactionList, updateLoader }) => {
const [loader, setLoader ] = useState(null)
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
      setLoader(<PulseLoader size={5}/>)
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
              setLoader(null)
              const remainedTransactions = transactionList.filter(trans => trans._id !== data.trans._id)
              return setTransactionList(remainedTransactions)
            }
              } catch (error) {
              console.log(error)
              setLoader(null)
           }
      }

    const classes = useStyles();
  return (
      <div>
        <div className="flex justify-end">
        {loader}
        </div>
          {transactionList.length >= 1 ? 
            <MUIList dense={false} className={classes.list}>
            {transactionList.map(trans => (
          <Slide direction="down" in mountOnEnter unmountOnExit key={trans._id}>
          <ListItem>
          <ListItemAvatar>
            <Avatar style={{backgroundColor: `${trans.color}`, color: "#fff"}}>
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
        </MUIList>: updateLoader !== null ? <div className="flex justify-center items-center h-48">{updateLoader}</div>:
        <div className="flex flex-col justify-center items-center h-full h-48">
            <h1>No transactions found</h1>
            <Lottie options={defaultOptions}
                className="lottie"
                height={100}
                width={100}
            />
        </div>    
        }
   </div>
  );
}

export default List;
