// blockchain contract created a new token/currency called 'mother-token' based on Ethereum, runs on blcokchain
// node interfacing with the blockchain via infura and metamask
// contract running on the chain, this script reads changes in contract
// changes get stored in db-file (and continuously checked by python script that triggers servo if changes occur)

console.log("let's start digging in the blockchain");
// we are using web3js as frontend
web3 = require("web3");
Datastore = require('nedb');
db = new Datastore({filename: "data.db", autoload: true});

// create new web3 instance with infura (pretenting to be metamask .... ;)
read_motherToken = new web3(new web3.providers.HttpProvider('https://rinkeby.infura.io/metamask'));
console.log("We are at block number: " + read_motherToken.eth.blockNumber);

// read in contract file from mother_token (copied from ethereum wallet)
c = read_motherToken.eth.contract([ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "mother_token" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "2" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "ø" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "10000" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "mother_token" }, { "name": "tokenSymbol", "type": "string", "index": 2, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "ø" }, { "name": "decimalUnits", "type": "uint8", "index": 3, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "value": "2" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]);

// map contract to contract address on the rinkeby-testnet
i = c.at("0x9ef7d4D025E36a2e40b24e078d2F5F3bd3135e51");

setInterval(checker, 3000);
// check Name of contract, save value to database on Raspberry Pi
function checker (){
    if (i.name() == 'mother_token') {
  	console.log("mother_token left:");
  	var value = i.balanceOf('0x318829500cdf10D20e002dD73797128Ac47A803a').toString();
  	console.log(value);
  	value = parseInt(value);
  	console.log(value);
	db.loadDatabase();
  	db.insert(value);
	}
	else {
  		console.log("ooops ... something went wrong!")
	}
}
