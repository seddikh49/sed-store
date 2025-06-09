import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { backEndUrl } from '../App'
import { OrderContext } from '../context/orderContext';



const Orderdetail = () => {

    const { orderStatus, orders,status,setStatus} = useContext(OrderContext)
    const pathname = useParams()



    const [singleOrder, setsingleOrder] = useState([]);
    
    const [statusIndex, setStatusIndex] = useState();



    const getOrder = async () => {
        const oneOrder = orders.filter((or) => {
            return or.fullName === pathname.name
        })
        setsingleOrder(oneOrder)
        if (oneOrder.length > 0) {
            setStatus(oneOrder[0].status);
        }
        
    }

     
    useEffect(() => {
        getOrder()
    }, [orders]);

    const [listStatus, setListStatus] = useState([
        'جديد', 'قيد المراجعة', 'تم التوصيل', 'ملغى'
    ]);


    const updateStatus = async (newStatus, id) => {
        
        try {
            const response = await axios.put(`${backEndUrl}/api/order/update/${id}`, {
                status: newStatus
            });
            // console.log(response.data.status)
        setStatus(response.data.status)
        } catch (err) {
            console.error('حدث خطأ أثناء التحديث', err);

        }
    };
    const OrderDetailItem = ({ label, value }) => (
        <div className="text-end">
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-lg font-semibold text-gray-800">{value}</div>
        </div>
      );


    return singleOrder.length && (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

  {/* العنوان */}
  <div className="text-end">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">: تفاصيل الطلب</h1>
  </div>

  {/* معلومات الطلب */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-md border">
    <OrderDetailItem label="الاسم الكامل" value={singleOrder[0].fullName} />
    <OrderDetailItem label="رقم الهاتف" value={singleOrder[0].phone} />
    <OrderDetailItem label="المنتج" value={`${singleOrder[0].productName}`} />
    <OrderDetailItem label="الولاية" value={singleOrder[0].wilaya} />
    <OrderDetailItem label="البلدية" value={singleOrder[0].commune} />
    <OrderDetailItem
      label="تاريخ الطلب"
      value={new Date(singleOrder[0].date).toLocaleDateString('en-EG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })}
    />
  </div>

  {/* حالة الطلب */}
  <div className="bg-white p-6 rounded-2xl shadow-md border text-end space-y-4">
    <h2 className="font-bold text-xl"> :الحالة الحالية</h2>
    <span className={`
      inline-block text-white px-4 py-2 rounded-full font-bold text-sm md:text-base
      ${status === 'جديد' ? 'bg-blue-500' :
        status === 'قيد المراجعة' ? 'bg-orange-400' :
          status === 'تم التوصيل' ? 'bg-green-500' : 'bg-red-500'}
    `}>
      {status}
    </span>
  </div>

  {/* تغيير الحالة */}
  <div className="bg-white p-6 rounded-2xl shadow-md border text-end space-y-4">
    <h2 className="font-bold text-xl"> : تغيير الحالة</h2>
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value, singleOrder[0]._id)}
      className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {listStatus.map((sta, index) => (
        <option key={index}>{sta}</option>
      ))}
    </select>
  </div>
</div>
        // <div>
        //     <div className='p-5'>
        //         <h1 className='text-end xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl font-bold'>: تفاصيل الطلب</h1>
        //     </div>
        //     <div className='p-5 flex flex-col gap-10'>
        //         <div className='flex justify-end gap-4 xl:text-3xl lg:text-4xl md:text-2xl sm:text-xl xm:text-sm'>
        //             <h1>{singleOrder[0].fullName} </h1>
        //             <h1 className='font-bold'> : الاسم الكامل</h1>
        //         </div>
        //         <div className='flex justify-end gap-4 xl:text-3xl lg:text-4xl md:text-2xl sm:text-md xm:text-sm' >
        //             <h1>{singleOrder[0].phone} </h1>
        //             <h1 className='font-bold'>: رقم الهاتف</h1>
        //         </div>
        //         <div className='flex justify-end gap-4 xl:text-3xl lg:text-4xl md:text-2xl sm:text-sm xm:text-sm'>
        //             <h1>{singleOrder[0].productName.slice(0,25)}... </h1>
        //             <h1 className='font-bold'>: المنتج </h1>
        //         </div>
        //         <div className='flex justify-end gap-4 xl:text-3xl lg:text-4xl md:text-2xl sm:text-md xm:text-sm'>
        //             <h1>{singleOrder[0].wilaya} </h1>
        //             <h1 className='font-bold'>: الولاية </h1>
        //         </div>
        //         <div className='flex justify-end gap-4 xl:text-3xl lg:text-4xl md:text-2xl sm:text-md xm:text-sm'>
        //             <h1>{singleOrder[0].commune} </h1>
        //             <h1 className='font-bold'>: البلدية </h1>
        //         </div>
        //         <div className='flex justify-end gap-4 xl:text-3xl lg:text-4xl md:text-2xl sm:text-md xm:text-sm'>
        //             <h1>  {new Date(singleOrder[0].date).toLocaleDateString('en-EG', {
        //                 day: '2-digit',
        //                 month: '2-digit',
        //                 year: 'numeric',
        //               })} </h1>
        //             <h1 className='font-bold'>: تاريخ الطلب </h1>
        //         </div>
        //     </div>
        //     <div dir='rtl' className='text-center flex items-center gap-5 p-5'>
        //         <h1 className='font-bold text-2xl'>الحالة</h1>
        //         <h1 className={`${status === 'جديد' ? 'bg-blue-400' : status === "قيد المراجعة" ? 'bg-orange-400' : status === 'ملغى' ? 'bg-red-400' : 'bg-green-500'} text-white py-2 w-30 rounded-sm  font-bold  cursor-pointer `}>{status} </h1>

        //     </div>
        //     <div dir='rtl' className='flex xl:flex-row lg:flex-row md-flex-row sm:flex-row xm:flex-col  items-start gap-5 p-5'>
        //         <div>
        //             <h1 className='font-bold text-2xl'>تغيير الحالة  :</h1>
        //         </div>
        //         <select value={status} onChange={(e) => updateStatus(e.target.value, singleOrder[0]._id)} className='flex gap-4 px-5 py-3  font-bold'>
                 
        //             {listStatus.map((sta, index) => {
        //                 return (
        //                     <option className=' font-bold' key={index} >{sta} </option>
        //                 )
        //             })}
        //         </select>
        //     </div>
        // </div>
    )
}

export default Orderdetail
