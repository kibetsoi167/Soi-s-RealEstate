import axios from 'axios';
import image from '../logo.svg'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const MpesaPayment = () => {
   // declaring state variables
  const{product} = useLocation().state ||{};
  const[phone,setPhone] = useState("")

  // status messages
  const[loading,setLoading] = useState("")
  const[success,setSuccess] = useState("")
  const[error,setError] = useState("")

   // image url
  const img_url = "https://collinsfungo.alwaysdata.net/static/images/"


  // function to make payment
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading("Please wait as we process the transaction...")
    try{
      // retrieve user and product detail
      const formData = new FormData();
      formData.append("phone",phone)
      formData.append("amount",product.product_cost)

      // adding base url to make payment
      const response = await axios.post("https://collinsfungo.alwaysdata.net/api/mpesa_payment",formData)
      setSuccess(response.data.message)
      setLoading("")
    }catch(error){
      setError(error.message)
    }
  }
  return (
    <div className='row justify-content-center mt-2'>
       <h3>LIPA NA MPESA</h3>
      {phone}
      {success}
      {error}
     
      {/* Mpesa payment body */}
      <div className='col-md-6 card bg-transparent mb-2'>
        <img src={img_url + product.product_photo} alt={product.product_photo}/>
        <div>
          <h5>Product Name: {product.product_name}</h5>
          <p>Product cost: {product.product_cost}</p>
          <form action="" on onSubmit={handleSubmit}>
            <input
            type="tel"
            placeholder='Enter phone number'
            className='form-control'
            onChange={(e)=> setPhone(e.target.value)}/>
            <button className='btn btn-dark m-2'>Make payment</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MpesaPayment