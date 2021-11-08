import React, { Component } from 'react'
// import dai from '../dai.png'


class Transfer extends Component {
  // name(params) {
  //   document.getElementById(id).innerHTML = new HTML
    
  // }
 

 
  render() {
    return (
       <div id="content" className="mt-3">
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">SGDF Balance</th>
              <th scope="col">PHPF Balance</th>
              <th scope="col">BDTF Balance</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')} SGDF</td>
              <td>{window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')} PHPF</td>
              <td>{window.web3.utils.fromWei(this.props.bdtfTokenBalance, 'Ether')} BDTF</td>
            </tr>
          </tbody>
        </table>
        
        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amountfirstbox = this.input.value
                let ReceiverAddress = this.ReceiverAddress.value
                let token1= this.menu.value

                // dai to dapp

                amountfirstbox = this.input.value.toString() //here a
                amountfirstbox = window.web3.utils.toWei(amountfirstbox, 'Ether')

                this.props.P2P_Xfers(amountfirstbox, token1, ReceiverAddress)
                

                
              }}>
              <div>
                <label className="float-left text-light" ><b>Transfer Funds</b></label>
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
                <select id = "dropdown" ref = {(input)=> this.menu = input} className="form-select form-select-lg mb-3">
                  <option disabled>Select</option>
                  <option value= "dai" >SGDF</option>
                  <option value="dapp">PHPF</option>
                  <option value="bdtf">BDTF</option>
                </select>
                </div>

              </div>

              {/* this is the down arrow */}

        
        {/* second box currency */}
              <div className="input-group mb-4"> 
                <input
                  type="text"
                  ref={(input) => { this.ReceiverAddress = input }} //here a
                  className="form-control form-control-lg"
                  placeholder="Enter Wallet Address"
                  required />
              </div>
              <button type="submit" className="btn btn-success btn-block btn-lg">Send</button>
            </form>

          </div>
        </div>

      </div>
    )
  }

}

export default Transfer;
