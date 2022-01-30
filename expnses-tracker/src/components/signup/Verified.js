import React, { useState, useEffect } from 'react'
import verified from "../../assets/verified.json"
import denied from "../../assets/denied.json"
import Lottie from "react-lottie"
import { Link, useParams } from "react-router-dom";

const Verified = () => {
const [message, setMessage] = useState("Loading...")
const {id, token } = useParams();
const verifyUrl = `https://money-tracking-app-20.herokuapp.com/user/${id}/verify/${token}`
const verify = async () => {
try {
    const response = await fetch(verifyUrl, {
        method: 'GET', 
      })
      const data = await response.json();
      return data;
} catch (error) {
    console.log(error)
}
}

useEffect(()=>{
    try {
        const fetchData = async () =>{
            const info = await verify();
            setMessage(info.message);
            console.log(info); 
        }

        fetchData();
    } catch (error) {
        console.log(error)
    }
},[])


const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: verified,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptionsError = {
    loop: true,
    autoplay: true, 
    animationData: denied,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return (
    <div className="flex flex-col items-center justify-center">

    {message === "Invilid or Expired link"? 
    <div className="">
    <div className="flex flex-col justify-center items-center">
    <Lottie options={defaultOptionsError}
       className="lottie"
       height={250}
       width={250}
     />
     <div><h1 className="text-red-500 text-sm">{message}</h1></div>
    </div>
   </div>: message === "Account is verified"? 
   <div className="flex flex-col justify-center items-center">
    <div className="flex flex-col justify-center items-center">
   <Lottie options={defaultOptions}
      className="lottie"
      height={350}
      width={350}
    />
   </div>
   <h1>{message}</h1>
   <Link to="/login" className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Continue to login
  </span>
</Link>
</div>: null 
    }
    
    </div>
  )
}

export default Verified