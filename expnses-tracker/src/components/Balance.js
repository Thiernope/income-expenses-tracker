import React from 'react'
import {IconButton} from "@material-ui/core"
import {ExpandMore} from "@material-ui/icons";
const Balance = ( { showBalanceModal}) => {
  return (
    <div className='w-1/3 flex justify-end items-center'>
          <IconButton edge ="end" area-label ="delete" onClick={showBalanceModal}>
          <p className="text-sm">Balance</p><ExpandMore/>
         </IconButton>
    </div>
  )
}

export default Balance