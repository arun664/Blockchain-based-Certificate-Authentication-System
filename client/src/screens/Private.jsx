import React, { useState, useEffect } from 'react';
import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Component } from 'react';

import Certification from '../abis/Certification.json';
import Web3 from 'web3';


class Private extends Component {
  constructor(props){
    super(props)
    this.state = {
      certid : ''
    }
  }



  handleChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]:e.target.value
    })
  }


  handleSubmit = e => {
    e.preventDefault()

    const data = this.state.certid
    
    this.props.history.push('/private/certificate')
    this.props.history.push({
      pathname: '/private/certificate',
      state: { id : data}
    })

  }

  render () {
    const { certid } = this.state
    return(
      <div className="bg-gray-100">
    <div className='min-h-auto bg-gray-100 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Enter the Certificate ID
            </h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={this.handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='String'
                  placeholder='Search Certificate'
                  name='certid'
                  onChange={this.handleChange}
                  value={certid}
                /><button
                type='submit'
                className='mt-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
              >
                <span className='ml-3'>Search</span>
              </button>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  My Profile
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='./private/profile'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>View Profile</span>
                </a>
              </div>
              <div className="mx-auto max-w-xs relative pb-8">
            <button
                  onClick={() => {
                    signout(() => {

                      // sessionStorage.reloadAfterPageLoad = true;
                      // window.location.reload();

                      //Timeout to display signoout successfull on the redirected page
                      setTimeout(function(){
                        toast.error('Signout Successfull');
                      },250);

                      this.props.history.push('/');
                      
                    });
                  }}
                  className='mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-out-alt  w-6  -ml-2' />
                  <span className='ml-3'>Signout</span>
                </button>
                </div>
            </form>
          </div>
          </div>
          <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
            <div
              className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
              style={{ backgroundImage: `url(${authSvg})` }}
            ></div>
          </div>
        </div>
      </div>
      <footer class='w-full text-center bg-gray-100 text-indigo-700 p-4 pin-b'>
            Copyright © 2020 by SADG University. All Rights Reserved.
        </footer>
    </div>
    )
  }
}

export default Private;
