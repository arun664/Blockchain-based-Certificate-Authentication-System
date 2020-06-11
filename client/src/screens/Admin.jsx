import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { signout } from '../helpers/auth';

import Certification from '../abis/Certification.json';
import Web3 from 'web3';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/custom.css';

import HashLoader from "react-spinners/HashLoader";

const axios = require("axios");
class Admin extends Component{

constructor(props){
  super(props)
   this.state = {
    name1 : '',
    usn : '',
    dob : '',
    gender : 'Male',
    yoj : '',
    yop : '',
    email1 : '',
    fathername : '',
    department : 'Civil Engineering',
    contact : '',
    sem1 : '',sem2 : '',sem3 : '',sem4 : '',sem5 : '',sem6 : '',sem7 : '',sem8 : '',
    cgpa : '',
    textChange : 'Submit',
    load:'false'
  }
  

}

// Check for ethereum
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  
  async loadWeb3(){
     if(window.ethereum) {
       window.web3 = new Web3(window.ethereum)
       await window.ethereum.enable()
     }
     else if (window.web3) {
       window.web3 = new Web3(window.web3.currentProvider)
  
     }
     else {
       window.alert('Non-ethereum browser detected. you should consider trying metamask!  ')
     }
     
   }

   async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    
    const networkData = Certification.networks[networkId]
    if(networkData){
    const certification = new web3.eth.Contract(Certification.abi, networkData.address)
    this.setState({certification})
    //console.log("Account found!");
    //console.log(certification);
    }
    else{
    window.alert('Certification contract not deployed to detected network.')
    }   
  }

submitcall = e => {
    

    // date set state
    const d = (this.state.dob).split('-')
    const ddisplay = d[2]+"-"+d[1]+"-"+d[0]


    e.preventDefault()
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-body-element">
            <div className="react-confirm-alert-blur">
              <div className="react-confirm-alert-overlay">
                <div className="react-confirm-alert-body">
                  <div>
                    <div className="text-center">
                      <h1 className="text-black">Are you sure?</h1>
                      <h3 className="text-red-700">Strict Note: Once confirmed, No future changes can be done</h3>
                    </div>
                    <div className='max-w-screen-xl m-0 sm:m-2 bg-white shadow sm:rounded-lg flex flex-col flex-1'>
                          <div className="border-b-2 border-indigo-500">    
                              <div className="m-5 justify-center item-center flex flex-row">
                                  <div className="w-26">
                                    <img className="w-1/7 h-16 ml-4" src="/static/media/logo.38240f3b.svg" alt="Logo"/>
                                  </div>
                                  <div className="flex flex-col w-full"><span className="flex-1 text-2xl xl:text-3xl font-extrabold text-center">SADG University</span>
                                    <span className="flex-1 text-1xl xl:text-1xl text-center">Blockchain Certificate Authentication System</span>
                                  </div>
                                  </div>
                                </div>
                              <div>
                          </div>
                          
                          
                          <div className="md:flex max-w-full my-4">
                            <div className="flex flex-col px-4 w-full justify-center items-center text-sm">
                              <div className="flex flex-1 w-full my-1">
                                <div className="flex-1 mx-8">
                                  <span>
                                    Student Name : {this.state.name1}
                                  </span>
                                </div>
                                <div className="flex-1">
                                <div className="flex-1">
                                  <span>
                                    USN : {this.state.usn}
                                  </span>
                                </div>
                                </div>
                              </div>
                              <div className="flex flex-1 w-full my-1">
                                <div className="flex-1 mx-8">
                                  <span>
                                    Father Name : {this.state.fathername}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <span>
                                    Date of Birth : {ddisplay}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-1 w-full my-1">
                                <div className="flex-1 mx-8">
                                  <span>
                                    Department : {this.state.department}
                                  </span>
                                </div>
                                <div className="flex-1">
                                <div className="flex-1">
                                  <span>
                                    Email : {this.state.email1}
                                  </span>
                                </div>
                                </div>
                              </div>  
                            </div>
                          </div>

                        <div className="max-w-screen mx-16 my-2">
                          <table className="table-fixed w-full">
                            <thead>
                              <tr className="text-center">
                                <th className="px-4 py-2">Semester</th>
                                <th className="px-4 py-2">Total SGPA</th>
                                <th className="px-4 py-2">Obtained SGPA</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              <tr>
                                <td className="border px-4 py-1">1</td>
                                <td className="border px-4 py-1">10</td>
                                <td className="border px-4 py-1">{this.state.sem1}</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-1">2</td>
                                <td className="border px-4 py-1">10</td>
                                <td className="border px-4 py-1">{this.state.sem2}</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-1">3</td>
                                <td className="border px-4 py-1">10</td>
                                <td className="border px-4 py-1">{this.state.sem3}</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-1">4</td>
                                <td className="border px-4 py-1">10</td>
                                <td className="border px-4 py-1">{this.state.sem4}</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-1">5</td>
                                <td className="border px-4 py-1">10</td>
                                <td className="border px-4 py-1">{this.state.sem5}</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-1">6</td>
                                <td className="border px-4 py-1">10</td>
                                <td className="border px-4 py-1">{this.state.sem6}</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-1">7</td>
                                <td className="border px-4 py-1">10</td>
                                <td className="border px-4 py-1">{this.state.sem7}</td>
                              </tr>
                              <tr>
                                <td className="border px-4 py-1">8</td>
                                <td className="border px-4 py-1">10</td>
                                <td className="border px-4 py-1">{this.state.sem8}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                    </div>
                  </div>
                  <div className="react-confirm-alert-button-group">
                    <button onClick={onClose}>No</button>
                    <button
                      onClick={() => {
                        this.handleSubmit();
                        onClose();
                      }}
                    >Yes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
};

  // handle inputs
