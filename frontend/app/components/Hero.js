
"use client"
import React, { useEffect, useState } from 'react'
import { FaShippingFast } from "react-icons/fa";
// import Lottie from 'lottie-react'
import dynamic from 'next/dynamic';
import cash from '../../public/‏‏assets/animation/cash'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Hero = () => {


    return (
        <div className='flex  xl:h-[500px] xl:flex-row lg:flex-col xm:flex-col sm:flex-col w-full justify-center items-center  border border-gray-200 '>
             <div className='xl:w-1/2 lg:w-full sm:w-full xm:w-full h-full '>
                <Lottie className='xl:w-full lg:w-full h-full '
                    animationData={cash}
                    loop={true}
                />
          
            </div>
            <div className='xl:w-1/2  py-10 flex  xm:w-full sm:w-full  lg:1/2 justify-center   items-center' dir='rtl'>
                <div className=' flex xm:flex-col  lg:flex-col gap-8   sm:flex-col '>
                    <div className='flex justify-center items-center gap-5    '>
                        <FaShippingFast className='xl:text-7xl xm:text-2xl  text-gray-600' />
                        <h1 className='xl:text-4xl lg:text-4xl md:text-5xl inline xm:text-xl sm:text-4xl   text-gray-600 font-bold whitespace-nowrap '> توصيل سريع خلال 3 أيام </h1>

                    </div>
                    <div className=' bg-orange-400 pb-4 max-w-max'>
                        <h1 className='xl:text-5xl lg:text-5xl md:text-5xl xm:text-xl sm:text-4xl  text-white font-bold'>الدفع عند الإستلام</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-2xl text-gray-600 font-bold'> تسوق الآن</p>
                        <p className='h-[2px] w-11 bg-gray-400'></p>
                    </div>
                </div>
            </div>
            <div >
            </div> 
        </div>
    )
}

export default Hero
