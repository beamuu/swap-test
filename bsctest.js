const addresses = require("./addressBook");
const factory = require("./factory");
const pair = require("./pair");
const weth = require("./WETH");
const token1 = require("./token1");
const token2 = require("./token2");
const router = require("./router");


const Web3 = require("web3");
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
    )
);

async function test() {
    const Factory = new web3.eth.Contract(factory.abi,addresses.factoryAddress);
    const Token1 = new web3.eth.Contract(token1.abi,addresses.token1Address);
    const Katrade = new web3.eth.Contract(token1.abi,addresses.katradeAddress);
    const Tigra = new web3.eth.Contract(token1.abi,addresses.tigraAddress);
    const n = await Factory.methods.allPairsLength().call();
    console.log(`Factory now have ${n} pair(s).`);
    for (var i=0 ; i<n ; i++) {
        console.log("  >", await Factory.methods.allPairs(i).call());
    }
    console.log();
    
    console.log(await Katrade.methods.name().call())
    console.log(await Tigra.methods.name().call())

    console.log(await Katrade.methods.balanceOf("0x39b6A6fAe1e40839B8E278E10976bC3275c887Fd").call());
    console.log(await Tigra.methods.balanceOf("0x39b6A6fAe1e40839B8E278E10976bC3275c887Fd").call());

}
test();


