import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    // declaring variables
    const[username,setUsername] = useState("")
    const[email,setEmail] = useState("")
    const[phone,setPhone] = useState("")
    const[password,setPassword] = useState("")

    // status messages
     const[loading,setLoading] = useState("")
     const[error,setError] = useState("")
     const[success,setSuccess] = useState("") 
      // function to submit
  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading("PLease wait...")
    try{
      // fetching user details
      const formData = new FormData();
      formData.append("username",username);
      formData.append("email",email);
      formData.append("phone",phone);
      formData.append("password",password);

      
    }catch (error){
      setError(error.message)

    }
  }


  return (
    <div className='row justify-content-center form'>
        <div className='col-md-6 card shadow m-2 p-4'>
            <h1>Signup</h1>
            {loading}
            {error}
            {success}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter username' className='form-control' onChange={(e)=>setUsername(e.target.value)}  /><br/>
                <input type="email" placeholder='Enter email' className='form-control' onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input type="tel" placeholder='Enter phone' className='form-control' onchange={(e)=>setPhone(e.target.value)}/><br/>
                <input type="password" placeholder='Enter password' className='form-control' onchange={(e)=>setPassword(e.target.value)}/><br/>
                <input type="submit" value="Signup"/><br/>
                {/* In case someone has already signed in */}
            <Link to='/signin' className='text-dark'>Already have an account? Signin</Link>
            </form>


        </div>
    </div>
  )
}

export default Signup