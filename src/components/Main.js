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

        // var dai_dai = usd_sgd * (usd_usd/usd_sgd);
        // var dai_dapp = usd_php * (usd_usd/usd_sgd);
        // var dai_bdt = usd_bdt * (usd_usd/usd_sgd);


        // var sgd_sgd = usd_sgd * (usd_usd/usd_sgd);
        var sgd_php = usd_php * (usd_usd/usd_sgd);
        var sgd_bdt = usd_bdt * (usd_usd/usd_sgd);

        var php_sgd = usd_sgd * (usd_usd/usd_php);
        // var php_php = usd_php * (usd_usd/usd_php);
        var php_bdt = usd_bdt * (usd_usd/usd_php);

        var bdt_sgd = usd_sgd * (usd_usd/usd_bdt);
        var bdt_php = usd_php * (usd_usd/usd_bdt);
        // var bdt_bdt = usd_bdt * (usd_usd/usd_bdt);

        document.getElementById("sgd_php").innerHTML =sgd_php.toFixed(2);
        document.getElementById("php_sgd").innerHTML =php_sgd.toFixed(2);
        document.getElementById("bdt_sgd").innerHTML =bdt_sgd.toFixed(2);
        document.getElementById("sgd_bdt").innerHTML =sgd_bdt.toFixed(2);
        document.getElementById("php_bdt").innerHTML =php_bdt.toFixed(2);
        document.getElementById("bdt_php").innerHTML =bdt_php.toFixed(2);
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
        <div class="row g-0 mb-4">
          
          <div class="card">    
            <div class="card-body p-5">
              <div class="d-flex justify-content-center">
                <div>
                  <p class="card-subtitle text-muted pb-2 text-center">Available Balance</p>
                  <div class="d-flex justify-content-center align-items-center">
                    <div class="mb-0">
                    <table className="table table-borderless text-white text-center mb-0">
                      <thead>
                        <tr>
                          <th scope="col"><p class="text-white card-subtitle px-2">SGDF BALANCE</p></th>
                          <th scope="col"><p class="text-white card-subtitle px-2">PHPF BALANCE</p></th>
                          <th scope="col"><p class="text-white card-subtitle px-2">BDTF BALANCE</p></th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><label class="text-light mb-0">{window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')} mDAI</label></td>
                          <td><label class="text-light mb-0">{window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')} DAPP</label></td>
                          <td><label class="text-light mb-0">{window.web3.utils.fromWei(this.props.bdtfTokenBalance, 'Ether')} BDTF</label></td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amountfirstbox = this.input.value
                let token1= this.menu.value
                let token2= this.menu2.value
                let exchangeRate
                let amountToSend

                // dai to dapp
                if( token1 === "dai" && token2 === "dapp"){
                  exchangeRate = parseFloat(document.getElementById("sgd_php").innerHTML)
                  amountToSend = parseInt(amountfirstbox) * exchangeRate
                }
                // dapp to dai
                if( token1 === "dapp" && token2 === "dai"){
                  exchangeRate = parseFloat(document.getElementById("php_sgd").innerHTML)
                  amountToSend = parseInt(amountfirstbox) * exchangeRate
                }
                // dai to bdtf
                if( token1 === "dai" && token2 === "bdtf"){
                  exchangeRate = parseFloat(document.getElementById("bdt_sgd").innerHTML)
                  amountToSend = parseInt(amountfirstbox) * exchangeRate
                }
                // bdtf to dai
                if( token1 === "bdtf" && token2 === "dai"){
                  exchangeRate = parseFloat(document.getElementById("sgd_bdt").innerHTML)
                  amountToSend = parseInt(amountfirstbox) * exchangeRate
                }
                // dapp to bdtf
                if( token1 === "dapp" && token2 === "bdtf"){
                  exchangeRate = parseFloat(document.getElementById("php_bdt").innerHTML)
                  amountToSend = parseInt(amountfirstbox) * exchangeRate
                }
                // bdtf to dapp
                if( token1 === "bdtf" && token2 === "dapp"){
                  exchangeRate = parseFloat(document.getElementById("bdt_php").innerHTML)
                  amountToSend = parseInt(amountfirstbox) * exchangeRate
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
        <div class="row g-0">
        <div class="col">
          <div class="card">    
            <div class="card-body p-5">
              <div class="d-flex">
                <div>
                  <p class="card-subtitle text-muted pb-2">From</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="mb-3">
                    <label for="dropdown" class="form-label text-light">Token</label>
                    <select id = "dropdown" ref = {(input)=> this.menu = input} className="form-select">
                      <option disabled>Select</option>
                      <option value= "dai">DAI</option>
                      <option value="dapp">DAPP</option>
                      <option value="bdtf">BDTF</option>
                    </select>
                    </div>
                    <div class="mb-3">
                    <label class="form-label text-light">Amount</label>
                    <input
                      type="text"
                      ref={(input) => { this.input = input }} //here a
                      className="form-control"
                      placeholder="0"
                      required />
                    </div>
                  </div>
                  <p class="text-white card-subtitle" id="from-price">BALANCE: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}</p>
                  <span className="float-right text-muted" id = "sgd_php"hidden></span>
                  {/* <br></br> */}
                  <span className="float-right text-muted" id = "sgd_bdt"hidden></span>
                  {/* <br></br> */}
                  <span className="float-right text-muted" id = "bdt_sgd"hidden></span>
                  {/* <br></br> */}
                  <span className="float-right text-muted" id = "bdt_php"hidden></span>
                  {/* <br></br> */}
                  <span className="float-right text-muted" id = "php_sgd"hidden></span>
                  {/* <br></br> */}
                  <span className="float-right text-muted" id = "php_bdt"hidden></span>
                  {/* <br></br> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1 d-flex align-items-center justify-content-center">
          <img src = {require("./assets/images/exchange.png")} width="20" height="20" alt= "" /> 
        </div>
        <div class="col">
          <div class="card">    
            <div class="card-body p-5">
              <div class="d-flex">
                <div>
                  <p class="card-subtitle text-muted pb-2">Into</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="mb-3">
                      <label for="dropdown2" class="form-label text-light">Token</label>
                      <select id = "dropdown2" ref = {(input)=> this.menu2 = input} className="form-select">
                        <option value="dai">DAI</option>
                        <option value="dapp" selected>DAPP</option>
                        <option value="bdtf">BDTF</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label text-light">Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                        disabled />

                    </div>
                  </div>
                  <p class="text-white card-subtitle" id="from-price">&nbsp;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-0 pt-4">
        <div class="col d-flex align-items-center justify-content-center">
          <button type="submit" className="btn btn-success px-4 py-2">STAKE!</button>
        </div>
      </div>
      </form>
      <div class="row g-0">
        <div class="col d-flex align-items-center justify-content-center">
          <button
              type="submit"
              className="btn btn-dark btn-sm px-4 py-2"
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