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