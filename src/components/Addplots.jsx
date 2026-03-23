import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Addplots = () => {
   // declaring state variables
  const[product_name,setProductName]=useState("")
  const[product_description,setProductDescription]=useState("")
  const[product_cost,setProductCost]=useState("")
  const[product_photo,setProductPhoto]=useState("")
  // status messages
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")
  const[success,setSuccess]=useState("")
  // function to add products to database
  const handleSubmit = async(e) =>{
     e.preventDefault();
     setLoading("Please wait...")
     try{
      // retrieve product details
      const formData = new FormData();
      formData.append("product_name",product_name)
      formData.append("product_description",product_description)
      formData.append("product_cost",product_cost)
      formData.append("product_photo",product_photo)

      // adding base url to post data
      const  response = await axios.post("http://collinsfungo.alwaysdata.net/api/add_product", formData)
      
      setSuccess(response.data.success)
      setLoading("")

     }catch{
      setError(error.message)

     }
     
  }
  return (
    <div className='row justify-content-center form'>
        <div className='col-md-6 card bg-transparent m-2 p-4'>
            <h1>Add plots</h1>
            {error}
            {success}
            {loading}
            <nav>
          <Link to="/" className='btn btn-dark'>Get All products</Link>
        </nav>
        <form action="" onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder='Enter plot name'
            className='form-control'
            onChange={(e)=>setProductName(e.target.value)}/><br/>
            <input
            type="text"
            placeholder="Enter plot location"
            className='form-control'
            onChange={(e)=>setProductDescription(e.target.value)}/><br/>
            <input
          type='number'
          placeholder='Enter product cost'
          className='form-control'
          onChange={(e)=>setProductCost(e.target.value)}
          required/><br/>
            <input
            type="file"
            className='form-control'
            onChange={(e)=>setProductPhoto(e.target.files[0])}/><br/>
            <input type="submit"
           value={loading ? "adding...":"upload"} 
           disabled={loading}/> <br /><br/>
           </form>

        </div>
        <Footer/>
    </div>
    
  )
}

export default Addplots