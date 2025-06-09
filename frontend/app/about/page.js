"use client"
import dynamic from 'next/dynamic';

import React from 'react'
import about from '../../public/‏‏assets/animation/about'
import TextContent from '../components/TextContent'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


const About = () => {




  return (
    <div className='mt-10'>

      <div className='text-center text-2xl'>
        <TextContent text1={'من نحن'} />
      </div>
      <div className='flex gap-5 xl:flex-row sm:flex-col xm:flex-col items-center justify-evenly mt-5'>
        <div>
          <Lottie className='sm:w-[450px] xl:w-[600px] lg:w-[700px] md:w-[700px]'
            animationData={about}
            loop={true}
          />
          {/* <img className='sm:w-[450px] xl:w-[500px] ' src={assets.about_img} alt="" /> */}
        </div>
        <div dir='rtl' className='flex flex-col gap-4 xl:w-1/2 sm:w-full font-cairo text-gray-700'>
          <p className='leading-relaxed text-lg'>نحن متجر <span className='text-amber-500 font-bold'>كامسد</span> المتخصص في تقديم مجموعة متنوعة من المنتجات المميزة التي تلبي احتياجاتك اليومية، بجودة عالية وأسعار مناسبة. نسعى لتقديم تجربة تسوق سهلة وآمنة عبر الإنترنت، مع خيار الدفع عند الاستلام لتوفير راحة البال لعملائنا. نؤمن بأن رضا العميل هو أساس نجاحنا، لذا نعمل باستمرار على تحسين خدماتنا وتوسيع تشكيلتنا لتناسب جميع الأذواق. مرحبًا بك في عالمنا  حيث الجودة تلتقي بالثقة!.</p>
          <b className='text-xl'>مهمتنا</b>
          <p className='leading-relaxed text-lg'>مهمتنا هي تسهيل تجربة التسوق الإلكتروني لكل فرد من خلال توفير منتجات مختارة بعناية، بأسعار تنافسية وجودة مضمونة. نحرص على تقديم خدمة موثوقة تشمل الدفع عند الاستلام، وتوصيل سريع، ودعم فني متواصل، لنضمن راحة ورضا عملائنا في كل خطوة. نعمل بشغف لنكون الخيار الأول للمتسوقين الذين يبحثون عن البساطة، الأمان، والثقة في كل عملية شراء.</p>
        </div>
      </div>
      <div className='text-center mt-10'>
        <TextContent text1={'لماذا نحن'} />
      </div>

      <div dir='rtl' className='mt-10 flex xl:flex-row xm:flex-col gap-6  px-5'>
        <div className='flex xm:flex-col sm:flex-col xl:flex-row lg:flex-row justify-between items-start gap-6 '>
          <div className='py-5 px-10 border border-gray-300 rounded-xl shadow-lg flex gap-4 flex-col bg-white '>
            <h1 className='text-xl font-bold font-cairo text-gray-800'> ضمان الجودة :</h1>
            <p className='text-gray-600 text-md leading-relaxed '>نحن في <span className='text-amber-500 font-bold'>كامسد</span> نولي أهمية كبيرة لضمان الجودة في كل منتج نقدمه. نقوم بفحص المنتجات بعناية قبل شحنها للتأكد من مطابقتها للمعايير المطلوبة وتوقعات العملاء. هدفنا هو أن تصل إليك مشترياتك بحالة ممتازة، لأن رضاك وجودة تجربتك هما أولويتنا.</p>
          </div>
          <div className='py-5 px-10 border border-gray-300 rounded-xl shadow-lg flex gap-4 flex-col bg-white'>
            <h1 className='text-xl font-bold font-cairo text-gray-800'> الثقة :</h1>
            <p className='text-gray-600 text-md leading-relaxed'>نحن نؤمن أن العميل هو محور اهتمامنا، لذلك نحرص على تقديم خدمة عملاء استثنائية تضمن تجربة تسوق مريحة وسلسة. فريق الدعم لدينا جاهز دائمًا للرد على استفساراتك، مساعدتك في الطلبات، وحل أي مشكلة بسرعة واحترافية. هدفنا هو أن تشعر بالثقة والرضا في كل تفاعل معنا.</p>
          </div>
          <div className='py-5 px-10 border border-gray-300 rounded-xl shadow-lg flex gap-4 flex-col bg-white'>
            <h1 className='text-xl font-bold font-cairo text-gray-800'>خدمة عملاء استثنائية :</h1>
            <p className='text-gray-600 text-md leading-relaxed'> نحن <span className='text-amber-500 font-bold'> كامسد</span>  نضع الثقة في صميم كل ما نقوم به. نحرص على الشفافية في التعامل، والصدق في وصف المنتجات، والالتزام بمواعيد التوصيل وخدمة ما بعد البيع. نؤمن أن بناء علاقة طويلة الأمد مع عملائنا يبدأ من الثقة، ولهذا نسعى دائمًا لنكون عند حسن ظنكم في كل طلب وكل تجربة.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
