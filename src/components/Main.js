import React, { Component } from 'react'
// import dai from '../dai.png'



class Main extends Component {
  // name(params) {
  //   document.getElementById(id).innerHTML = new HTML
    
  // }
  componentDidMount () {
    var apikey = "5305b16394d8ea87d1250794052cf522";
    var currency = "USD,SGD,PHP,BDT";
    var url = "http://api.currencylayer.com/live?access_key="+apikey+"&currencies="+currency;
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhr.response);
        var usd_usd = data.quotes[Object.keys(data.quotes)[0]];
        var usd_sgd = data.quotes[Object.keys(data.quotes)[1]];
        var usd_php = data.quotes[Object.keys(data.quotes)[2]];
        var usd_bdt = data.quotes[Object.keys(data.quotes)[3]];
        // DAI IS SGD
        // DAPP IS PHPF
        // dapp to dai is 2
        // dai to dapp is /2
        // give 100 dapp get 200 dai 
        // give 100 dai get 50 dapp
        //  stakeTokens(100, dapp, 2, dai)
        //  stakeTokens(100, dai, 0.5, dapp)
        var dai_dai = usd_sgd * (usd_usd/usd_sgd);
        var dai_dapp = usd_php * (usd_usd/usd_sgd);
        var dai_bdt = usd_bdt * (usd_usd/usd_sgd);

        document.getElementById("apiRates").innerHTML =dai_dapp.toFixed(2);
        document.getElementById("apiRates2").innerHTML =dai_bdt.toFixed(2);
        // document.getElementById("apiRates2").innerHTML ="Exchange rate is : $" + dai_bdt.toFixed(2);

        // document.getElementById("php").innerHTML = "$" + dai_dapp.toFixed(2);
        // document.getElementById("bdt").innerHTML = "$" + dai_bdt.toFixed(2);
        
        }
        else {
        console.log("fail");
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }


 
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
              <td>{window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')} mDAI</td>
              <td>{window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')} DAPP</td>
            </tr>
          </tbody>
        </table>
        
        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amountfirstbox = this.input.value
                let token1= this.menu.value
                let token2= this.menu2.value
                let exchangeRate
                let amountToSend
                if( token1 === "dai" && token2 === "dapp"){
                  exchangeRate = parseFloat(document.getElementById("apiRates").innerHTML)
                  amountToSend = parseInt(amountfirstbox) * exchangeRate

                }
                if( token1 === "dapp" && token2 === "dai"){
                  exchangeRate = parseFloat(document.getElementById("apiRates").innerHTML)
                  amountToSend = parseInt(amountfirstbox) / exchangeRate

                }
                console.log(exchangeRate)
                console.log(amountToSend)

                amountToSend = amountToSend.toString()
                amountfirstbox = this.input.value.toString() //here a
                amountfirstbox = window.web3.utils.toWei(amountfirstbox, 'Ether')
                amountToSend =window.web3.utils.toWei(amountToSend, 'Ether')

                this.props.stakeTokens(amountfirstbox, token1, amountToSend, token2)

                // dapp to dai is 2
                // dai to dapp is /2
                // dapp to phpf is 3727
                // phpf to dapp is /3727
                // console.log("here")
                // let res = this.menu.value;
                // console.log(res)
                // console.log(this.input2.value)
                
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
                <select id = "dropdown" ref = {(input)=> this.menu = input} className="form-select form-select-lg mb-3">
                  <option disabled>Select</option>
                  <option value= "dai" >DAI</option>
                  <option value="dapp">DAPP</option>
                  <option value="BDTF">BDTF</option>
                </select>
                </div>

              </div>
              <span className="float-right text-muted" id = "apiRates"></span>
              <br></br>
              <span className="float-right text-muted" id = "apiRates2"></span>
              <br></br>
              {/* <span className="float-right text-muted" id = "apiRates3"></span> */}
              <br></br>
              {/* this is the down arrow */}
              <div class="d-flex flex-wrap align-items-center justify-content-center">
            {/* <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"> */}

                <img src = {require("./assets/images/down-arrow.png")} width="20" height="21" alt= "" /> 
              </div>
              <br></br>

        
        {/* second box currency */}
              <div className="input-group mb-4"> 
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="0"
                  disabled />
                <div className="input-group-append">
                    <select id = "dropdown2" ref = {(input)=> this.menu2 = input} className="form-select form-select-lg mb-3">
                    <option value="dai">DAI</option>
                    <option value="dapp" selected>DAPP</option>
                    <option value="BDTF">BDTF</option>
                </select>
                </div>
              </div>
              <button type="submit" className="btn btn-success btn-block btn-lg">STAKE!</button>
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
    )
  }

}

export default Main;