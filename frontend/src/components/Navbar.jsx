import React from 'react'
import { useState } from "react";
import Logo from '../media/logo.png'
import '../styles/navbar.css'

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (


    <div className='navbar py-12 bg-gray-100 overflow-y-hidden'>
      <dh-component>
        <nav className="w-full nav">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center" aria-label="Home" role="img">
              <img className="logo-navbar cursor-pointer w-8 sm:w-auto" src={Logo} alt="logo" />

            </div>
            <div>
              <button onClick={() => setShow(!show)} className="sm:block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <img className="h-8 w-8" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg4.svg" alt="show" />
              </button>
              <div id="menu" className={`md:block lg:block ${show ? '' : 'hidden'}`}>
                <button onClick={() => setShow(!show)} className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white md:bg-transparent z-30 top-0 mt-3">
                  <img className="h-8 w-8" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg5.svg" alt="hide" />
                </button>
                <ul className="flex text-3xl md:text-base items-center py-8 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent  z-20">
                  <li className="text-gray-600 text-lg hover:text-gray-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <a href="javascript:void(0)">Company</a>
                  </li>
                  <li className="text-gray-600 text-lg hover:text-gray-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <a href="javascript:void(0)">Features</a>
                  </li>
                  <li className="text-gray-600 text-lg hover:text-gray-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                    <a href="javascript:void(0)">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

      </dh-component>
    </div>

  )
}

export default Navbar