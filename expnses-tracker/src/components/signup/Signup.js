import React, { useEffect, useState }from 'react'
import {RiFacebookFill} from "react-icons/ri"
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import axios from "axios"
import "./signup.css"
import {Link} from "react-router-dom"
import { userRegister } from '../../api/userApi';
import { useNavigate } from "react-router-dom"
import { signupPending, signupSuccess, signupError } from './signUpSlice';
import { useDispatch, useSelector } from "react-redux";
import { LoginUserPending, LoginUserSuccess, LoginUserFailure } from '../login/loginSlice';
import {gapi} from "gapi-script"
import { PulseLoader } from 'react-spinners';
const Signup = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const {isLoading, error } = useSelector(state => state.signupUser);
const [formData, setFormData] = useState({ 
firstName: "",
lastName: "",
email: "",
password: "",
});

    const handleSubmit =  async(e) => {
        e.preventDefault();
        try {
            dispatch(signupPending());
            const data = await userRegister(formData);
            if(data.status === "error") {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                    })
              return dispatch(signupError(data.error));
            }
             dispatch(signupSuccess(data))
            setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: ""
            })
           navigate("/user/verify")
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
        console.log("G_L_S", response.data);
        if(response) {
          dispatch(LoginUserSuccess(response.data))
          navigate("/dashboard")
        }
      }).catch(error => {
        dispatch(LoginUserFailure(error));
      })
    }

    const responseGoogleFailure = (response) => {
      console.log("RES", response)
    }



    //Login with Facebook

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
    <div style={{backgroundImage: `url("https://res.cloudinary.com/dev-ltd/image/upload/v1656756117/mqzehpcg5fic92fuqyza.png")`,height: "700px", width: "100%", maxWidth: "1200px", margin: "0 auto"}}  className="p-3 flex flex-col justify-center items-center">
        <div>
        {isLoading && <p className="loading"><PulseLoader size={5}/></p>}
        {error && 
        <div id="toast-warning" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        </div>
        <div class="ml-3 text-sm font-normal">{error}</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>}
        </div>
        <div className="form w-80" data-aos="zoom-in-left">
        <h1 className="text-xl mb-5">Sign Up</h1>
        <form>
  <div className="relative z-0 w-full mb-6 group">
      <input type="email" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
      />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
      value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
      />
      <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="grid xl:grid-cols-2 xl:gap-6">
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
        value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
        />
        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
        value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
        />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div className="sm:flex justify-between items-end">
 {formData.firstName !== "" && formData.lastName !== "" && formData.email !== "" && formData.password !== ""? 
 <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>:
 <button disabled type="submit" className="cursor-no-drop text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
}
  <label for="terms" className="text-xs font-medium text-gray-900 dark:text-gray-300">Have an account? <Link to="/login" class="text-blue-600 hover:underline dark:text-blue-500">sign in</Link></label>
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

export default Signup