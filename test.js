const Web3 = require("web3");
const factory = require("./factory");
const pair = require("./pair");
const weth = require("./WETH");
const token1 = require("./token1");
const token2 = require("./token2");
const router = require("./router");

const addresses = {
    Factory: "0x10A1019497F80FeFe19873291Ce5a8e12CcC4ac4",
    Token1: "0xcD58Be6bf16c736F533f96D99864aA5b74717a30",
    Token2: "0xae6493Ac52e0D5B1521089d6d6b6Ba662C551aB5",
    WETH: "0x4398508Bf124Dc1302e3165B7790A3F2483F1053",
    Router: "0xD667991701636D22Ff83bE547c3939e3200dC8B4",
    Lemon: "0x952C584bd1A3e11e0C7e179a389cC9153C5C9722",
    Pair1: "",
    owner: "0xB36d115b8ae65efC377bcE7a85770634D6C31f63",
}
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        "http://localhost:7545"
    )
);




const sendFromOwner = {
    from : addresses.owner, 
    gas: 3000000,
}
const sendFrom = (_address) => {
    return {
        from: _address,
        gas: 3000000
    }
    
}

const toWei = (_amount) => {
    return web3.utils.toWei(_amount, "ether");
}
const fromWei = (_amount) => {
    return web3.utils.fromWei(_amount, "ether");
}


async function init() {

    const Token1 = new web3.eth.Contract(token1.abi, addresses.Token1);
    const Token2 = new web3.eth.Contract(token2.abi, addresses.Token2);
    const Lemon = new web3.eth.Contract(token2.abi, addresses.Lemon);
    // mint 100 tokens for truffle's default accounts
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    

    const initTokens = "100";
    const initTokensToWei = web3.utils.toWei(initTokens, "ether");
    // console.log(initTokensToWei);
    // accounts.forEach(account => {
    //     console.log("Adding...", account);
    //     Token1.methods.faucet(initTokensToWei).send(sendFrom(account))
    //         .then(() => console.log(`minted ${initTokens} tokens for ${account}`))
    //         .catch(err => console.log(`Error on address ${account}:\n${err}`))
    // })
    // accounts.forEach(account => {
    //     console.log("Adding...", account);
    //     Token2.methods.faucet(initTokensToWei).send(sendFrom(account))
    //         .then(() => console.log(`minted ${initTokens} tokens for ${account}`))
    //         .catch(err => console.log(`Error on address ${account}:\n${err}`))
    // })
    accounts.forEach(account => {
        console.log("Adding...", account);
        Lemon.methods.faucet(initTokensToWei).send(sendFrom(account))
            .then(() => console.log(`minted ${initTokens} tokens for ${account}`))
            .catch(err => console.log(`Error on address ${account}:\n${err}`))
    })
    console.log(fromWei(await Lemon.methods.balanceOf(addresses.owner).call()));
    

}


async function main() {
    
    // Tokens
    const WETH = new web3.eth.Contract(weth.abi,addresses.WETH);
    const Token1 = new web3.eth.Contract(token1.abi, addresses.Token1);
    const Token2 = new web3.eth.Contract(token2.abi, addresses.Token2);

    // factory
    const FactoryInstance = new web3.eth.Contract(factory.abi, addresses.Factory);

    // router
    const RouterInstance = new web3.eth.Contract(router.abi, addresses.Router);

    // truffle's accounts
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);

    // accounts.forEach(async (account) => {
    //     console.log(web3.utils.fromWei(await Token1.methods.balanceOf(account).call(), "ether"));
    // })

    // give me a ETH
    // web3.eth.sendTransaction({
    //     from: accounts[9],
    //     to: "0x39b6A6fAe1e40839B8E278E10976bC3275c887Fd",
    //     value: toWei("80")
    // })
    
    console.log(
        "the INIT_CODE_PAIR_HASH is",
        await FactoryInstance.methods.INIT_CODE_PAIR_HASH().call()
    )

    

    // // set test pair[0]
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
    


    // add allowance for router (approve router) -- ERC20
    // await Token1.methods.approve(addresses.Router, toWei("1000")).send({ from: addresses.owner });
    // await Token2.methods.approve(addresses.Router, toWei("1000")).send({ from: addresses.owner });
    // await WETH.methods.approve(addresses.Router, 1000000000).send({ from: addresses.owner }).then(res => console.log(res));

    
    // console.log(await Token1.methods.allowance(addresses.owner, addresses.Router).call())
    // console.log(await Token2.methods.allowance(addresses.owner, addresses.Router).call())



    // check owner's balances
    // console.log(await Token1.methods.balanceOf(addresses.owner).call());
    // console.log(await Token2.methods.balanceOf(addresses.owner).call());
    // console.log(await Token2.methods.balanceOf(addresses.owner).encodeABI());
    // console.log(await WETH.methods.balanceOf(addresses.owner).call());
    // console.log(await WETH.methods.balanceOf(addresses.WETH).call());
    

    // ** check router
    // console.log(await RouterInstance.methods.factory().call());
    // console.log(await RouterInstance.methods.WETH().call());


    const amountToAdd = toWei("10");
    const amountToAdd2 = toWei("2");


    // await RouterInstance.methods
    //     .addLiquidity(
    //         addresses.Token1,
    //         addresses.Token2,
    //         amountToAdd,
    //         amountToAdd,
    //         amountToAdd,
    //         amountToAdd,
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
    console.log(fromWei(_reserve0), fromWei(_reserve1), _blockTimestampLast);

    

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
    // const swapPrediction = (await RouterInstance.methods.getAmountsOut(toWei("10"), [addresses.Token1, addresses.Token2]).call());
    // console.log(`${fromWei(swapPrediction[0])} TK1 => ${fromWei(swapPrediction[1])} TK2`);
    
    // RouterInstance.methods.swapExactTokensForTokens(
    //     toWei("10"),
    //     toWei("2"),
    //     [addresses.Token1, addresses.Token2],
    //     addresses.owner,
    //     Math.floor(Date.now() / 1000) + 60 * 10
    // ).send(sendFromOwner).then(() => console.log("swap done")).catch(err => console.log(err));

    console.log(fromWei(await Token1.methods.balanceOf(addresses.owner).call()));
    console.log(fromWei(await Token2.methods.balanceOf(addresses.owner).call()));


}   

init()
main();
