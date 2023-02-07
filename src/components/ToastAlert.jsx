import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastAlert=()=> {
    
  return (
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable={false}
    pauseOnHover={false}
  />
  )
}

export default ToastAlert








   