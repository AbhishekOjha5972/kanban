import React from 'react'
import { Navigate } from "react-router-dom";



const PrivateRoute = ({children}) => {
    let ls = localStorage.getItem('loggedin_user') || "";
         if(ls==""){
           return <Navigate to="/login" replace={true} />
         }
  return children
}

export default PrivateRoute