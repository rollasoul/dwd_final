console.log("let's start digging in the blockchain");
// we are using web3js as frontend, store the value locally with express and nedb
web3 = require("web3");
express = require('express');
app = express();
Datastore = require('nedb');
db = new Datastore({filename: "data.db", autoload: true});

// create new web3 instance with infura (pretenting to be metamask .... ;)
read_motherToken = new web3(new web3.providers.HttpProvider('https://rinkeby.infura.io/metamask'));
console.log("We are at block number: " + read_motherToken.eth.blockNumber);

setInterval(checker, 3000);
// check Name of contract
function checker (){
        console.log("mother_token left:");
        var value = read_motherToken.eth.getBalance('0x318829500cdf10D20e002dD73797128Ac47A803a').toString();
        console.log(value);
        value = parseInt(value.slice(0, -15));
        console.log(value);
        db.loadDatabase();
        db.insert(value);
        }

