import React from 'react'
import Balance from "./Balance"
import Close from './icons/Close'
const Nav = ({showBalanceModal, toggleProfile, userProfileInfo, close, imageProf}) => {

  return (
    <div className="h-16 flex justify-between items-center">
    <div>Thiernope</div>
    <div className="flex justify-between items-center w-1/2">
      <div className="w-1/2">
      <Balance showBalanceModal= {showBalanceModal}/>
      </div>
      <div className="w-1/2 cursor-pointer">
      {close && <div onClick={toggleProfile} className="flex justify-end items-center"><Close/></div>}
    <div onClick={toggleProfile} className="flex justify-end items-center">
    {imageProf && <div>
      {userProfileInfo.profilePicture === ""? 
             <div className="relative w-12 h-12 bg-green-200 rounded-full flex justify-center items-center">
             <h1 className="text-md">{userProfileInfo.firstName[0] + userProfileInfo.lastName[0]}</h1>
             </div>:
              <div className="relative w-12 h-12 rounded-full flex justify-center items-center">
             <img src={userProfileInfo.profilePicture} alt="user profile" className=" asolute w-full h-full object-cover object-top rounded-full"/> 
             </div>
          }
      </div>}
    </div>
      </div>
    </div>
</div>
  )
}

export default Nav