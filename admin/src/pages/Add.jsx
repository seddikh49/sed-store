import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import {backEndUrl} from '../App'
import { toast } from 'react-toastify';




const Add = ({token}) => {
 
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

 
  const [name, setName] = useState("");
  const [description, setdescription] = useState();
  const [price, setprice] = useState('');
  const [category, setCategory] = useState("Men");


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const dataForm = new FormData()

      dataForm.append("name", name)
      dataForm.append("description", description)
      dataForm.append("price",price)
      dataForm.append("category", category)
     


      image1 && dataForm.append("image1", image1)
      image2 && dataForm.append("image2", image2)
      image3 && dataForm.append("image3", image3)
      image4 && dataForm.append("image4", image4)
      

      const response = await axios.post(`${backEndUrl}/api/product/add`, dataForm, {
        headers: { token }  
      });
        if(response.data.success){
          toast.success('product added successfully')
          setName('')
          setdescription('')
          setImage1(false)
          setImage2(false)
          setImage3(false)
          setImage4(false)
          setprice('')
        }else{
          toast.error(response.data.msg)
        }
      
    } catch (error) {
      console.log(error)
    }
  }





  
  return (
    <div dir='rtl' className='p-10 w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-3' action="">
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold'>صور المنتج</h1>
          <div className='flex gap-2'>
            <label htmlFor="image1" className='cursor-cell'>
              <img className='w-20 h-15' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=> setImage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>

            <label htmlFor="image2" className='cursor-cell'>
              <img className='w-20 h-15' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e)=> setImage2(e.target.files[0])} type="file" id='image2' hidden />
            </label>

            <label htmlFor="image3" className='cursor-cell'>
              <img className='w-20 h-15' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=> setImage3(e.target.files[0])} type="file" id='image3' hidden />
            </label>

            <label htmlFor="image4" className='cursor-cell'>
              <img className='w-20 h-15' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=> setImage4(e.target.files[0])} type="file" id='image4' hidden />
            </label>
          </div>
        </div>
        <div className='w-full '>
          <p className='mb-2 font-bold'>اسم المنتج </p>
          <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Type here' className=' w-full max-w-[500px] font-poppins px-4 py-2' />
        </div>
        <div className='w-full'>
          <p className='mb-2 font-bold'>وصف المنتج</p>
          <textarea onChange={(e)=> setdescription(e.target.value)} value={description} type="text" placeholder='Write content here' className=' w-full max-w-[500px] font-poppins px-4 py-2' />
        </div>
        <div className='flex sm:flex-col xl:flex-row w-full gap-4 xm:flex-col'>
          <div className=''>
            <p className='mb-2 font-bold whitespace-nowrap'>الفئة</p>
            <select onChange={(e)=> setCategory(e.target.value)} value={category}  className='py-2 px-5 font-poppins' name="" id="">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className=''>
            <p className='mb-2 font-bold'>سعر المنتج</p>
            <input onChange={(e)=> setprice(Number(e.target.value))} value={price} className='py-2 font-poppins px-4 ' type="Number" />
          </div>
        </div>
        <div >
          <div className='mt-3 mb-5  gap-3'>
            <button className='bg-black text-white px-10 py-2 cursor-pointer font-bold'>اضافة المنتج</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Add
