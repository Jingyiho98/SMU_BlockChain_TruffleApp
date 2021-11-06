pragma solidity ^0.5.0;

//pull Src code of the two token into this file
import "./DappToken.sol";
import "./DaiToken.sol";
import "./BDTFToken.sol";


//assume both tokens has been deployed into the network

contract TokenFarm {
    //give contract name
    string public name = "Dapp Token Farms";
    // this is variable ^ stored on BC -- solidity is statically typed

    address public owner;

    //state variable -- global var
    DappToken public dappToken;
    DaiToken public daiToken;
    // BDTFToken public bdtfToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        //get address from both deployed tokens (where they are located) and pass them into SC tokenfarm whenever its created
        //assign into state variable
        dappToken = _dappToken;
        daiToken = _daiToken;
        // BDTFToken = _bdtfToken;
        owner = msg.sender;
    }

    //1. stake tokens (Deposit) //xfer money from investor to the TokenFarm SC
    // CHANGE THIS FUNCTION TO EXCHANGE
    function stakeTokens(uint256 _amount,  string memory _type, uint256 _currency, string memory _typeto) public {
        //error handling
        require(_amount > 0, "amount cannot be 0");
       
        // deposit
        if (keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked("dai"))){
            daiToken.transferFrom(msg.sender, address(this), _amount);
        }
        if (keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked("dapp"))){
            dappToken.transferFrom(msg.sender, address(this), _amount);
        }

        // exchanged
        if (keccak256(abi.encodePacked(_typeto)) == keccak256(abi.encodePacked("dapp"))){
            dappToken.transfer(msg.sender, _currency);
        }
        if (keccak256(abi.encodePacked(_typeto)) == keccak256(abi.encodePacked("dai"))){
            daiToken.transfer(msg.sender, _currency);
        }
        //xfer Mock Dai tokens to this SC
        //msg is a global var... sender is whoever initiated that function
        // deposit
        // if (_type == "dai"){
        //     daiToken.transferFrom(msg.sender, address(this), _amount);
        // }
        // if (_type == "dapp"){
        //     dappToken.transferFrom(msg.sender, address(this), _amount);
        // }

        // if (_typeto == "dapp"){
        //     dappToken.transfer(msg.sender, _currency);
        // }
        // if (_typeto == "dai"){
        //     daiToken.transfer(msg.sender, _currency);
        // }
        // if (_type == "dapp"){
        //     dappToken.transfer(msg.sender, amtSend);
        // }




        // if (_type == "dapp") {
        // if (_type == "php") {
        


        //Update staking balance
        // stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //add user to staker array *only if they havent stake already //dont think this is needed
        // if (!hasStaked[msg.sender]) {
        //     stakers.push(msg.sender);
        // }

        // //update staking status //dont think this is needed
        // isStaking[msg.sender] = true;
        // hasStaked[msg.sender] = true;
        // exchangeToken(_amount);
    }

    //2. unstaking tokens (Withdraw)
    function unstakeTokens() public {
        //fetch staking balance
        uint256 balance = stakingBalance[msg.sender];

        //xfer deposit token (daitoken) back to investor
        daiToken.transfer(msg.sender, balance);

        //reset staking
        stakingBalance[msg.sender] = 0;

        //update staking status
        hasStaked[msg.sender] = false;
    }

    // function exchangeToken(_amount) public {
    //     // require(msg.sender == owner, "caller must be owner");
    //     dappToken.transfer(msg.sender, _amount);

  
    // }
    //3. issuing tokens (-- give it to another account here )
    function issueTokens() public {
        require(msg.sender == owner, "caller must be owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }

    //what we need???!!

    //press a button to xfer = call this function!
    //amountToSend is the calculated rate (For example xfer 1USD over, the recipent will receive equivalent money depending on the currency (for example SGD is 1.3))
    //need to know address of recipent --> check tmr!
    function xferTokens(
        uint256 _amountToSend,
        uint256 _amountOfCurrent,
        address _toAddress
    ) public {
        //only owner can call this function
        require(msg.sender == owner, "caller must be owner");
        //xfer Mock Dai tokens to this SC
        //msg is a global var... sender is whoever initiated that function
        //xfer to another account --> tokenFarm already have that token xfer to it, like dApp token liddat
        // anotherToken.transfer(_toAddress, _amount)
        //cr8 var amountoSend --> check exchnage rate first
        dappToken.transfer(_toAddress, _amountToSend); //amttosend here);

        //Update deposit balance
        stakingBalance[msg.sender] =
            stakingBalance[msg.sender] -
            _amountOfCurrent;
    }

    //login as recipient account and withdraw the money received , press a button to withdraw
    //have a page called "Balance" , auto update balance??? and have withdraw button
    function withdrawTokens() public {
        //fetch current balance (if got xfer)
        //depend on currency and replace dapptoken accordingly
        uint256 balance = dappToken.balanceOf(msg.sender);

        //xfer given token (dapptoken) to own account -- same for this
        dappToken.transfer(msg.sender, balance);
    }

    //try send money
}
