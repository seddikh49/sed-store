import React from 'react'
import {assets} from '../assets/assets'
import { FaAngleDoubleLeft } from "react-icons/fa";


const NavBar = ({setToken}) => {
  return (
    <div>
      <div className='flex justify-between items-center px-[4%] p-2'>
        <img className='max-w-44' src={assets.logo} alt="" />
        <button onClick={()=> setToken('')} className='bg-gray-600 xl:px-7  lg:px-7 xm:text-[12px] sm:text-[15px] md:text-[16px] lg:text-[16px] xl:text-[16px]  md:px-6  sm:px-5  xm:px-4 py-2 rounded-full text-amber-50 font-bold'>تسجيل الخروج</button>
      </div>
     
    </div>
  )
}

export default NavBar
