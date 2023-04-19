import React from 'react'
const LoadingPages  = React.lazy(()=> import('../components/LoadingPages'))
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Signup = React.lazy(() => import('../pages/Signup'));
const Login = React.lazy(() => import('../pages/Login'));
import { Routes, Route } from "react-router-dom"
import PrivateRoute from './PrivateRoutes'
import { Suspense } from 'react';

const AllRoutes = () => {
  return (
    <Suspense fallback={<LoadingPages/>}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Suspense>
  )
}

export default AllRoutes