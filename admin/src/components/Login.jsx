import React, { useEffect, useState, useContext } from 'react'
import { backEndUrl } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { OrderContext } from '../context/orderContext';



const Login = ({ setToken }) => {
  const { isAdmin, setIsAdmin } = useContext(OrderContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onHandleSubmit = async (e) => {

    try {
      e.preventDefault();
      const response = await axios.post(backEndUrl + '/api/user/admin', {
        email,
        password
      });
      console.log(response)

      if (response.data.success) {
        console.log("success")
        console.log(response.data)
        setToken(response.data.token)
        toast.success('successfully')
        setIsAdmin(true)
      }
      else {
        toast.error('Wrong email or password')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='min-h-screen flex justify-center items-center bg-green-50/30 '>
      <div className='w-md flex flex-col gap-4 bg-white p-6 shadow-md'>
        <h1 className='text-3xl font-bold font-poppins'>Admin panel</h1>
        <form onSubmit={onHandleSubmit} className='w-full flex  flex-col gap-2 items-start ' action="">
          <div className='w-full flex  flex-col gap-1 font-poppins relative '>
            {/* <p>Email Adress</p> */}
            <MdEmail className='absolute text-3xl top-[6px] left-1' />

            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='your@gmail.com' required className='font-poppins px-10 w-full py-2 border border-gray-300' type="text" />
          </div>
          <div className='w-full flex  flex-col gap-1 font-poppins relative'>
            <RiLockPasswordFill className='absolute text-3xl top-[6px] left-1' />                    
            <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your password' required className='w-full px-10 py-2 border border-gray-300' type="password" />
          </div>
          <button className='mt-5 font-cairo w-full py-3 font-bold text-2xl bg-black rounded-md text-white'>دخول</button>
        </form>
      </div>
    </div>
  )
}

export default Login 
