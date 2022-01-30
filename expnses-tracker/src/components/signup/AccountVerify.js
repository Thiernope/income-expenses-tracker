import React from 'react'
import "./accountVerify.css"
import email from "../../assets/email.json"
import Lottie from "react-lottie"
import { useSelector } from "react-redux"
const AccountVerify = () => {
    const { signup } = useSelector(state => state.signupUser)

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: email,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <div className="">
    <Lottie options={defaultOptions}
       className="lottie"
       height={250}
       width={250}
     />
    </div>
    <div className="text-center p-4 max-w-xs">{signup && <p>{signup.message}</p>}</div>
    </div>
  )
}

export default AccountVerify;