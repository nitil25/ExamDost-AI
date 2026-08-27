import React from 'react'
import { Navigate, replace, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import { getCurrentuser } from './services/api'
import {useDispatch, useSelector} from "react-redux"
import History from './pages/History'
import Notes from './pages/Notes'
import Pricing from './pages/Pricing'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/Paymentfailed'

export const serverUrl = "http://localhost:8000"

const App = () => {

  const {userData} = useSelector(state=>state.user)

  const dispatch = useDispatch()

  useEffect(()=>{
    getCurrentuser(dispatch)
  },[dispatch])


  return (
    <>
    <Routes >
      <Route path="/" element={ userData ?  <Home/> : <Navigate to={"/auth"} replace/>} />
      <Route path="/auth" element={ userData ? <Navigate to={"/"} replace/> : <Auth/>} />
      <Route path="/history" element={ userData ?  <History/> : <Navigate to={"/auth"} replace/>} />
      <Route path="/notes" element={ userData ?  <Notes/> : <Navigate to={"/auth"} replace/>} />
      <Route path="/pricing" element={ userData ?  <Pricing/> : <Navigate to={"/auth"} replace/>} />
      <Route path="/payment-success" element={ <PaymentSuccess/>} />
      <Route path="/payment-failed" element={ <PaymentFailed/>} />
    </Routes>
    </>
  )
}

export default App
