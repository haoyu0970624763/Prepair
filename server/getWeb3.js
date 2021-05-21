/*var Web3 = require('web3');
const ethereumUri = 'http://localhost:8545';
const address = '0x8883d7dc9fe7f08615e073d1a6afed2ae71cb3e5'

//connect to geth
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));*/
var Web3 = require('web3');
var provider = new Web3.providers.HttpProvider('http://localhost:8545');
var web3 = new Web3(provider);

web3.eth.net.isListening().then(console.log);
/*if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}else{
    console.log('connected to ehterum node at ' + ethereumUri);
    let accounts = web3.eth.accounts;
    console.log(accounts);
	if (web3.personal.unlockAccount(address, '111111')) {
        console.log(`${address} is unlocaked`);
    }else{
        console.log(`unlock failed, ${address}`);
    }
}*/
//web3.eth.getAccounts(console.log);
module.exports = web3;