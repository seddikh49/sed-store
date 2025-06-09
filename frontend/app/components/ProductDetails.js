"use client"
import React, { useEffect, useState } from 'react'
import { MdAccountCircle } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { communes } from '../../public/‏‏assets/frontend_assets/communes'
import { wilayas } from '../../public/‏‏assets/frontend_assets/wilayas'
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";





import { useShop } from '../context/shopContext'
import Link from 'next/link';
import axios from 'axios';

const ProductDetails = ({ product }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [status, setstatus] = useState('جديد');
    const [notification, setnotification] = useState(1);
    const { imageIndex, setimageIndex, fullName,
        wilaya,
        commune,
        phone,
        quantity,
        productName,
        setProductName,
        communess,
        setCommuness,
        setfullName,
        setWilaya,
        setCommune,
        setPhone,
        setQuantity,
        currency,
        deliveryPrice,
        setdeliveryPrice,
        totalPrice,
        settotalPrice,
        setnameConfirmation,
        apiUrl

    } = useShop()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setProductName(product.name)
        setnameConfirmation(fullName)

        try {
            const response = await axios.post(`http://localhost:3000/api/order/add`, {
                fullName,
                phone,
                wilaya,
                commune,
                quantity,
                productName: product.name,
                status,
                notification,
                date: new Date()
            });
            // console.log(response.data.msg.message)

            if (response.data.success) {
                
                toast.success('تم طلب المنتج')
                setLoading(false)
                router.push('/confirm   ')
            }
            if (!response.data.success) {
                toast.error(response.data.msg.errors[0].message)
                setLoading(false)
            }


        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error.response.data.details.length > 1) {
                return toast.error('يرجى ملئ جميع الحقول')
            }
            toast.error(error.response.data.details[0].message)


        }

    }


    const incrementQuantity = () => {
        setQuantity(prev => prev + 1)

    }


    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)

        }
    }
    const filterCommunes = async () => {
        let coms = await communes.filter((com) => com.wilaya_name === wilaya)
        setCommuness(coms)
        const filterPrice = await wilayas.filter((wil) => {
            return wil.wil === wilaya
        })
        if (filterPrice.length) {
            setdeliveryPrice(filterPrice[0].deliveryPrice)
        }
    }

    const getTotlaPrice = async () => {
        if (product) {
            const add = await (product.price * quantity) + deliveryPrice
            settotalPrice(add)

        }
    }

    //     useEffect(() => {
    //     getSingleProduct();
    //   }, [ product]);

    useEffect(() => {
        filterCommunes()
        getTotlaPrice()
    }, [wilaya, quantity, deliveryPrice, totalPrice]);








    return (
        <div>
            <div className='w-full max-h-max gap-10  flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xm:flex-col mt-10 '>
                <div className='xl:w-1/2   lg:w-1/2 md:w-full  h-max flex flex-col md:items-center  lg:items-end xl:items-end sm:items-center xm:items-center  sm:justify-start   '>
                    <div className='flex flex-col items-end gap-2 pb-3 sm:ml-auto' >
                        <p className='text-2xl font-bold'>{product.name}</p>
                        <div className='flex text-2xl font-bold'>
                            <h1>{currency} </h1>
                            <h1>{product.price}  </h1>
                        </div>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }} onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[600px] bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                        {/* الاسم ورقم الهاتف */}

                        <div dir="rtl" className="flex flex-col md:flex-row gap-5">
                            <div className="relative w-full">
                                <input
                                    onChange={(e) => setfullName(e.target.value)}
                                    value={fullName}
                                    placeholder="الاسم الكامل"
                                    type="text"
                                    className="w-full py-3 pl-10 pr-4 text-sm font-medium bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <MdAccountCircle className="absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-500" />
                            </div>
                            <div className="relative w-full">
                                <input
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    type="text"
                                    placeholder="رقم الهاتف"
                                    className="w-full py-3 pl-10 pr-4 text-sm font-medium bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaPhone className="absolute top-1/2 -translate-y-1/2 left-3 text-xl text-gray-500" />
                            </div>
                        </div>

                        {/* البلدية والولاية */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <select
                                onChange={(e) => setCommune(e.target.value)}
                                value={commune}
                                className="w-full py-3 px-4 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">البلدية</option>
                                {communess.map((wil, index) => (
                                    <option key={index} value={wil.num}>
                                        {wil.commune_name}
                                    </option>
                                ))}
                            </select>

                            <select
                                onChange={(e) => setWilaya(e.target.value)}
                                value={wilaya}
                                className="w-full py-3 px-4 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">الولاية</option>
                                {wilayas.map((wil, index) => (
                                    <option key={index} value={wil.wil}>
                                        {wil.wil} - {wil.num}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* كمية المنتج */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        
                            <div className="flex items-center overflow-hidden border border-gray-300 rounded-xl">
                                <button type="button" onClick={incrementQuantity} className="w-10 h-10 bg-blue-600 text-white font-bold text-xl hover:bg-blue-700 transition">
                                    +
                                </button>
                                <div className="w-10 h-10 flex items-center justify-center font-bold text-lg">{quantity}</div>
                                <button type="button" onClick={decrementQuantity} className="w-10 h-10 bg-red-600 text-white font-bold text-xl hover:bg-red-700 transition">
                                    -
                                </button>
                            </div>
                                <h1 className="text-lg font-bold text-gray-700 text-right">:    كمية المنتج</h1>
                        </div>

                        {/* تفاصيل الطلب */}
                        <div className="rounded-xl border border-gray-300 bg-gray-50 overflow-hidden">
                            <div className="flex items-center justify-between bg-gradient-to-l from-orange-500 to-yellow-400 p-4">
                                <FaCartShopping className="text-white text-2xl" />
                                <h1 className="text-white font-bold text-lg">: تفاصيل الطلب</h1>
                            </div>
                            <div className="p-4 space-y-4 text-sm text-gray-700">
                                <div className="text-end">
                                    <h2 className="font-bold">: المنتج</h2>
                                    <p>{product?.name}</p>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-1 font-bold">
                                        <span>{quantity}</span>
                                        <span>ق</span>
                                    </div>
                                    <span className="font-bold">: الكمية</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>
                                        {deliveryPrice} {currency}
                                    </span>
                                    <span>: سعر التوصيل</span>
                                </div>
                                <div className="flex justify-between border-t pt-3 font-bold text-lg">
                                    <span>
                                        {totalPrice} {currency}
                                    </span>
                                    <span>: السعر الاجمالي</span>
                                </div>
                            </div>
                        </div>

                        {/* زر الطلب عبر واتساب */}
                        <Link
                            href="whatsapp"
                            className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-bold text-center flex items-center justify-center gap-3"
                        >
                            <FaWhatsapp className="text-2xl" />
                            اضغط هنا للطلب عبر الواتساب
                        </Link>

                        {/* زر تأكيد الطلب */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-bold text-center flex items-center justify-center gap-3"
                        >
                            {loading ? <ClipLoader color="#fff" size={24} /> : "اضغط هنا لتأكيد الطلب"}
                        </button>
                    </motion.form>

                    {/* <form onSubmit={handleSubmit} className='flex z-1  flex-col xl:w-[550px] md:w-[90%]  p-7 shadow-[0px_0px_5px_0px_rgba(0,_0,_0,_0.8)] lg:w-[420px] xm:w-[90%] sm:w-[90%]  gap-5 xl:items-end sm:items-center' action="">
                        <div dir='rtl' className='xl:w-full md:w-full lg:w-full  sm:w-full flex gap-5 xl:flex-row md:flex-row lg:flex-row  sm:flex-col xm:flex-col '>
                            <div className='xl:w-1/2 relative sm:w-full xm:w-full'>
                                <input onChange={(e) => setfullName(e.target.value)} value={fullName} className='w-1/2 bg-gray-100 py-3 font-bold px-10 border-1 sm:w-full xm:w-full focus:outline-blue-500 border-gray-600/50 rounded-[5px]' placeholder='الاسم الكامل' type="text" />
                                <MdAccountCircle className='absolute top-[13px] left-1 text-2xl text-gray-600' />
                            </div>

                            <div className='xl:w-1/2 relative  sm:w-full xm:w-full'>
                                <input onChange={(e) => setPhone(e.target.value)} value={phone} className='w-full bg-gray-100 py-3 font-bold px-9 border-1 sm:w-full xm:w-full focus:outline-blue-500 border-gray-600/50 rounded-[5px]' type="text" id="age" min="1" max="100" placeholder=" رقم الهاتف" />
                                <FaPhone className='absolute top-[13px] left-[7px] text-2xl text-gray-600 ' />
                            </div>


                        </div>
                        <div className='xl:w-full sm:flex-col-reverse xm:flex-col-reverse md:w-full sm:w-full lg:w-full flex gap-5  xl:flex-row md:flex-row lg:flex-row  '>
                            <select onChange={(e) => setCommune(e.target.value)} value={commune} className='w-1/2 bg-gray-100 text-gray-600 py-3 font-sans font-bold px-2 border-1 sm:w-full xm:w-full focus:outline-blue-500 border-gray-600/50 rounded-[5px]' name="" id="">
                                <option value="">البلدية</option>
                                {communess.map((wil, index) => {
                                    return (
                                        <option className='text-black' key={index} value={wil.num}>{wil.commune_name}</option>
                                    )
                                })}

                            </select>
                            <select onChange={(e) => setWilaya(e.target.value)} value={wilaya} className='w-1/2 text-gray-600 bg-gray-100 py-3 font-bold px-2 border-1 sm:w-full xm:w-full focus:outline-blue-500 border-gray-600/50 rounded-[5px]' name="" id="">
                                <option className='' value="">الولاية</option>
                                {wilayas.map((wil, index) => {
                                    return (
                                        <option className='text-black font-bold  flex flex-col' key={index} value={wil.wil}>{wil.wil}- {wil.num}  </option>
                                    )
                                })}

                            </select>
                        </div>
                        <div className='flex gap-5 justify-end items-center xl:flex-row lg:flex-row   sm:flex-col-reverse  xm:flex-col-reverse  '>
                            <div className='flex border-1  rounded-sm   '>
                                <div onClick={incrementQuantity} className='w-10 h-10 cursor-pointer  bg-black text-white flex justify-center  items-center text-xl font-bold'>+</div>
                                <div className='w-10 h-10 flex justify-center  items-center text-xl font-bold'>{quantity}</div>
                                <div onClick={decrementQuantity} className='w-10 h-10 cursor-pointer bg-black text-white flex justify-center  items-center text-xl font-bold'>- </div>
                            </div>
                            <h1 className=' py-3 font-bold text-end text-xl ' >:كمية المنتج </h1>
                        </div>
                        <div className='bg-gray-100/50 rounded-t-md border-1  border-black/30 w-full'>
                            <div className='flex justify-between items-center rounded-t-md p-3 bg-orange-400'>
                                <FaCartShopping className='text-2xl text-white' />
                                <h1 className='text-end  font-bold text-xl text-white pb-2'>: تفاصيل الطلب </h1>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2 px-3'>
                                    <h1 className='text-end font-bold xl:text-lg lg:text-sm md:text-lg xm:text-sm sm:text-md'> : المنتج</h1>
                                    <p className=' text-end  whitespace-nowrap  font-poppins xl:text-lg lg:text-sm md:text-lg xm:text-sm sm:text-mdt'>{product.name}</p>
                                </div>
                                <div>
                                    <div className='flex gap-2 justify-between px-3 '>
                                        <div className='flex gap-2 font-bold'>
                                            <h1>ق</h1>
                                            <h1 className='font-poppins'>{quantity} </h1>
                                        </div>
                                        <h1 className=' text-end  font-bold xl:text-lg lg:text-lg md:text-lg xm:text-sm sm:text-md '> : الكمية  </h1>
                                    </div>
                                </div>

                                <div className='flex justify-between gap-2 font-bold xl:text-lg lg:text-lg md:text-lg xm:text-sm sm:text-md px-3'>
                                    <div className='flex gap-2'>
                                        <h1>{currency}</h1>
                                        <h1 className='font-poppins'>{deliveryPrice}</h1>
                                    </div>
                                    <h1> : سعر التوصيل </h1>
                                </div>
                                <div className='flex justify-between gap-2 font-bold text-lg border-t-1 border-black/30 p-3'>
                                    <div className='flex gap-2 '>
                                        <h1>{currency}</h1>
                                        <h1 className='font-poppins'> {totalPrice} </h1>
                                    </div>
                                    <h1 className='text-xl '> : السعر الاجمالي </h1>
                                </div>
                            </div>

                        </div>


                        <div className='xl:w-full lg:w-full md:w-full flex gap-5 sm:w-full xl: bg-amber-800   '>

                            <Link href={"whatsapp"} className={"no-active-style w-full  bg-green-500 py-2 text-white text-center xl:text-xl md:text-xl lg:text-xl xm:text-md rounded-sm flex items-center justify-center whitespace-nowrap"}><FaWhatsapp className=' text-3xl pr-2' /> اضغط هنا للطلب عبر الواتساب </Link>
                        </div>
                        <div className='xl:w-full lg:w-full md:w-full flex gap-5 sm:w-full'>
                            <button type='submit' className={"no-active-style w-full  bg-blue-500 py-2 font-cairo text-white text-center xl:text-xl md:text-xl lg:text-xl xm:text-md rounded-sm flex items-center justify-center whitespace-nowrap"}>{loading ? <ClipLoader color="#36d7b7" size={30} /> : " اضغط هنا لتأكيد الطلب"} </button>
                        </div>


                    </form> */}
                </div>









                <motion.div initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }} className='xl:w-1/2 lg:w-1/2 md:w-full flex flex-col gap-2 justify-center md:items-center sm:items-center xm:items-center xl:items-start '>
                    <img src={product.image[imageIndex]} alt="" className='xl:w-[500px] lg:w-[400px] md:w-4/5 sm:w-[90%] xm:w-[90%]' />
                    <div className='grid grid-cols-4 xl:w-[500px] lg:w-[400px] md:w-4/5 gap-2 sm:w-[90%] xm:w-[90%]'>
                        {product.image.map((img, index) => {
                            return (
                                <img key={index} onClick={() => setimageIndex(index)} className='cursor-pointer' src={img} alt="" />
                            )
                        })}

                    </div>
                </motion.div>
            </div>

        </div>

    )
}

export default ProductDetails
