import React, { useState, useEffect } from 'react';
import loginSADG from '../src/assests/loginSADG.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Component } from 'react';

import Certification from '../src/abis/Certification.json';
import Web3 from 'web3';


class App extends Component {
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

    //this.props.history.push('src/screens/Certificate')
    this.props.history.push({
      pathname: '/Certificate',
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
          <div className='mt-24 mb-8 flex flex-col items-center'>
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
              <div className='flex flex-col text-center text-white items-center'>
                  <span className='ml-4'>Code</span>
              </div>
              <div className="mx-auto text-center text-white max-w-xs relative pb-8">
                <span className='ml-2'></span>
                <span className='ml-2'></span>
                <span className='ml-2'></span>
                <span className='ml-2'></span>
                <span className='ml-2'></span>
                </div>
            </form>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${loginSADG})` }}
          ></div>
          </div>
        </div>
      </div>
      <footer class='w-full text-center bg-gray-100 text-indigo-700 mt-4 pin-b'>
            Copyright © 2020 by SADG University. All Rights Reserved.
        </footer>
  </div>
    )
  }
}

export default App;
