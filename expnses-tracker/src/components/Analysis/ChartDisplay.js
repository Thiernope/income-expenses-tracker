import React, {useState} from 'react'
import Line from "./Displays/Line"
import Polar from "./Displays/Polar"
import DoughnutView from "./Displays/DoughnutView"
import {BsFillPersonCheckFill} from "react-icons/bs"
import {useSelector } from "react-redux"
import { FiUserX } from "react-icons/fi"
import PulseLoader from "react-spinners/PulseLoader"
import moment from "moment"
import {MoreVert} from "@material-ui/icons/";
import {IconButton} from "@material-ui/core"
const ChartDisplay = ({token,transactionList, profile, logout}) => {
const { isLoading, user, error } = useSelector(state => state.userProfile)
const [activeStep, setActiveStep ] = useState(0);
const [showDeleteBtn, setShowDeleteBtn] = useState(false)
const [conformDelete, setConfirmDelete] = useState(false)
const [settings, toggleSettings ] = useState(false)
const [inputValue, setInputValue] = useState("")
const [loader, setLoader] = useState("")
const showOrHidSettings = () => {
  toggleSettings(!settings)
}
const showDelete = () => {
  cancelDelete()
  setShowDeleteBtn(true)
}

const hideDelete = () => {
  setShowDeleteBtn(false)
}

const showConfirmDel = () => {
  setConfirmDelete(true)
  hideDelete();
}

const cancelDelete = () => {
  setConfirmDelete(false)
}

const selectDoughnut = () => {
  setActiveStep(0)
}
const selectLine = () => {
    setActiveStep(1)
}

const selectPolar = () => {
  setActiveStep(2)
}

const deleteAccount = async (id) => {
try {
  const res = await fetch(`https://money-tracking-app-20.herokuapp.com/user/delete-account/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'token': 'Bearer ' + token
    }
  })

  const data = await res.json();
  return data;
} catch (error) {
  console.log(error)
}
}


const confirmDeleteAccount = async (id) => {
  if( inputValue !== "I agree.") {
    return alert("Please type 'I agree.' in the input")
  }
  setLoader(<PulseLoader size={5}/>)
try {
  const data = await deleteAccount(id);
  if(data.message) {
    setLoader(null)
    return logout()
  }
} catch (error) {
  console.log(error)
}
}



const getActiveStep = (step) => {
switch(step) {
case 0: return <DoughnutView transactionList={transactionList} selectDoughnut={selectDoughnut} selectLine ={selectLine} selectPolar={selectPolar}/>
case 1: return <Line transactionList={transactionList} selectDoughnut={selectDoughnut} selectLine ={selectLine} selectPolar={selectPolar}/>
case 2: return <Polar transactionList={transactionList} selectDoughnut={selectDoughnut} selectLine ={selectLine} selectPolar={selectPolar}/>
default: return<DoughnutView transactionList={transactionList}/>
}
}



  return (
    <div className="relative">
       <div>
         <h1>Analysis</h1>
       {getActiveStep(activeStep)}
       </div>

       {profile  && 
         <div className="bg-white absolute top-0 right-0 left-0 bottom-0">
           {isLoading? <div className="flex justify-center items-center h-full"><PulseLoader/></div>:
           error? <h1>Error</h1>:
           <div>
           <div className="flex justify-end items-center w-full" onClick={showOrHidSettings}>
       <IconButton edge ="end" area-label ="delete" style={{marginRight: "10px"}}>
          <MoreVert />
        </IconButton>
         </div>
         <div className="flex flex-col justify-center items-center">
           <div className={`${user.profilePicture === "https://res.cloudinary.com/dev-ltd/image/upload/v1639572913/sample.jpg"? "relative w-48 h-48 bg-green-500 rounded-full flex justify-center items-center": "relative w-48 h-48 rounded-full flex justify-center items-center"}`}>
             {user.profilePicture === "https://res.cloudinary.com/dev-ltd/image/upload/v1639572913/sample.jpg"? 
             <h1 className="text-xl">{user.firstName[0] + user.lastName[0]}</h1>:
             
             <img src={user.profilePicture} alt="user profile" className=" asolute w-full h-full object-cover rounded-full"/>
            }
           </div>
           <div className="mt-5 flex flex-col justify-center items-center">
           <h1>{user.firstName + " " + user.lastName}</h1>
           <p className="text-sm">{user.email}</p>
           </div>
           <div className=" border border-dotted border-green-500 rounded p-2 mt-5 flex flex-col justify-center items-center bg-indigo-300">
           <h1 className="text-xs">Joined since:</h1>
           <p className="text-xs">{moment(user.createdAt).format("MMMM Do YYYY")}</p>
           </div>
           <div className="mt-5 flex justify-between items-center">
           <h1 className="text-sm">Status: {user.verified === true? "verified": "not verified"}</h1>
           {user.verified === true? <div className="ml-5 text-green-500"> <BsFillPersonCheckFill/></div>: 
           <div className="ml-5 text-red-500"> <FiUserX /></div>}
           </div>

          {settings &&
          <div className="bg-gray-50 absolute p-1 top-12 right-0 rounded">
          <ul className="space-y-2">
        <li>
           <p class="cursor-pointer flex items-center px-1 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="text-sm flex-1 ml-3 whitespace-nowrap">Edit</span>
           </p>
        </li>
        <li onClick={showDelete}>
           <p className="cursor-pointer flex items-center px-1 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="hover:text-red-500 text-sm flex-1 ml-3 whitespace-nowrap">Delete</span>
           </p>
        </li>
        <li onClick = {logout}>
           <p className="cursor-pointer flex items-center px-1 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="text-sm flex-1 ml-3 whitespace-nowrap">Logout</span>
           </p>
        </li>
        </ul>
          </div>
          }
          
           {showDeleteBtn && 
            <div className="mt-5 w-48 flex flex-col justify-center items-center">
            <div className="relative z-0 w-full mb-6 group">
                <p className=" text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">Do you want to delete your account?</p>
            </div>
            <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={showConfirmDel}>Delete Account</button>
          </div>
           }

           {conformDelete && 
             <form className="mt-5 w-48">
             <p className="text-xs">Are you absolutely sure you want to delete your account? Type <span className="text-red-500 underlined">"I agree."</span> in the input below to complete the action.</p>
             <div className="mt-3">
               <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">This actions is undone</label>
               <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               value = {inputValue}
               onChange = {(e)=> {setInputValue(e.target.value)}}
               />
             </div>
               <div className="mt-3 flex justify-between items-center">
                 {inputValue === "I agree."? <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={()=>confirmDeleteAccount(user._id)}>{loader} Delete</button>:
                 <button disabled type="button" className="text-white bg-gray-200 cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
                 }
               <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={cancelDelete}>Cancel</button>
               </div>
            </form>
           }
         </div>
       </div>
           }
       </div>
       }
     </div>
  )
}

export default ChartDisplay