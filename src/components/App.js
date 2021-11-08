import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import BdtfToken from '../abis/BdtfToken.json'
import TokenFarm from '../abis/TokenFarm.json'
// import Navbar from './Navbar'
import Transfer from './Transfer'
import Home from './Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Main from './Main'
import './App.css'
import { Helmet } from 'react-helmet';

class App extends Component {

  async componentWillMount(){
    // await this.loadWeb3() //connect to metamask
    // await this.loadBlockchainData()

  }

  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()
    console.log(networkId)

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call() 
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
      console.log(daiTokenBalance)
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId]
    if(dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      this.setState({ dappToken })
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call() 
      this.setState({ dappTokenBalance: dappTokenBalance.toString() })
      console.log(dappTokenBalance)
    } else {
      window.alert('dappToken contract not deployed to detected network.')
    }
    // Load BdtfToken
    const bdtfTokenData = BdtfToken.networks[networkId]
    if(bdtfTokenData) {
      const bdtfToken = new web3.eth.Contract(BdtfToken.abi, bdtfTokenData.address)
      this.setState({ bdtfToken })
      let bdtfTokenBalance = await bdtfToken.methods.balanceOf(this.state.account).call() 
      this.setState({ bdtfTokenBalance: bdtfTokenBalance.toString() })
      console.log(bdtfTokenBalance)
    } else {
      window.alert('bdtfToken contract not deployed to detected network.')
    }
    

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {


    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }


    // //test
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()
    console.log(networkId)

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call() 
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
      console.log(daiTokenBalance)
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId]
    if(dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      this.setState({ dappToken })
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call() 
      this.setState({ dappTokenBalance: dappTokenBalance.toString() })
      console.log(dappTokenBalance)
    } else {
      window.alert('dappToken contract not deployed to detected network.')
    }
    // Load BdtfToken
    const bdtfTokenData = BdtfToken.networks[networkId]
    if(bdtfTokenData) {
      const bdtfToken = new web3.eth.Contract(BdtfToken.abi, bdtfTokenData.address)
      this.setState({ bdtfToken })
      let bdtfTokenBalance = await bdtfToken.methods.balanceOf(this.state.account).call() 
      this.setState({ bdtfTokenBalance: bdtfTokenBalance.toString() })
      console.log(bdtfTokenBalance)
    } else {
      window.alert('bdtfToken contract not deployed to detected network.')
    }
    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })



  }

  stakeTokens = (amount, token1, value, token2) => {
    this.setState({ loading: true })
      if(token1 == "dai"){
        this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.tokenFarm.methods.stakeTokens(amount, token1, value, token2).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
          })
        })
      }
      if(token1 == "dapp"){
        this.state.dappToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.tokenFarm.methods.stakeTokens(amount, token1, value, token2).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
          })
        })
      }
      if(token1 == "bdtf"){
        this.state.bdtfToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.tokenFarm.methods.stakeTokens(amount, token1, value, token2).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
          })
        })
      }
  }
  P2P_Xfers = (amount, token1, ReceiverAddress) => {
    this.setState({ loading: true })
      if(token1 == "dai"){
        this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.tokenFarm.methods.P2P_Xfers(amount, token1, ReceiverAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
          })
        })
      }
      if(token1 == "dapp"){
        this.state.dappToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.tokenFarm.methods.P2P_Xfers(amount, token1, ReceiverAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
          })
        })
      }
      if(token1 == "bdtf"){
        this.state.bdtfToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.tokenFarm.methods.P2P_Xfers(amount, token1, ReceiverAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
          })
        })
      }
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      dappToken: {},
      bdtfToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      bdtfTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else if (window.location.pathname == "/exchange") {
      content = <Main
        daiTokenBalance={this.state.daiTokenBalance}
        dappTokenBalance={this.state.dappTokenBalance}
        bdtfTokenBalance={this.state.bdtfTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}

      />
    }else if (window.location.pathname == "/transfer") {
      content = <Transfer
      daiTokenBalance={this.state.daiTokenBalance}
      dappTokenBalance={this.state.dappTokenBalance}
      bdtfTokenBalance={this.state.bdtfTokenBalance}
      stakingBalance={this.state.stakingBalance}
      stakeTokens={this.stakeTokens}
      unstakeTokens={this.unstakeTokens}
      P2P_Xfers={this.P2P_Xfers}
      />
    }else if (window.location.pathname == "/home") {
      content = <Home/>
    }
    

    return (
      <div style={{height:"100vh"}} class="album pb-5 bg-dark" >
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="shortcut icon" href={require("./assets/images/favicon.ico")} />

          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
          <link href="assets/css/main.css" rel="stylesheet"/>
          <link href="assets/css/exchange.css" rel="stylesheet"/>

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins"/>
          <script src="https://kit.fontawesome.com/f93ed44346.js" crossorigin="anonymous"></script>

          <meta name="theme-color" content="#000000" />
          
          <title>Fishy</title>
        </Helmet>

        <header class="p-4 bg-dark text-white border-bottom border-1">
          <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Router>
              <Link to="/home" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" onClick={(event) => {
                  this.loadWeb3()}}>
                <img src={require("./assets/images/favicon.ico")} width="40" height="40" alt=""/>
                <span class="fs-4 ps-2">Fishy Swap</span>
              </Link>
            </Router>
      
              <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
                <Router>
                <Link to="/exchange" class="link-light pe-4 m-0"  onClick={(event) => {
                  this.loadWeb3()}}>Exchange</Link>
                <Link to="/transfer" class="link-light pe-4 m-0"  onClick={(event) => {
                  this.loadWeb3()}}>Transfer</Link>
                </Router>
                <button type="submit" className="btn btn-success px-4 py-2" 
                onClick={(event) => {
                  event.preventDefault()
                  this.loadWeb3()}}>Connect Wallet</button>
              </div>
            </div>
        </header>
    
        <body class="bg-dark d-flex align-items-center justify-content-center">
          <main class="bg-dark d-flex align-items-center justify-content-center">
            {content}
          </main>
        </body>
      </div>

    );
  }
}
export default App;