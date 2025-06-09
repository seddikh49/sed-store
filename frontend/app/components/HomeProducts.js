"use client"
import React from 'react'
import { useShop } from "../context/shopContext";
import Image from 'next/image';
import Link from 'next/link';
import TextContent from '../components/TextContent';
import { motion } from "framer-motion";



const HomeProducts = () => {
  const { products } = useShop();

  return (
    <div className='w-full mt-10 '>
      <TextContent text={"أحدث المنتجات"} />
      <div className='grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 xm:grid-cols-1 sm:grid-cols-1 mx-auto  gap-10 mt-10 w-full'>

        {products.slice(0,5).map((product, index) => (
          <motion.div
           initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
            key={index}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-4 w-full  mx-auto"
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src={product.image[0]}
                alt={product.name || 'صورة المنتج'}
                width={300}
                height={300}
                className="w-full  object-cover transform group-hover:scale-105 transition duration-300"
                priority
              />
            </div>

            <div className="mt-4 text-center">
              <h1 className="text-md font-semibold text-gray-800 whitespace-nowrap">{product.name.slice(0, 25)}</h1>
              <p className="text-xl text-indigo-600 font-bold mt-2">{product.price} ريال</p>

              <Link href={`/collection/${product._id}`} className="block">
                <button className="mt-4 w-full bg-indigo-600 font-bold text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition duration-300">
                  شراء المنتج
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HomeProducts
