const Web3 = require("web3");
const factory = require("./factory");
const pair = require("./pair");
const weth = require("./WETH");
const token1 = require("./token1");
const token2 = require("./token2");
const router = require("./router");

const addresses = {
    Factory: "0x9f45793D732FCa933B57221FF1aCb559CacE96f5",
    Token1: "0x50D11C4539bA019781ee1c26D180B502538dD14d",
    Token2: "0x8A587C1477b8a790217EE92d6b7c32cF4f7b3b27",
    WETH: "0x4c2Da59460ec7aaB624385465F8D8e08F50847E7",
    Router: "0x9A8eb5556836E4D69c9ECF415834a20073C17279",
    Pair1: "",
    owner: "0x31e2DCD46bb721e362a403245205205642cAEA34",
}
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        "http://localhost:7545"
    )
);

async function main() {

    const FactoryInstance = new web3.eth.Contract(factory.abi, addresses.Factory);
    const RouterInstance = new web3.eth.Contract(router.abi, addresses.Router);

    // set pair
    addresses.Pair1 = await FactoryInstance.methods.getPair(addresses.Token1, addresses.Token2).call();

    const WETH = new web3.eth.Contract(weth.abi,addresses.WETH);
    const Token1 = new web3.eth.Contract(token1.abi, addresses.Token1);
    const Token2 = new web3.eth.Contract(token2.abi, addresses.Token2);

    console.log(await Token1.methods.balanceOf(addresses.owner).call());
    console.log(await Token2.methods.balanceOf(addresses.owner).call());
    // console.log(await WETH.methods.balanceOf(addresses.owner).call());
    // console.log(await WETH.methods.balanceOf(addresses.WETH).call());


    var ts = Math.round(((new Date()).getTime() + 3000000000) / 1000);

    // check router
    console.log(await RouterInstance.methods.factory().call());
    console.log(await RouterInstance.methods.WETH().call());
    const a = await RouterInstance.methods.addLiquidity(
        addresses.Token1,
        addresses.Token2,
        1000,
        1000,
        1000,
        1000,
        addresses.owner,
        1635685516
    )
    .send({
        from: addresses.owner
    });
    console.log(a);



    

    
    const PairInstance = new web3.eth.Contract(pair.abi, addresses.Pair1);
    console.log(await PairInstance.methods.balanceOf(addresses.owner).call());
    const {_reserve0, _reserve1, _blockTimestampLast} = await PairInstance.methods.getReserves().call();
    console.log(_reserve0, _reserve1, _blockTimestampLast);




    // console.log(await PairInstance.methods.token0().call());
    // console.log(await PairInstance.methods.token1().call());
}


main();
