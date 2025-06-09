import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backEndUrl } from '../App'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





const List = ({ token }) => {


  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backEndUrl}/api/product/list`)
      if (response.data.msg) {
        setList(response.data.products)
      }
      console.log(list)

    } catch (error) {
      toast.error(response.data.msg)
    }

  }
  useEffect(() => {
    fetchList()
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backEndUrl}/api/product/remove`, { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.msg)
        fetchList()
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='p-10 flex flex-col gap-6'>
      <p className='mb-3 text-end font-bold xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl xm:text-2xl text-gray-800'>جميع المنتجات</p>


      <div dir='rtl' className='border w-full border-gray-200 bg-gray-100 grid md:grid-cols-[1fr_1fr_1fr_0.5fr] sm:grid-cols-[1fr_1fr_0.5fr] xm:grid-cols-[1fr_1fr_0.5fr]  xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_0.5fr]  px-6 py-3 rounded-md'>
        <b className='text-right text-lg text-gray-700'>الرقم</b>
        <b className='text-right text-lg text-gray-700'>الصورة</b>
        <b className='text-right text-lg text-gray-700  xl:block md:block lg:block sm:hidden xm:hidden'>الاسم</b>
        <b className='text-right text-lg text-gray-700  md:hidden xl:block lg:block sm:hidden xm:hidden'>السعر</b>
        <b className='text-right text-lg text-gray-700  md:hidden xl:block lg:block sm:hidden xm:hidden'>الفئة</b>
        <b className='text-center text-lg text-gray-700 md:hidden xl:block lg:block sm:hidden xm:hidden'>الوصف</b>
        <b className='text-center text-lg text-gray-700'>الإجراء</b>
      </div>

      {/* المنتجات */}
      {list.map((product, index) => (
        <div
          dir='rtl'
          key={index}
          className='border border-gray-300  bg-white grid md:grid-cols-[1fr_1fr_1fr_0.5fr] xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] xm:grid-cols-[1fr_1fr_0.5fr] sm:grid-cols-[1fr_1fr_0.5fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-center px-6 py-2 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out'
        >
          <h1 className='text-right font-bold'>#{index + 1}</h1>
          <img
            className='xl:w-20 xl:h-20 xm:h-10 xm:w-10 sm:h-15 sm:w-15 md:h-17 md:w-17 lg:h-20 lg:w-20 object-cover rounded-lg shadow-sm ml-auto'
            src={product.image[0]}
            alt={product.name}
          />
          <p className='text-right text-xl font-medium text-gray-800 xl:block md:block lg:block sm:hidden xm:hidden'>{product.name}</p>
          <p className='text-right text-xl font-medium text-gray-800  md:hidden xl:block lg:block sm:hidden xm:hidden'>{product.price}$</p>
          <p className='text-right text-xl font-medium text-gray-800  md:hidden xl:block lg:block sm:hidden xm:hidden'>{product.category}</p>
          <p className='text-right text-xl font-medium text-gray-800  md:hidden xl:block lg:block sm:hidden xm:hidden'>{product.description.slice(0, 7)}...</p>
          <button
            onClick={() => removeProduct(product._id)}
            className='text-white bg-red-500 hover:bg-red-600 mx-auto  transition-all duration-300 ease-in-out transform hover:scale-105 xm:w-16 sm:w-16 xl:w-25 lg:w-25  md:w-20 xl:text-[16px] lg:text-[16px] md:text-[12px] xm:text-[10px]  sm:text-[10px] px-2 py-1 rounded-md font-bold'
          > حذف المنتج</button>
        </div>
      ))}
    </div>

  )
}

export default List
