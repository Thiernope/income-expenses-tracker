import React, {useEffect} from 'react'
import Dashboard from './Dashboard'
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import { Routes, Route} from "react-router-dom"
import AccountVerify from './components/signup/AccountVerify'
import Verified from "./components/signup/Verified"
import EmailVerification from './components/resetPassword/EmailVerification'
import ResetPass from './components/resetPassword/ResetPass'
import LandingPage from './LandingPage'
import AOS from "aos"
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
      <div className="">
    <Routes>
        <Route path="/*" element = {<LandingPage/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/user/verify" element ={<AccountVerify/>}/>
        <Route path="/user/:id/verify/:token" element = {<Verified/>}/>
        <Route path="/user/email-verification" element = {<EmailVerification/>}/>
        <Route path="/user/reset-password/:id" element = {<ResetPass/>}/>
    </Routes>
    </div>
  )
}

export default App