import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  return (
    <div className='row justify-content-center'>
        <div className='col-md-6 card shadow m-2 p-4'>
            <h1>signin</h1>
            <form>
                <input type="email" placeholder='Enter email' className='form-control'/><br/>
                <input type="password" placeholder='Enter password' className='form-control'/><br/>
                 <input type="submit" value="Signin"/><br/>
                  <Link to ='/signup' className='text-dark'>Don't have an account? Signup</Link>
            </form>

        </div>
    </div>
  )
}

export default Signin