handleSubmit = e => {
    // e.preventDefault()
    const data = this.state
    //console.log(data)

    //console.log(this.state.final)
    //Creating a new transaction
    if ( this.state.final[0]==this.state.usn ) {
      toast.error("Certificate already exists!!")
      //console.log(this.state.final[0])
    }
      else {

      //send mail-hashid to email1
      const x = this.state.h
      const z = this.state.email1
      const y = this.state.name1
      const u = this.state.usn

      const s1 = parseInt(this.state.sem1 * 100)
      const s2 = parseInt(this.state.sem2 * 100)
      const s3 = parseInt(this.state.sem3 * 100)
      const s4 = parseInt(this.state.sem4 * 100)
      const s5 = parseInt(this.state.sem5 * 100)
      const s6 = parseInt(this.state.sem6 * 100)
      const s7 = parseInt(this.state.sem7 * 100)
      const s8 = parseInt(this.state.sem8 * 100)

      const d = (this.state.dob).split('-')
      const dnew = d[0]+d[1]+d[2]
      
      this.setState({load:true})

      //console.log(this.state.h)
      // create Transaction
      const result = this.state.certification.methods.generateCertificate( this.state.h, this.state.usn,this.state.name1, this.state.email1,
        this.state.fathername, this.state.department, [s1,s2,s3,s4,s5,s6,s7,s8], dnew).send({ from: this.state.account }).on('receipt', function(receipt){
          //console.log(receipt.status);
          const t = receipt.transactionHash
          if(receipt.status == true) {
            axios.post(`${process.env.REACT_APP_API_URL}/smail`, {x, y, z, t, u})
            toast.success("Successfull")
            setTimeout(function() {
              window.location.reload();
            },4000)
          }
        })
        .on('error', function() {
          toast.error("Failed")
          setTimeout(function() {
            window.location.reload();
          },4000)
        })
      //   console.log(result)

    }
  };

  handleInputChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]:e.target.value
    })
    var hash = require('object-hash');
    const hashCode = hash.sha1(this.state.usn);
    this.setState({h:hashCode})
    //console.log(hashCode)
    if(this.state.sem1 != ''){
      const existResult = this.state.certification.methods.getData(hashCode).call( )
       //resolving the promise output
    var promise = Promise.resolve(existResult); 
    
    promise.then((val) => { 
        const finalResult = val
        //console.log(finalResult)
        this.setState({final:finalResult})
    }); 
    }
  }


