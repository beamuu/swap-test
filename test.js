const Web3 = require("web3");
const factory = require("./factory");
const pair = require("./pair");
const weth = require("./WETH");
const token1 = require("./token1");
const token2 = require("./token2");
const router = require("./router");

const addresses = {
    Factory: "0x92d822D2aAE25a9C7D260b2B535690F04Cd32fd8",
    Token1: "0x4Ac4CAe260c0b64a94d6a391EB2F19F5311c44aB",
    Token2: "0x133a4A917e00d3030c93450b4Cc99576b822F554",
    WETH: "0x69D6d0dE4Df3340C83C9b93EBDdD6c7603B769a7",
    Router: "0xb4fC8d2177De2422C412De9187C995a77Ba2657e",
    Pair1: "",
    owner: "0x304135fAefd0d9A52C6Bf5aC7cD953c4d026169d",
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
