
`OUTDATED REPO: CREATE PR IF YOU WISH TO CONTRIBUTE` :shipit:


# Blockchain-based-Certificate-Authentication-System
Decentralized Application to store and verify the authenticity of Academic Certificates

> Built using Ethereum on local blockchain setup and deployed on Ropsten test network.

| Contract deployed at | 0xAC677Fd653576A70b9fAde4396caEE4AE21fc95a |
| -------------------- | ------------------------------------------ |
| RPC Network          | Ropsten Test Network                       |

## Steps to set up local development environment

### Setting local blockchain

1. We need to install Node, Ganache and Truffle.
   
   Download [Node.js](https://nodejs.org/en/download/) 
    
   Download [Ganache](https://www.trufflesuite.com/ganache) & create a workspace.
   
   For Truffle
   ```bash
   npm i -g truffle
   ```

1. Install dependencies
  
   Launch cmd in project folder path
   ```bash
   npm install
   ```
   after completion
   ```bash
   cd client
   npm install
   ```

1. Deploy the smart contract to the local blockchain.

   ```bash
   truffle migrate
   ```

> If the contracts are modified, then they should be re-migrated.

### Setting MongoDB

1. Create account in [MongoDB Atlas](https://www.mongodb.com/)

1. Create a cluster and get the URI key, add it to .env file.

### Setting Mail Service

1. Create an account in [Sendgrid](https://signup.sendgrid.com/)

1. Verify single sender email and get the API key, add them to .env file

### Now we can start the server

> In project folder, for server
```bash
npm run dev
```
> In client folder
```bash
npm start
```

## Deploying Smart Contract

The contract can be deployed in any test networks. We are using Ropsten test network with the help of truffle.

1. First of all we need to have a metamask account. When we create an account in metamask a _mnemonic_ is given to us. [You can read how to get a mnemonic here.](https://support.dex.top/hc/en-us/articles/360004125614-How-to-Create-Mnemonic-Phrase-with-MetaMask-)

1. After that create a project in [Infura](https://infura.io). This will help us to use ropsten network through infura.

1. You will get an endpoint like this `https://ropsten.infura.io/yourapikey`.

1. Add this API key, Ropsten Account address and it's private key in .env files.

1. Now you can deploy the smart contract using a single command:

   ```BASH
   truffle migrate
   ```
### Deploy client to heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) & follow the [steps](https://devcenter.heroku.com/articles/deploying-nodejs#deploy-your-application-to-heroku) to deploy.

## Youtube project demo video

[![youtube-picture](https://img.youtube.com/vi/qj-LdkTO9Ic/maxresdefault.jpg)](https://youtu.be/qj-LdkTO9Ic)


### Client side Heroku

Certificate Id : b2a90ded903d7b07b47c1bec2b398fd788deef5f

[Click here](https://sadg-university.herokuapp.com/) to view and verify certificate.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| ![st](https://github.com/arun664.png?size=50)<br /> [Arun Kumar M](https://github.com/arun664) | ![st](https://github.com/vummanenidilip.png?size=50)<br />  [Dilip Vummaneni](https://github.com/vummanenidilip) | ![st](https://github.com/gnanendraprasad.png?size=50)<br /> [Gnanendra Prasad T](https://github.com/gnanendraprasad) | ![st](https://github.com/shashi9690.png?size=50)<br /> [Shashidhara N](https://github.com/shashi9690)|
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

Happy coding!! :sunglasses:
