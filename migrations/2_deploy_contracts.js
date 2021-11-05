const DaiToken = artifacts.require('DaiToken');
const DappToken = artifacts.require('DappToken');
const TokenFarm = artifacts.require('TokenFarm');


module.exports = async function(deployer, network, accounts) {

  //deploy daitoken
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  //deploy dapp token
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  //deploy token farm
  await deployer.deploy(TokenFarm,dappToken.address, daiToken.address)
  // ^ pass in dapp and dai token address
  const tokenFarm = await TokenFarm.deployed()

  //^ all 3 SC is put in the network

  //xfer all dapp tokens to tokenfarm
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000') //this method is in dappToken SC

  //xfer 100 mockdai tokens to investor (second acc on ganache)
  await daiToken.transfer(accounts[1],'100000000000000000000')
};