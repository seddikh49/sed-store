'use client';
 import { useShop } from "../context/shopContext";
import { IoFilter } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";


export default function SortSelect() {
  const {setSortValue} = useShop()
  return (
    // <div className="flex border justify-center items-center rounded-xl">
      

    //   <select
    //   onChange={(e)=> setSortValue(e.target.value)}
    //   className="w-full px-4 py-2 text-gray-700 bg-white  border-gray-300 appearance-none  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
    // >
    
    //   <option value="">ترتيب حسب</option>
    //   <option value="high">الأغلى</option>
    //   <option value="low">الأرخص</option>
    // </select>
    // <IoFilter />
    // </div>
    <div className="relative w-full max-w-xs">
  <select
    onChange={(e) => setSortValue(e.target.value)}
    className="w-full appearance-none px-4 py-2 pr-10 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
  >
    <option value="">ترتيب حسب</option>
    <option value="high">الأغلى</option>
    <option value="low">الأرخص</option>
  </select>

  {/* الأيقونة التي تحل محل السهم */}
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
    <IoFilter className="text-lg" />
  </div>
</div>
  );
}