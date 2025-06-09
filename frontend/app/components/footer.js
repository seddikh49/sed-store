import React from 'react'




const Footer = () => {
  const date = new Date()

  return (
    <div className='mt-20 xm:px-10'>
      <div className='flex xl:flex-row xl:items-start md:items-start lg:items-start sm:items-end xm:items-end  lg:flex-row md:flex-row sm:flex-col xm:flex-col   justify-evenly mt-10 mb-10 gap-10 '>
        
      <div className='flex flex-col gap-5 pt-2' dir='rtl'>
          <h1 className='text-2xl font-extrabold text-gray-600 font-cairo '>تواصل معنا</h1>
          <ul>
            <li className='text-lg font-abold text-gray-600 font-poppins'>0664753237</li>
            <li className='text-lg font-abold text-gray-600 font-poppins'>seddikh49@gmail.com</li>
          </ul>
        </div>
        
        <div className='flex flex-col  gap-3 pt-2' dir='rtl'>
          <h1 className='text-2xl font-extrabold text-gray-600 font-cairo' >المتجر</h1>
          <ul style={{ direction: 'rtl' }}>
            <li className='text-lg font-abold text-gray-600 font-cairo'>الرئيسية</li>
            <li className='text-lg font-abold text-gray-600 font-cairo'>من نحن</li>
            <li className='text-lg font-abold text-gray-600 font-cairo'>التوصيل</li>
            <li className='text-lg font-abold text-gray-600 font-cairo'>الخصوصية</li>
          </ul>
        </div>


        <div className='  sm:w-full xm:w-full  flex flex-col sm:flex-col gap-4 justify-start ' dir='rtl'>
          <h1 className="text-4xl   font-extrabold  text-gray-600 font-cairo  ">
            كامسد<span className="text-orange-400 aspect-square font-cairo">.</span>
          </h1>
          <p className='text-lg  font-abold text-gray-600 font-cairo'>شركة متخصصة في بيع المنتجات عالية الجودة، تهدف إلى تلبية احتياجات العملاء من خلال توفير تشكيلة واسعة من السلع بأسعار تنافسية وخدمة موثوقة.
          </p>
        </div>
      </div>
      <div className='text-center  py-6 text-xl font-light text-gray-600 font-cairo border-gray-400  border-t-1'>@kamsed.com  {date.getFullYear()} - كل الحقوق محفوظة </div>
    </div>
  )
}

export default Footer


