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

        var php_sgd = usd_sgd * (usd_usd/usd_php);
        var php_php = usd_php * (usd_usd/usd_php);
        var php_bdt = usd_bdt * (usd_usd/usd_php);

        var bdt_sgd = usd_sgd * (usd_usd/usd_bdt);
        var bdt_php = usd_php * (usd_usd/usd_bdt);
        var bdt_bdt = usd_bdt * (usd_usd/usd_bdt);

        var into_amount = 0;
        var from_amount = 0;

        document.getElementById("from-token").addEventListener("change", function() {
            var price = 0;
            into_amount = 0;
            from_amount = 0;
            var from_input = document.getElementById("from-amount").value;
            var into_input = document.getElementById("into-amount").value;
            var into_select = document.getElementById("into-token");
            var into_select_options = document.getElementById("into-token").getElementsByTagName("option");
            if (this.value == "sgd") {
                price = sgd_sgd; 
                disable_options(into_select_options, "sgd");
                if (from_input > 0){
                    if (into_select.value == "sgd") {
                        into_amount = get_amount(sgd_sgd, from_input);
                    }
                    if (into_select.value == "php") {
                        into_amount = get_amount(sgd_php, from_input);
                    }
                    if (into_select.value == "bdt") {
                        into_amount = get_amount(sgd_bdt, from_input);
                    }
                }
                else if (into_input > 0){
                    if (into_select.value == "sgd") {
                        from_amount = get_amount(sgd_sgd, into_input);
                    }
                    if (into_select.value == "php") {
                        from_amount = get_amount(php_sgd, into_input);
                    }
                    if (into_select.value == "bdt") {
                        from_amount = get_amount(bdt_sgd, into_input);
                    }
                }

            }
            if (this.value == "php") {
                price = sgd_php;
                disable_options(into_select_options, "php");
                if (from_input > 0){
                    if (into_select.value == "sgd") {
                        into_amount = get_amount(php_sgd, from_input);
                    }
                    if (into_select.value == "php") {
                        into_amount = get_amount(php_php, from_input);
                    }
                    if (into_select.value == "bdt") {
                        into_amount = get_amount(php_bdt, from_input);
                    }
                }
                else if (into_input > 0){
                    if (into_select.value == "sgd") {
                        from_amount = get_amount(sgd_php, into_input);
                    }
                    if (into_select.value == "php") {
                        from_amount = get_amount(php_php, into_input);
                    }
                    if (into_select.value == "bdt") {
                        from_amount = get_amount(bdt_php, into_input);
                    }
                }
            }
            if (this.value == "bdt") {
                price = sgd_bdt;
                disable_options(into_select_options, "bdt");
                if (from_input > 0){
                    if (into_select.value == "sgd") {
                        into_amount = get_amount(bdt_sgd, from_input);
                    }
                    if (into_select.value == "php") {
                        into_amount = get_amount(bdt_php, from_input);
                    }
                    if (into_select.value == "bdt") {
                        into_amount = get_amount(bdt_bdt, from_input);
                    }
                }
                else if (into_input > 0){
                    if (into_select.value == "sgd") {
                        from_amount = get_amount(sgd_bdt, into_input);
                    }
                    if (into_select.value == "php") {
                        from_amount = get_amount(php_bdt, into_input);
                    }
                    if (into_select.value == "bdt") {
                        from_amount = get_amount(bdt_bdt, into_input);
                    }
                }
            }
            document.getElementById("from-price").innerHTML = "SGD PRICE: " + price.toFixed(2);
            if (into_amount > 0) {
                document.getElementById("into-amount").value = into_amount.toFixed(2);
            }
            if (from_amount > 0) {
                document.getElementById("from-amount").value = from_amount.toFixed(2);
            }
            
        });

        document.getElementById("into-token").addEventListener("change", function() {
            var price = 0;
            from_amount = 0;
            into_amount = 0;
            var into_input = document.getElementById("into-amount").value;
            var from_input = document.getElementById("from-amount").value;
            var from_select = document.getElementById("from-token");
            var from_select_options = document.getElementById("from-token").getElementsByTagName("option");
            if (this.value == "sgd") {
                price = sgd_sgd;
                disable_options(from_select_options, "sgd");
                if (into_input > 0){
                    if (from_select.value == "sgd") {
                        from_amount = get_amount(sgd_sgd, into_input);
                    }
                    if (from_select.value == "php") {
                        from_amount = get_amount(sgd_php, into_input);
                    }
                    if (from_select.value == "bdt") {
                        from_amount = get_amount(sgd_bdt, into_input);
                    }
                }
                else if (from_input > 0){
                    if (from_select.value == "sgd") {
                        into_amount = get_amount(sgd_sgd, from_input);
                    }
                    if (from_select.value == "php") {
                        into_amount = get_amount(php_sgd, from_input);
                    }
                    if (from_select.value == "bdt") {
                        into_amount = get_amount(bdt_sgd, from_input);
                    }
                }
            }
            if (this.value == "php") {
                price = sgd_php;
                disable_options(from_select_options, "php");
                if (into_input > 0){
                    if (from_select.value == "sgd") {
                        from_amount = get_amount(php_sgd, into_input);
                    }
                    if (from_select.value == "php") {
                        from_amount = get_amount(php_php, into_input);
                    }
                    if (from_select.value == "bdt") {
                        from_amount = get_amount(php_bdt, into_input);
                    }
                }
                else if (from_input > 0){
                    if (from_select.value == "sgd") {
                        into_amount = get_amount(sgd_php, from_input);
                    }
                    if (from_select.value == "php") {
                        into_amount = get_amount(php_php, from_input);
                    }
                    if (from_select.value == "bdt") {
                        into_amount = get_amount(bdt_php, from_input);
                    }
                }
            }
            if (this.value == "bdt") {
                price = sgd_bdt;
                disable_options(from_select_options, "bdt");
                if (into_input > 0){
                    if (from_select.value == "sgd") {
                        from_amount = get_amount(bdt_sgd, into_input);
                    }
                    if (from_select.value == "php") {
                        from_amount = get_amount(bdt_php, into_input);
                    }
                    if (from_select.value == "bdt") {
                        from_amount = get_amount(bdt_bdt, into_input);
                    }
                }
                else if (from_input > 0){
                    if (from_select.value == "sgd") {
                        into_amount = get_amount(sgd_bdt, from_input);
                    }
                    if (from_select.value == "php") {
                        into_amount = get_amount(php_bdt, from_input);
                    }
                    if (from_select.value == "bdt") {
                        into_amount = get_amount(bdt_bdt, from_input);
                    }
                }
            }
            document.getElementById("into-price").innerHTML = "SGD PRICE: " + price.toFixed(2);
            if (from_amount > 0) {
                document.getElementById("from-amount").value = from_amount.toFixed(2);
            }
            if (into_amount > 0) {
                document.getElementById("into-amount").value = into_amount.toFixed(2);
            }
        });

        document.getElementById("from-amount").addEventListener("change",function () {
            into_amount = 0;
            var from_token = document.getElementById("from-token");
            var into_token = document.getElementById("into-token");
            if (from_token.value == "sgd") { 
                if (into_token.value == "sgd") {
                    into_amount = get_amount(sgd_sgd, this.value);
                }
                if (into_token.value == "php") {
                    into_amount = get_amount(sgd_php, this.value);
                }
                if (into_token.value == "bdt") {
                    into_amount = get_amount(sgd_bdt, this.value);
                }
            }
            if (from_token.value == "php") {
                if (into_token.value == "sgd") {
                    into_amount = get_amount(php_sgd, this.value);
                }
                if (into_token.value == "php") {
                    into_amount = get_amount(php_php, this.value);
                }
                if (into_token.value == "bdt") {
                    into_amount = get_amount(php_bdt, this.value);
                }
            }
            if (from_token.value == "bdt") {   
                if (into_token.value == "sgd") {
                    into_amount = get_amount(bdt_sgd, this.value);
                }
                if (into_token.value == "php") {
                    into_amount = get_amount(bdt_php, this.value);
                }
                if (into_token.value == "bdt") {
                    into_amount = get_amount(bdt_bdt, this.value);
                }
            }
            document.getElementById("into-amount").value = into_amount.toFixed(2);
        })

        document.getElementById("into-amount").addEventListener("change",function () {
            from_amount = 0;
            var from_token = document.getElementById("from-token");
            var into_token = document.getElementById("into-token");
            if (into_token.value == "sgd") { 
                if (from_token.value == "sgd") {
                    from_amount = get_amount(sgd_sgd, this.value);
                }
                if (from_token.value == "php") {
                    from_amount = get_amount(sgd_php, this.value);
                }
                if (from_token.value == "bdt") {
                    from_amount = get_amount(sgd_bdt, this.value);
                }
            }
            if (into_token.value == "php") {
                if (from_token.value == "sgd") {
                    from_amount = get_amount(php_sgd, this.value);
                }
                if (from_token.value == "php") {
                    from_amount = get_amount(php_php, this.value);
                }
                if (from_token.value == "bdt") {
                    from_amount = get_amount(php_bdt, this.value);
                }
            }
            if (into_token.value == "bdt") {   
                if (from_token.value == "sgd") {
                    from_amount = get_amount(bdt_sgd, this.value);
                }
                if (from_token.value == "php") {
                    from_amount = get_amount(bdt_php, this.value);
                }
                if (from_token.value == "bdt") {
                    from_amount = get_amount(bdt_bdt, this.value);
                }
            }
            document.getElementById("from-amount").value = from_amount.toFixed(2);
        })
    }
    else {
        console.log("fail");
    }
};
xhr.open("GET", url, true);
xhr.send();

function disable_options(option, currency) {
    for (var i = 1; i < option.length; i++) {
        if (option[i].value.toLowerCase() == currency) {
            option[i].disabled = true ;
        }
        else {
            option[i].disabled = false ;
        }
    }
}

function get_amount(rate, value) {
    return rate*value;
}