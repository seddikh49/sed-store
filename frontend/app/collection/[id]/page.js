
import axios from "axios";
import ProductDetails from "@/app/components/ProductDetails";


export default async function Product( {params} ) {
  
  const { id } = params

  const res =  await axios.get("http://localhost:3000/api/product/list");
  const products =   res.data.products || [];
  
  const singleProduct =  products.find((prod)=>{ return prod.id === Number(id)})
 
  

  return (
    <div>
      <ProductDetails product={singleProduct}/>
    </div>
  );
}