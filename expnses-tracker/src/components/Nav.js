import React from 'react'
import Balance from "./Balance"
const Nav = ({showBalanceModal, toggleProfile}) => {
  return (
    <div className="h-16 flex justify-between items-center">
    <div>Thiernope</div>
    <Balance showBalanceModal= {showBalanceModal}/>
    <div onClick={toggleProfile}>
    <img src="https://res.cloudinary.com/dev-ltd/image/upload/v1652044276/WhatsApp_Image_2022-05-06_at_10.08.20_AM_czpfvo.jpg" alt="user" className="w-12 h-12 object-cover rounded-full"/>
    </div>
</div>
  )
}

export default Nav