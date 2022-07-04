import React, {useState, useEffect} from 'react'
import {RiFacebookFill} from "react-icons/ri"
import { PulseLoader } from 'react-spinners'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import "./login.css"
import { userLogin } from "../../api/userApi"
import GoogleLogin from 'react-google-login';
import {Link} from "react-router-dom"
import {gapi} from "gapi-script"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { LoginUserPending, LoginUserSuccess, LoginUserFailure } from './loginSlice';
const Login = () => {
  const [message, setMessage ] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const {isLoading } = useSelector(state=> state.loginUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
  email: "",
  password: ""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(LoginUserPending());
      const response = await userLogin(formData)
      if(response.status === "error" || response.status === "need verify") {
        dispatch(LoginUserFailure(response.error));
        setErrorMessage(response.error);
        setFormData({
          email: "",
          password: ""
        })
        return;
      }

      dispatch(LoginUserSuccess(response))
      setMessage(response.message);
      setFormData({
        email: "",
        password: ""
      })
      setTimeout(()=>{
        return navigate("/dashboard")
      }, 2000)
    } catch (error) {
     console.log(error)
    }
  }


  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: ""
      })
    }
    
    gapi.load('client:auth2', start)
    },[])
    
    
        const responseGoogleSuccess = (response) => {
          dispatch(LoginUserPending());
            axios({
            method: 'POST',
            url : 'https://money-tracking-app-20.herokuapp.com/user/google-login',
            data: {tokenId: response.tokenId}
          }).then( response => {
            if(response.data) {
              dispatch(LoginUserSuccess(response.data))
                return navigate("/dashboard")
            }
          }).catch(error => {
            console.log(error)
            dispatch( LoginUserFailure(error));
          })
        }
    
        const responseGoogleFailure = (response) => {
          console.log("RES", response)
        }


        //login with facebook
    
        const responseFacebook = (response) => {
          axios({
            method: 'POST',
            url : 'https://money-tracking-app-20.herokuapp.com/user/facebook-login',
            data: {accessToken: response.accessToken, userID: response.userID}
          }).then( response => {
            if(response.data) {
              dispatch(LoginUserSuccess(response.data))
                return navigate("/dashboard")
            }
            
          }).catch(error => {
            console.log(error)
            dispatch( LoginUserFailure(error));
          })
        }


  return (
      <div style={{backgroundImage: `url("https://res.cloudinary.com/dev-ltd/image/upload/v1656756117/mqzehpcg5fic92fuqyza.png")`, height: "700px", width: "100%", maxWidth: "1200px", margin: "0 auto"}} className="p-3 flex flex-col justify-center items-center">
        <div>
      {isLoading && <p><PulseLoader size={5}/></p>}
      <div style={{color: "red"}}>
       {errorMessage? 
       <div id="toast-warning" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
       <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
       </div>
       <div className="ml-3 text-sm font-normal">{errorMessage}</div>
       <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
           <span className="sr-only">Close</span>
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
       </button>
   </div>: null
      }

      </div>
      {message? 
      <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
  </div>:null
    }
      </div>
      <div className="form w-80" data-aos="zoom-in-left">
      <h1 className="text-xl mb-5">Sign In</h1>
        <form>
  <div className="relative z-0 w-full mb-6 group">
      <input type="email" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
      value ={formData.email} onChange={e=> setFormData({...formData, email: e.target.value})}
      autoComplete="off"
      />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
      value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
      autoComplete="off"
      />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="sm:flex justify-between items-between">
  {formData.email !== "" && formData.password !== ""? 
 <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>:
 <button disabled type="submit" className="cursor-no-drop text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
}  
<div className="flex flex-col">
  <label htmlFor="terms" className="text-xs font-medium text-gray-900 dark:text-gray-300">Forgot password? <Link to="/user/email-verification" className="text-blue-600 hover:underline dark:text-blue-500">reset</Link></label>
  <label htmlFor="terms" className="text-xs font-medium text-gray-900 dark:text-gray-300">Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-500">sign Up</Link></label>
  </div>
  </div>
</form>
  <div className="mt-5 flex justify-between items-center">
    <div className="w-1/3">
  <FacebookLogin
    appId= {process.env.REACT_APP_FACEBOOK_APP_ID} 
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook} 
    render={renderProps => (
      <button onClick={renderProps.onClick} className="bg-blue-700 text-white flex justify-center items-center text-sm p-3 border rounded"> <RiFacebookFill className="text-white mr-3" />Facebook</button>
    )}
    />
  
   </div>
  <GoogleLogin
    clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID} 
    buttonText="Use Google"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleFailure}
    cookiePolicy={'single_host_origin'}
  />
</div>
</div>
    </div>
  )
}

export default Login