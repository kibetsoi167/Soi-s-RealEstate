import React from 'react'

const Addplots = () => {
  return (
    <div className='row justify-content-center form'>
        <div className='col-md-6 card shadow m-2 p-4'>
            <h1>Add plots</h1>
            <input
            type="text"
            placeholder='Enter plot name'
            className='form-control'/><br/>
            <input
            type="text"
            placeholder="Enter plot location"
            className='form-control'/><br/>
            <input
            type="file"
            className='form-control'/><br/>

        </div>
    </div>
  )
}

export default Addplots