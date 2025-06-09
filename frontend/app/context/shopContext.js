"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { wilayas } from "../../public/‏‏assets/frontend_assets/wilayas";
import { communes } from "../../public/‏‏assets/frontend_assets/communes";
import { assets } from "@/public/‏‏assets/frontend_assets/assets";




// إنشاء السياق
const ShopContext = createContext();

// مزود السياق (Provider)
export const ShopProvider = ({ children, initialProducts }) => {
  const currency = "دج"
  const delivery_fee = 10

  const [products, setProducts] = useState(initialProducts || []);

  const [sortValue, setSortValue] = useState('');
  const [search, setSearch] = useState();
  const router = useRouter();
  const [imageIndex, setimageIndex] = useState(0);
  const [fullName, setfullName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [commune, setCommune] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [productName, setProductName] = useState();
  const [deliveryPrice, setdeliveryPrice] = useState(0);
  const [communess, setCommuness] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [rotateIcon, setRotateIcon] = useState(true);
  const [nameConfirmation, setnameConfirmation] = useState();



  const apiUrl = process.env.NEXT_PUBLIC_API_URL;




  const [allProducts, setAllProducts] = useState(initialProducts || []);

  const applyFilter = () => {
    setAllProducts(products)
    const copyProducts = [...products]

    if (search) {
      const filtered = copyProducts.filter((pro) => {
        return pro.name.toLowerCase().includes(search.toLowerCase())
      })
      setAllProducts(filtered)
    }
  }



  const filterCategoryProducts = (checkedCategory) => {
    if (checkedCategory) {
      const copyFilter = [...products]
      const filtredCategory = copyFilter.filter((pro) => {
        return pro.category === checkedCategory
      })
      setAllProducts(filtredCategory)
    }
  }


  const sortProducts = () => {
    setAllProducts(products)
    const productsCopy = [...products];
    if (sortValue === "high") {
      const sorted = productsCopy.sort((a, b) => b.price - a.price);
      setAllProducts(sorted);
    }

    if (sortValue === "low") {
      const sorted = productsCopy.sort((a, b) => a.price - b.price);
      setAllProducts(sorted);
    }
  };


  useEffect(() => {
    applyFilter()
  }, [search]);


  useEffect(() => {
    sortProducts()
  }, [sortValue]);



  const value = {
    products,
    currency,
    allProducts,
    currency,
    search,
    setSearch,
    // backend_url,
    router,
    wilayas,
    communes,
    setSortValue,
    imageIndex,
    setimageIndex,
    fullName,
    setProductName,
    setfullName,
    setWilaya,
    wilaya,
    setWilaya,
    commune,
    setCommune,
    phone,
    setPhone,
    quantity,
    setQuantity,
    productName,
    communess,
    setCommuness,
    deliveryPrice,
    setdeliveryPrice,
    totalPrice,
    settotalPrice,
    nameConfirmation,
    setnameConfirmation,
    apiUrl,
    rotateIcon,
    setRotateIcon,
    filterCategoryProducts


  }


  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

// هوك مخصص لاستخدام السياق
export const useShop = () => useContext(ShopContext);