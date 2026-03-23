import React from 'react'

const Footer = () => {
  return (
    <div className='row myfooter mt-5'>
        <div class="col-md-4 justify-content-center">
                <h5>Stay Connected</h5>
                <a href="https://www.facebook.com"></a>
                <img src="images/fb.png" alt=""/>

                <a href="https://www.instagram.com"></a>
                <img src="images/in.png" alt=""/>

                <a href="https://www.x.com"></a>
                <img src="images/x.png" alt=""/>

                <p>Stay connected with us or find us on instagram, facebook and telegram</p>
        </div>
        
        <footer className="text-light bg-dark p-2 text-center">
            <h5>Developed by Wolverine.&copy; 1996. All rights reserved</h5>
        </footer>


    </div>
  )
}

export default Footer