render() {
  const { name1, usn, dob, gender, yoj, yop, email1, fathername, department, contact, sem1,sem2,sem3,sem4,sem5,sem6,sem7,sem8, cgpa, textChange } = this.state
    {
      if(this.state.load == true) {
        return (
          <div className='flex h-screen'>
            <div className='m-auto'>
            <ToastContainer />
              <HashLoader
                size={50}
                color={"#667eea"}
                loading={true}
              />
            </div>
          </div>
        )
      }
      else {
          return (
            <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
              <ToastContainer />
              <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='max-h-full max-w-full'>
                  <div className='mt-12 flex flex-col items-center'>
                    <h1 className='text-2xl xl:text-3xl font-extrabold'>
                      Academic Certificate
                    </h1>

                    <form
                      className='w-full flex-1 mt-8 text-indigo-500'
                      onSubmit={this.submitcall}
                    >
                      <div>
                      <div className='mh:flex max-w-4xl'>
                        <div className='flex-1'>
                        <div className='my-8 border-b text-left px-8 font-bold'>
                          <span>Personal Details</span>
                          <div className='leading-none px-8 tracking-wide font-bold font-medium bg-white transform translate-y-1/2'></div>
                        </div>
                        <div className="md:flex">
                          <div className="flex-1 mx-8">
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-0'
                                type='text'
                                placeholder='Name'
                                onChange={this.handleInputChange}
                                name='name1'
                                value={name1}
                                required
                              />
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type='date'
                                placeholder='DOB'
                                onChange={this.handleInputChange}
                                name='dob'
                                value={dob}
                                required
                              />
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type='number'
                                placeholder='Year Of Joining'
                                onChange={this.handleInputChange}
                                name='yoj'
                                min='2013'
                                max='9999'
                                value={yoj}
                                required
                              />

                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type='email'
                                placeholder='Email'
                                onChange={this.handleInputChange}
                                name='email1'
                                value={email1}
                                required
                              />

                              <select className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                              value={this.state.department} onChange={this.handleInputChange}
                              name = 'department'>
                                <option value="Civil Engineering">CIVIL</option>
                                <option value="Computer Science Engineering">CSE</option>
                                <option value="Electronics and Communication Engineering">ECE</option>
                                <option value="Electronics and Electrical Engineering">EEE</option>
                                <option value="Information Science Engineering">ISE</option>
                                <option value="Mechanical Engineering">MECH</option>
                              </select>
                              
                            </div>
                            <div className="flex-1">
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-0'
                                type='String'
                                placeholder='USN'
                                onChange={this.handleInputChange}
                                name='usn'
                                pattern='[0-9]{1}[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}'
                                value={usn}
                                required
                              />

                              <select className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                              value={this.state.gender} onChange={this.handleInputChange}
                              name = 'gender'>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type='number'
                                placeholder='Year Of Passing'
                                onChange={this.handleInputChange}
                                name='yop'
                                min='2017'
                                max='9999'
                                value={yop}
                                required
                              />

                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type='number'
                                placeholder='Phone'
                                onChange={this.handleInputChange}
                                name='contact'
                                pattern='[0-9]{10}'
                                value={contact}
                                required
                              />

                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type='text'
                                placeholder='Father Name'
                                onChange={this.handleInputChange}
                                name='fathername'
                                value={fathername}
                                required
                              />

                            </div>
                          </div>
                        </div>
                        <div className='flex-1'>
                        <div className='my-8 border-b text-left px-8 font-bold'>
                          <span>Marks Obtained</span>
                          <div className='leading-none px-8 tracking-wide font-bold font-medium bg-white transform translate-y-1/2'></div>
                        </div>
                        <div className="md:flex">
                          <div className="flex-1 mx-8">

                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-0'
                                type="number"
                                placeholder='Semester 1 SGPA'
                                onChange={this.handleInputChange}
                                name='sem1'
                                min='5'
                                max='10'
                                step="0.01"
                                value={sem1}
                                required
                              />
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type="number"
                                placeholder='Semester 3 SGPA'
                                onChange={this.handleInputChange}
                                name='sem3'
                                min='5'
                                max='10'
                                step="0.01"
                                value={sem3}
                                required
                              />
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type="number"
                                placeholder='Semester 5 SGPA'
                                onChange={this.handleInputChange}
                                name='sem5'
                                min='5'
                                max='10'
                                step="0.01"
                                value={sem5}
                                required
                              />
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type="number"
                                placeholder='Semester 7 SGPA'
                                onChange={this.handleInputChange}
                                name='sem7'
                                min='5'
                                max='10'
                                step="0.01"
                                value={sem7}
                                required
                              />
                            </div>
                            <div className="flex-1 mx-8">
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-0'
                                type="number"
                                placeholder='Semester 2 SGPA'
                                onChange={this.handleInputChange}
                                name='sem2'
                                min='5'
                                max='10'
                                step="0.01"
                                value={sem2}
                                required
                              />
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type="number"
                                placeholder='Semester 4 SGPA'
                                onChange={this.handleInputChange}
                                name='sem4'
                                min='5'
                                max='10'
                                step="0.01"
                                value={sem4}
                                required
                              />
                              
                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type="number"
                                placeholder='Semester 6 SGPA'
                                onChange={this.handleInputChange}
                                name='sem6'
                                min='5'
                                max='10'
                                step="0.01"
                                value={sem6}
                                required
                              />

                              <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                type="number"
                                placeholder='Semester 8 SGPA'
                                onChange={this.handleInputChange}
                                name='sem8'
                                min='5'
                                max='10'
                                step="0.01"
                                value={sem8}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* <div className="mx-auto max-w-xs relative mt-6">
                              <input
                                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3'
                                  type="number"
                                  placeholder='Final CGPA'
                                  onChange={this.handleInputChange}
                                  name='cgpa'
                                  value={cgpa}
                                />
                            </div> */}
                      </div>
                      
                      <div className="py-4 m-2">
                        <div className="mx-auto max-w-xs relative">
                        <button
                          type='submit'
                          className='mt-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                        >
                          <span className='ml-3'>{textChange}</span>
                        </button>
                        </div>
                        <div className='my-8 border-b text-center '>
                          <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-bold font-medium bg-white transform translate-y-1/2'>
                            Note
                          </div>
                        </div>
                        <div className='text-sm text-gray-600 font-medium bg-white text-center'>
                          <span>Cannot modify any details once submitted.</span>
                          </div>
                        </div>
                        {/* Redirect to Home 
                        <div className='flex flex-col items-center'>
                          <a
                            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                          bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                            href='/'
                            target='_self'
                          >
                            <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                            <span className='ml-4'>Home</span>
                          </a>
                        </div> */}

                    </div>
                      
                    <div className="mx-auto max-w-xs relative pb-8">
                    <button
                          onClick={() => {
                            signout(() => {

                              //  sessionStorage.reloadAfterPageLoad = true;
                              //  window.location.reload();
                              setTimeout(function(){
                                toast.error('Signout Successfull');
                              },250);

                              this.props.history.push('/');
                                
                            });
                          }}
                          className='mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                        ><i className='fas fa-sign-out-alt  w-6  -ml-2' />
                          <span className='ml-3'>Signout</span>
                        </button>
                        </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          )
        }
    }  
  } 
}


export default Admin;
