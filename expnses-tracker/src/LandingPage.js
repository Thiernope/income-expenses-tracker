import React from 'react'
import { Link } from "react-router-dom"
const LandingPage = () => {
  return (
    <div style ={{ backgroundImage: `url("https://res.cloudinary.com/dev-ltd/image/upload/v1656756117/mqzehpcg5fic92fuqyza.png")`, width: "100%", maxWidth: "1200px", margin: "0 auto"}}>
        <div style={{height: "150px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems : "end"}}>
        <Link to="/signup">
        <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">GET STARTED</button>
        </Link>
        <Link to="/login" className="cursor-pointer px-5 py-2.5 hover:underline">Sign In</Link>
        </div>
      <div style={{height: '450px'}} className="flex flex-col justify-center items-center" data-aos="zoom-in-left">
        <h1 className="text-7xl bold">Spend Wisely</h1>
        <h1 className="text-xl bold mt-5">With</h1>
        <h1 className="text-5xl bold text-green-500 mt-5 animate-bounce">Money Tracker</h1>
      </div>
    <div style={{height: "100px"}} className="flex flex-col justify-end items-end p-4">
    <p className="text-gray-400 text-xs">Powered by Thiernope</p>
     <p className="text-gray-400 text-xs">copyright @Thiernope 2022</p>
    </div>
    </div>
  )
}

export default LandingPage