import React, { Component } from 'react'
// import dai from '../dai.png'
import { Helmet } from 'react-helmet';



class Home extends Component {
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
      
          var sgd_sgd = usd_sgd * (usd_usd/usd_sgd);
          var sgd_php = usd_php * (usd_usd/usd_sgd);
          var sgd_bdt = usd_bdt * (usd_usd/usd_sgd);
      
          document.getElementById("sgd").innerHTML = "$" + sgd_sgd.toFixed(2);
          document.getElementById("php").innerHTML = "$" + sgd_php.toFixed(2);
          document.getElementById("bdt").innerHTML = "$" + sgd_bdt.toFixed(2);
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
        <Helmet>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="shortcut icon" href="assets/images/favicon.ico" />

          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
          <link href="assets/css/main.css" rel="stylesheet"/>

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins"/>
          <script src="https://kit.fontawesome.com/f93ed44346.js" crossorigin="anonymous"></script>
          <script src="assets/js/price.js" type="text/javascript"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"></script>
          <meta name="theme-color" content="#000000" />
          <meta http-equiv="refresh" content="60"/>

          <title>Fish - Exchange</title>
        </Helmet>
        <body>
        <main class="bg-dark">

          <section class="py-5 text-left container">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 py-5">
                <h1 class="fw-light text-white pb-3 fw-bold">Tokens</h1>
                <p>
                  <a href="exchange.html" class="btn btn-success my-2 px-4 py-2">Exchange</a>
                </p>
              </div>
            </div>
          </section>

          <div class="album pb-5 bg-dark">
            <div class="container pb-5">

              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div class="col">
                  <div class="card">    
                    <div class="card-body p-5">
                      <div class="d-flex pb-5">
                        <img class="me-4" src={require("./assets/images/coin.png")} width="90" height="90" alt=''/>

                        <div>
                          <h3 class="card-title text-white fw-bold pb-2">SGDF</h3>
                          <p class="card-subtitle text-muted pb-2">SGD PRICE</p>
                          <h5 class="card-subtitle text-white" id="sgd"></h5>
                        </div>
                      </div>
                      <p class="card-text text-muted pb-4">Tracks the price of a single SG Dollar (SGD). This always remains constant at 1.</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <p class="text-white card-subtitle ">FEE: 0.20%</p>
                        <span class="badge bg-success"><p class="m-0 fw-bold card-subtitle">LIVE</p></span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col">
                  <div class="card">    
                    <div class="card-body p-5">
                      <div class="d-flex pb-5">
                        <img class="me-4" src={require("./assets/images/coin.png")} width="90" height="90" alt=''/>


                        <div>
                          <h3 class="card-title text-white fw-bold pb-2">PHPF</h3>
                          <p class="card-subtitle text-muted pb-2">SGD PRICE</p>
                          <h5 class="card-subtitle text-white" id="php"></h5>
                        </div>
                      </div>
                      <p class="card-text text-muted pb-4">Tracks the price of PHPF Pesos thorugh price feeds by an API.</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <p class="text-white card-subtitle">FEE: 0.20%</p>
                        <span class="badge bg-success"><p class="m-0 fw-bold card-subtitle">LIVE</p></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="card">    
                    <div class="card-body p-5">
                      <div class="d-flex pb-5">
                        <img class="me-4" src={require("./assets/images/coin.png")} width="90" height="90" alt=''/>

                        <div>
                          <h3 class="card-title text-white fw-bold pb-2">BDTF</h3>
                          <p class="card-subtitle text-muted pb-2">SGD PRICE</p>
                          <h5 class="card-subtitle text-white" id="bdt"></h5>
                        </div>
                      </div>
                      <p class="card-text text-muted pb-4">Tracks the price of BDTF Takas thorugh price feeds by an API.</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <p class="text-white card-subtitle ">FEE: 0.20%</p>
                        <span class="badge bg-success"><p class="m-0 fw-bold card-subtitle">LIVE</p></span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          </main>
        </body>



       </div>
        
    )
  }
}

export default Home;