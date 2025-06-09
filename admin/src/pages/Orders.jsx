import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { OrderContext } from '../context/orderContext';
import { GrInProgress } from "react-icons/gr";
import { MdOutlineNewReleases } from "react-icons/md";
import { TbShoppingCartCancel } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";








const Orders = () => {

  const [changeState, setChangeState] = useState();
  const [timeStatus, setTimeStatus] = useState();

  const {  orders,
    setorders,
    copiedOrders,
    backEndUrl,
    fetchOrders} = useContext(OrderContext)
 


  const handleDelete = (id) => {

    Swal.fire({
      title: 'تحذير',
      text: 'هل تريد حذف هذا الطلب ؟',
      icon: 'warning',
      confirmButtonText: 'نعم',
      showCancelButton: true,
      cancelButtonText: 'إلغاء',

    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${backEndUrl}/api/order/delete/${id}`)
          if (response) {
            toast.success(response.data.msg)
            fetchOrders()
          }
        } catch (error) {
          console.log(error)
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const [allStatus, setAllStatus] = useState([
    'جديد', 'قيد المراجعة', 'تم التوصيل', 'ملغى'
  ]);



  const filterOrders = (e) => {
    const keyword = e.target.value
    if (keyword === "") {
      setorders(copiedOrders)
    }
    const filter = copiedOrders.filter((or) => {
      return or.fullName.includes(keyword.toLowerCase())
    })
    setorders(filter)

  }

  const filterStatus = () => {
    if (changeState === 'حسب الحالة') {
      return setorders(copiedOrders)
    }

    const filter = copiedOrders?.filter((st) => {
      return st.status === changeState
    })
    setorders(filter)
  }


  const filterTimeStatus = () => {
   
    if (timeStatus === 'جديد') {
      const filterTime = [...orders].sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
      setorders(filterTime)

    }
    else {
      const filterTime = [...orders].sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      setorders(filterTime)
    }
  }

  useEffect(() => {
    filterStatus()
  }, [changeState]);

  useEffect(() => {

    filterTimeStatus()
  }, [timeStatus]);


  return (
    <div className='w-full bg-gray-100 p-10'>
      <div className='p-5 bg-white rounded-xl shadow-xl'>
        <div dir='rtl' className='flex gap-5 mb-5 sm:flex-col justify-between xm:flex-col md:flex-row lg:flex-row xl:flex-row'>
          <div className='relative sm:w-full xm:w-full xl:w-96 lg:w-full'>
            <FaSearch className='absolute top-4 left-3 text-xl text-gray-600' />
            <input type="text" onChange={filterOrders} className='py-3 px-3 xl:w-96 lg:w-full xm:w-full sm:w-full' placeholder='البحث في الطلبات' />
          </div>
          <div className='flex gap-3 sm:justify-between xm:justify-between  sm:flex-row xm:flex-col'>
            <div >
              <select className="border py-3 px-3 rounded font-bold" value={changeState} onChange={(e) => setChangeState(e.target.value)}>
                <option name="" id="">حسب الحالة</option>
                {allStatus.map((sta, index) => {
                  return <option key={index} className='font-bold' value={sta}>{sta} </option>
                })}
              </select>
            </div>
            <div>
              <select onChange={(e) => setTimeStatus(e.target.value)} value={timeStatus} className="border py-3 px-3 rounded font-bold">
                <option>حسب التاريخ</option>
                <option className='font-bold' value={'جديد'}>الجديد</option>
                <option className='font-bold' value={'قديم'}>القديم</option>
              </select>
            </div>
          </div>
       
        </div>
        <h1 dir='rtl' className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xm:text-xl  font-cairo py-5'>الطلبات</h1>
        <div className='flex gap-4 bg-amber-50  justify-center items-center  w-full overflow-hidden rounded-xl border border-gray-300  '>
          <table className="w-full  text-center bg-white  border-gray-300">
            <thead className="bg-gray-100 rounded-md">
              <tr className=''>
                <th className="py-2 border-gray-200 border w-1/6 ">الإجراء</th>
                <th className="py-2 border-gray-200 border w-1/6   xl:table-cell md:hidden sm:hidden xm:hidden  ">الحالة</th>
                <th className="py-2 border border-gray-200 w-1/6 xl:table-cell  md:hidden sm:hidden xm:hidden  ">تاريخ الطلب</th>
                <th className="py-2 border border-gray-200 w-1/6  xl:table-cell md:hidden sm:hidden xm:hidden  ">رقم الهاتف</th>
                <th className=" py-2 border border-gray-200 w-1/6">الاسم الكامل</th>
                <th className=" py-2 border  border-gray-200  w-1/6"> الطلب</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => {
                return (
                  <tr key={index} className="border border-gray-300">

                    <td className='py-2  flex border-gray-200 gap-3 justify-center'>
                      <button onClick={() => handleDelete(order.id)} className='cursor-pointer hover:bg-red-800 bg-red-500 text-white xl:py-3  xm:py-[5px] xm:px-2  xl:px-3 font-bold rounded-md'>
                        <MdDelete />
                      </button>

                      <NavLink to={`/orderdetail/${order.fullName}`} className='cursor-pointer hover:bg-green-800 bg-green-500 text-white xl:py-3  xm:py-[5px] xm:px-2  xl:px-3 font-bold rounded-md'>
                        <FaEye />

                      </NavLink>
                    </td>
                    <td className={`md:hidden sm:hidden text-center xm:hidden xl:table-cell flex `}>
                      <div className={`${order.status === 'جديد' ?
                         'bg-blue-400' : order.status === "قيد المراجعة" ?
                          'bg-orange-400' : order.status === 'ملغى' ? 'bg-red-400' :
                           'bg-green-500'} text-white py-2 w-38 rounded-sm  font-bold inline-block cursor-pointer relative `}><h1>{order.status}   {order.status === "تم التوصيل" ? <TbTruckDelivery className='absolute left-1 top-[10px] text-xl' />:
                           order.status === "جديد" ? <MdOutlineNewReleases className='absolute left-1 top-[10px] text-xl' /> : order.status === "ملغى" ? <TbShoppingCartCancel className='absolute left-1 top-[10px] text-xl' /> :  <GrInProgress className='absolute left-1 top-[10px] text-xl' /> 
                           } </h1>
                      </div>
                    
                     
                    </td>
                    {/* <td className="py-1 border-b-gray-200  xl:table-cell  md:hidden sm:hidden xm:hidden  ">{order.date} </td> */}
                    <td className="py-1 border-b-gray-200 xl:table-cell md:hidden sm:hidden xm:hidden font-bold">
                      {new Date(order.date).toLocaleDateString('en-EG', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-1 border-b-gray-200 xl:table-cell  md:hidden sm:hidden xm:hidden font-bold ">{order.phone} </td>
                    <td className="py-1 border-b-gray-200 xm:text-sm xl:text-xl lg:text-xl md:text-xl font-bold "> {order.fullName}</td>
                    <td className="py-1 border border-gray-200 font-bold  ">#{index + 1}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}

export default Orders
