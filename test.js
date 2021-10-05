const Web3 = require("web3");
const factory = require("./factory");
const pair = require("./pair");
const weth = require("./WETH");
const token1 = require("./token1");
const token2 = require("./token2");
const router = require("./router");

const addresses = {
    Factory: "0x1e17A2355caea4499b1936E4C60069435905B6dF",
    Token1: "0x418DAC2B6226e24f6698aA4016fF86a17E3efB22",
    Token2: "0x0A4A999891aDe045d8f39e9D067cD6a1Ba69D6Ed",
    WETH: "0xCd500B08cB0392B21faaC3F8878Dbb29869890b6",
    Router: "0x11E6b15Cf84b2FA2A6d4A7623634155Fd25A2f01",
    Pair1: "",
    owner: "0xefEfbbC17Fe59c439f7Bac8ff52DedAA2E367D16",
}
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        "http://localhost:7545"
    )
);

async function main() {

    // create factory and router instances
    const FactoryInstance = new web3.eth.Contract(factory.abi, addresses.Factory);
    
    console.log(
        "the INIT_CODE_PAIR_HASH is",
        await FactoryInstance.methods.INIT_CODE_PAIR_HASH().call()
    )

    const RouterInstance = new web3.eth.Contract(router.abi, addresses.Router);

    // // set pair
    addresses.Pair1 = await FactoryInstance.methods.getPair(addresses.Token1, addresses.Token2).call();
    // console.log("Pair1:", addresses.Pair1);

    // All pair check
    const n = await FactoryInstance.methods.allPairsLength().call();
    console.log(`Factory now have ${n} pair(s).`);
    for (var i=0 ; i<n ; i++) {
        console.log("  >", await FactoryInstance.methods.allPairs(i).call());
    }
    console.log();

    // // tokens
    const WETH = new web3.eth.Contract(weth.abi,addresses.WETH);
    const Token1 = new web3.eth.Contract(token1.abi, addresses.Token1);
    const Token2 = new web3.eth.Contract(token2.abi, addresses.Token2);

    // add allowance for router (approve router) -- ERC20
    // await Token1.methods.approve(addresses.Router, 10000000).send({ from: addresses.owner });
    // await Token2.methods.approve(addresses.Router, 10000000).send({ from: addresses.owner });
    // await WETH.methods.approve(addresses.Router, 1000000000).send({ from: addresses.owner }).then(res => console.log(res));

    
    // console.log(await Token1.methods.allowance(addresses.owner, addresses.Router).call())
    // console.log(await Token2.methods.allowance(addresses.owner, addresses.Router).call())



    // check owner's balances
    console.log(await Token1.methods.balanceOf(addresses.owner).call());
    console.log(await Token2.methods.balanceOf(addresses.owner).call());
    console.log(await Token2.methods.balanceOf(addresses.owner).encodeABI());
    // console.log(await WETH.methods.balanceOf(addresses.owner).call());
    // console.log(await WETH.methods.balanceOf(addresses.WETH).call());



    // USE FOR WHAT??????
    


    // check router
    // console.log(await RouterInstance.methods.factory().call());
    // console.log(await RouterInstance.methods.WETH().call());


    // await RouterInstance.methods
    //     .addLiquidity(
    //         addresses.Token1,
    //         addresses.Token2,
    //         10000000,
    //         10000000,
    //         10000000,
    //         10000000,
    //         addresses.owner,
    //         Math.floor(Date.now() / 1000) + 60 * 10
    //     )
    //     .send({
    //         from: addresses.owner,
    //         gas: 3000000
    //     })
    //     .then(res => console.log(res)); 


    
    
    
    const PairInstance = new web3.eth.Contract(pair.abi, addresses.Pair1);
    // PairInstance.methods.approve(addresses.Router, 1000000000).send({ from: addresses.owner });
    // console.log(await PairInstance.methods.allowance(addresses.owner, addresses.Router).call());

    // check the liquidity (should be done after addLiquidity)
    console.log("owner's pool balance:",await PairInstance.methods.balanceOf(addresses.owner).call());
    const {_reserve0, _reserve1, _blockTimestampLast} = await PairInstance.methods.getReserves().call();
    console.log(_reserve0, _reserve1, _blockTimestampLast);

    

    // console.log(await PairInstance.methods.token0().call());
    // console.log(await PairInstance.methods.token1().call());
    // console.log(await RouterInstance.methods.swapExactTokensForTokens(10000,9000,[addresses.Token1, addresses.Token2], addresses.owner, Math.floor(Date.now() / 1000) + 60 * 10).send({
    //     from: addresses.owner,
    //     gas: 3000000
    // }))


    // remove liquidity test

    // console.log(
    //     await RouterInstance.methods.removeLiquidity(
    //         addresses.Token1, 
    //         addresses.Token2,
    //         9998000,
    //         100100,
    //         100100,
    //         addresses.owner,
    //         Math.floor(Date.now() / 1000) + 60 * 10
    //     )
    //     .send({
    //         from: addresses.owner,
    //         gas: 3000000
    //     })
    // )

}


main();
