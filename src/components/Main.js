import React, { Component } from 'react'
import dai from '../dai.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mDAI</td>
              <td>{window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')} DAPP</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                // let amountfirstbox
                // amountfirstbox = this.input.value.toString() //here a
                // amountfirstbox = window.web3.utils.toWei(amountfirstbox, 'Ether')
                // this.props.stakeTokens(amountfirstbox)
                console.log("here")
                let res = this.menu.value;
                console.log(res)
                console.log(this.input2.value)
                
              }}>
              <div>
                <label className="float-left"><b>Stake Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}
                </span>
              </div>
              
              {/* first box currency */}
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }} //here a
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                <select id = "dropdown" ref = {(input)=> this.menu = input}>
    <option value="N/A">N/A</option>
    <option value="1">SGDF</option>
    <option value="2">RM</option>
    <option value="3">3</option>
    <option value="4">4</option>
</select>
                </div>
              </div>

              {/* this is the down arrow */}
              <img src = {require("./assets/images/coin.png")} width="20" height="21" /> 

        
        {/* second box currency */}
              <div className="input-group mb-4"> 
                <input
                  type="text"
                  ref={(input2) => { this.input2 = input2 }} //here a
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                                  <select id = "dropdown" ref = {(input)=> this.input2 = input}>
                    <option value="N/A">N/A</option>
                    <option value="1">SGDF</option>
                    <option value="2">RM</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
            </form>
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                UN-STAKE...
              </button>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;