import React, { useState, useEffect, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import Certification from '../abis/Certification.json';
import Web3 from 'web3'

import ReactLoading from "react-loading";
import logo from '../assests/logo.svg'

class Certificate extends Component {

  constructor(props){
    super(props)
    this.state = {
      txid : '',
      verifyc: false,
      buttonColor: '#667eea',
      verifyt:'Verify',
      dvisi:'hidden'
    }
  }

async componentWillMount(){
  await this.loadData()
  //console.log(this.props.location.state.id)
}

async componentDidUpdate(){
  await this.transactionX()
}


async loadData(){
  const Rapi = await axios.get('/api/getrapi')
  //window.alert(Rapi.data)
  var web3 = new Web3(new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/${Rapi.data}`
  ));

  const RDapi = await axios.get('/api/rdefault')
  
  web3.eth.defaultAccount = `${RDapi.data}`;
  this.setState({account:web3.eth.defaultAccount})

  const networkData = Certification.networks[3]
  if(networkData){
    const certification = await new web3.eth.Contract(Certification.abi, networkData.address)
    this.setState({certification})
    //console.log("Account found!" + this.state.account);
    //console.log(this.state.certification);
    }
    else{
    window.alert('Error')
    }

    const cert = await this.state.certification.methods.getData(this.props.location.state.id).call()
    //console.log(cert)

    const usn = cert[0];
    const name = cert[1];
    const email = cert[2];
    const fname = cert[3];
    const branch = cert[4];
    const sem1 = cert[5][0]/100;
    const sem2 = cert[5][1]/100;
    const sem3 = cert[5][2]/100;
    const sem4 = cert[5][3]/100;
    const sem5 = cert[5][4]/100;
    const sem6 = cert[5][5]/100;
    const sem7 = cert[5][6]/100;
    const sem8 = cert[5][7]/100;
    const bdate = cert[6].toString()

    //changing date format
    const x = bdate[0]+bdate[1]+bdate[2]+bdate[3]
    const y = bdate[4]+bdate[5]
    const z = bdate[6]+bdate[7]

    //calculating cgpa
    const cgpa = ((parseFloat(sem1)+parseFloat(sem2)+parseFloat(sem3)+parseFloat(sem4)+parseFloat(sem5)+parseFloat(sem6)+parseFloat(sem7)+parseFloat(sem8))/(8.0)).toFixed(2)

    //calculating percentage & rank
    const per = (cgpa - 0.75) * 10
    //console.log(per)
    if(per>=70) this.setState({rank:"FCD"})
    else if(per>=60 && per<70) this.setState({rank:"First Class"})
    else this.setState({rank:"Second Class"})

    this.setState({usn, name, email, fname, branch, x, y, z, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, cgpa })
    //console.log(this.state)

  //fetching transaction id from mongo
  const id = this.state.usn
  const tixd = await axios.post('/api/idfetch', { id })
  this.setState({txid:tixd.data.tid})
}

async transactionX () {
  const Rapi = await axios.get('/api/getrapi')

  var web3 = new Web3(new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/${Rapi.data}`
  ));
  //console.log(this.state.txid)
  const certget = await web3.eth.getTransactionReceipt(this.state.txid)
  //console.log(certget)
  this.setState({newcert:certget})
}

handleSubmit = e => {
    e.preventDefault();

    //Fetching transaction details
    // console.log(this.state.newcert)
    if(this.state.newcert.status == true && this.state.newcert.transactionHash == this.state.txid ) {
        //toast.success("Authentication Successfull!!")
        toast.success("Certificate is present in Blockchain")
        toast.info("Ropsten Blocknumber : "+this.state.newcert.blockNumber)
        //console.log("Ropsten Blocknumber : "+this.state.newcert.blockNumber)
        this.setState({verifyc:true})
        this.setState({buttonColor:'#07bc0c'})
        this.setState({verifyt:'Verified'})
        this.setState({dvisi:'visible'})
        this.setState({blockurl:`https://ropsten.etherscan.io/block/${this.state.newcert.blockNumber}`})
    }
    else{
      toast.error("Failed to Authenticate Certificate");
    }

}

  render()
  {
      {
        if(this.state.newcert)
        {
          return (
            <div className='min-h-full bg-gray-100 text-gray-900 md:flex justify-center'>
              <ToastContainer />
              <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex flex-col flex-1'>
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
                              Student Name : {this.state.name}
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
                              Father Name : {this.state.fname}
                            </span>
                          </div>
                          <div className="flex-1">
                            <span>
                              Date of Birth : {this.state.z}-{this.state.y}-{this.state.x}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="max-w-screen mx-16">
                      <table className="table-fixed w-full">
                        <thead>
                          <tr>
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
                      <div className="grid grid-cols-3">
                          <div className="border-l border-b border-r px-4 py-1 col-span-2">Total CGPA</div>
                          <div className="border-b border-r px-4 py-1 col-span-1 text-center">{this.state.cgpa}</div>
                          <div className="border-l border-b border-r px-4 py-1 col-span-2">Rank Obtained</div>
                          <div className="border-r border-b px-4 py-1 col-span-1 text-center">{this.state.rank}</div>
                      </div>
                    </div>

                    <div className="max-w-full my-4 text-center mb-4">
                        <span className="font-light py-2">Certifies that</span>
                        <h1 className="font-bold py-2">{this.state.name}</h1>
                        <span className="font-light py-2">has been duly admitted to the degree of</span>
                        <h1 className="font-bold py-2">BACHELOR OF ENGINEERING</h1>
                        <span className="font-light py-2">in Department of</span>
                        <h1 className="font-bold py-2">{this.state.branch}</h1>
                        <span className="font-light py-2">for recognition of the fulfillment of requirements for the said degree.</span>
                    </div>

                    {/* <div className="md:flex justify-center text-center mt-20 mb-4 mr-8">
                        <div className="flex-1">Director/Principal</div>
                        <div className="flex-1">Seal</div>
                    </div> */}

                  <div>

              </div>
            </div>

              <div className='m-0 bg-white shadow flex flex-col justify-center flex-1'>
                <div className='lg p-6 sm:p-12'>
                  <div className='mt-0 flex flex-col items-center'>
                  <h1 className='text-2xl xl:text-3xl font-extrabold text-center'>
                            Verify Authenticity of Certificate in Blockchain Network
                        </h1>

                    <form
                      className='w-full flex-1 mt-8 text-indigo-500'
                      onSubmit={this.handleSubmit}
                    >
                      <div className='mx-auto max-w-xs relative'>
                        <button
                          type='submit'
                          className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                          disabled={this.state.verifyc}
                          style={{backgroundColor:this.state.buttonColor}}
                        >
                          <i className='far fa-check-circle fa 1x w-6  -ml-2' />
                          <span className='ml-2'>{this.state.verifyt}</span>
                        </button>
                      </div>
                      <div className='mx-auto max-w-xs relative'  style={{visibility:this.state.dvisi}}>
                      <button
                          className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                        >
                        <a href={this.state.blockurl} target="_blank">View Block</a>
                        </button>
                      </div>
                      <div className='my-12 border-b text-center'>
                        <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                          Go To Home
                        </div>
                      </div>
                      <div className='flex flex-col items-center'>
                        <a
                          className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                          href='/'
                          target='_self'
                        >
                          <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                          <span className='ml-2'>Back to Home</span>
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        )
      }
      else if(this.state.usn == '') {
       return(
        <div>
           <div className='h-screen bg-gray-100 text-gray-900 md:flex justify-center'>
           <div className='w-screen m-0 sm:m-20 bg-white shadow sm:rounded-lg flex flex-col flex-1'>
          <div className='justify-center text-center m-10 p-10 flex-1'>
            <div className='mt-16'>
              <div>
                <h1>Certificate Doesn't exist!!</h1>
                <h1>Please check your Certificate ID</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center m-10 p-10 flex-1'>
                        <a
                          className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                          href='/p'
                          target='_self'
                        >
                          <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                          <span className='ml-2'>Back to Home</span>
                        </a>
                  </div>
              </div>
              </div>
        </div>
        )
      }
      else {
        return (
          <div className='flex h-screen'>
            <div className='m-auto'>
              <ReactLoading type="spinningBubbles" color="#667eea" />
            </div>
          </div>
        )
      }
    }
  }
}

export default Certificate;
