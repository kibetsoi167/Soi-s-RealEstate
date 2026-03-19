import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
   
  // declaring state variables
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  // status messages
  const [loading, setLoading] = useState("")
  const [error,setError] = useState("")
  const [success, setSuccess] = useState("")

  // navigation
  const navigate = useNavigate()


  // function to signin
  const handleSignin = async (e) => {
    e.preventDefault()
    setLoading("Please wait...")
    
    try {
      // retrieving user details
      const formData = new FormData();
      formData.append("email",email)
      formData.append("password",password)

      // adding base url
      const response = await axios.post("https://collinsfungo.alwaysdata.net/api/signin",formData)
      if(response.data.user){
        setSuccess(response.data.message)
        // saving user in the local storage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/")
        setLoading("")
      }else{
        setError(error.message)
        
      }

    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='row justify-content-center'>
        <div className='col-md-6 card shadow m-2 p-4'>
            <h1>signin</h1>
            {loading} <br />
            {error} <br />
            {success} <br />

            <form action="" onSubmit={handleSignin}>
                <input type="email" placeholder='Enter email' className='form-control'onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input type="password" placeholder='Enter password' className='form-control'onChange={(e)=>setPassword(e.target.value)}/><br/>
                 <input type="submit" value={loading ? "Login...":"signin"} disabled={loading}/><br/>
                  <Link to ='/signup' className='text-dark'>Don't have an account? Signup</Link>
            </form>

        </div>
    </div>
  )
}

export default Signin