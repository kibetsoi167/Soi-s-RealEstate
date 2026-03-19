import axios from 'axios';
import React, { useEffect, useState } from 'react'
import image from '../logo.svg'
import { useNavigate } from 'react-router-dom';
const Getplots = () => {
    // declaring state variables
  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState("");
  const[error,setError]=useState("");
  // image url
  const img_url = "https://collinsfungo.alwaysdata.net/static/images/"
  // navigation
  const navigate =useNavigate()

  // function to get products from database
  const getProducts = async()=>{
    setLoading("Please wait,we are retrieving the products...")
    try{
      const response=await axios.get("https://collinsfungo.alwaysdata.net/api/get_product_details")
      setProducts(response.data)
      setLoading("")
    }catch(error){
      setError(error.message)

    }
  }
   // preallocate resources using useEffect
  useEffect(()=>{
    getProducts()
  },[]);
  return (
    <div className='row'>
      <h3>Available products</h3>

      {loading}
      {error}
      

      {/* products card design */}
      {products.map((product)=>(
      <div className='col-md-3 justify content-center mb-4'>
        <div className='card shadow card-margin'>
          {/* product image */}
          <img className='mt-4 products_img'src={img_url+product.product_photo} alt={product.product_photo}/>
          {/* product details */}
          <div className='card-body'>
            <h5 className='mt-2'>{product.product_name}</h5>
            <p className='text-muted'>{product.product_description}</p>
            <b className='text-warning'>ksh {product .product_cost}</b><br/>
            <button 
            className='btn btn-dark mt-2 w-100'
            onClick={()=>navigate("/makepayment",{state:{product}})}
            >purchase now</button>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Getplots