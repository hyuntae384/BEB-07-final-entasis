import {useWeb3React} from "@web3-react/core";
import React from "react"
import {useState, useEffect} from 'react';
import {FaucetWallet, EnrollWallet, ChName, Tutorial, Score, Position, Account} from '../apis/user';
import {BuyToken, SellToken} from '../apis/token';
import Web3 from "web3";
import TokenABI from "../ABIs/ERC1400.json"

const Order =()=>{
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [isFaucet, setIsFaucet] = useState(false)
    const {chainId, account, active, activate, deactivate} = useWeb3React();
    const countNumber=(e)=>{
        return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    }
    // 0xB681351a6F6018e8736e60aa46D1e18306d36A95
    const web3 = new Web3(
        window.ethereum || "http://18.182.9.156:8545"
    );
    const StABI = TokenABI.abi
    const tokenContract = new web3.eth.Contract(StABI, '0x9464E6A0B91720B9a7f18e8A96ABeB01b72a139C');
    
    //console.log(userAccount);
    // web3.eth.getAccounts().then(console.log);
    const userAccount = useWeb3React().account;
    function priceChange(e){
        let curprice = e.target.value;
        setPrice(curprice)
        //console.log(price)
    }

    function amountChange(e){
        let curamount = e.target.value;
        setAmount(curamount)
        console.log();
    }

    /* function SignTrans(){
        const signTx = web3.eth.signTransaction({
            from: userAccount,
            gasPrice: "20000000000",
            gas: "21000",
            to: '0x9c3B07e4d0E97d08dF6EB4320687f8C64D0dacCB',
            value: "10000000000000000"
        }).then(console.log)

        if (signTx.rawTransaction) {
            web3.eth.sendSignedTransaction(signTx.rawTransaction);
        }
    } */

    async function SendETH(){
        const pubName = 'exchange';
        console.log(pubName);
        console.log(userAccount)
        console.log(price);
        console.log(amount);
        const totalValue = amount * price * 1.0004;
        console.log(totalValue);
        web3.eth.sendTransaction({
            from: userAccount,
            to: '0x1289E91BB5Fd7F7769E367AAdEaD3Ee1a1829e69',
            value: web3.utils.toWei(String(totalValue), 'ether')
        });
        BuyToken(pubName, String(price), String(amount), userAccount)
    }

    /* async function SendETH(){
        console.log(userAccount)
         web3.eth.sendTransaction({
            from: userAccount,
            to: '0xD60e1416BE8657b8858443f2320D007672056eF5',
            value: '1000000000000000000'
        });
    } */
    const ST_1 = {
        name:'BEBE',price:'200',amount:'20'
    };
    const ST_2 = {
        name:'DEDE',price:'100',amount:'230'
    };
    const ST_3 = {
        name:'CECE',price:'400',amount:'10'
    };
    const faucetBtn=()=>{
        FaucetWallet(account)
    }
    return(
    <div className="order">
        <div className="order_mode">
            {/* <h3>Limit</h3> */}
            <h3>Market Order</h3>
        </div>
        <form>
            <h6 className="order_available">Available 10.120 ETH</h6>
            <div>
            <input type="text" className="order_price" onChange={e => priceChange(e)} placeholder='Price'></input>
            {/* <h6 className="order_price_eth">ETH</h6> */}
            </div>
            <input type="text" className="order_amount" onChange={e => amountChange(e)} placeholder='Amount'></input>
            <div className="make_order">
                <button className="order_buy" >
                    <h5>Buy</h5>
                    <h5>Max Open {} ETH</h5>
                </button>
                <button className="order_sell" >
                    <h5>Sell</h5>
                    <h5>Max Open {} ST</h5>
                </button>
            </div>
        </form>
        <button onClick={SendETH}><h5>HI</h5></button>
        <div className='assets'>
                            <h4>Assets</h4>
                            <div className='assets_wraper'>
                                <h6>{ST_1.name+" ("+ST_1.amount+")"+" "+countNumber(ST_1.price+"ETH")}</h6>
                                <h6>{ST_2.name+" ("+ST_2.amount+")"+" "+countNumber(ST_2.price+"ETH")}</h6>
                                <h6>{ST_3.name+" ("+ST_3.amount+")"+" "+countNumber(ST_3.price+"ETH")}</h6>
                            </div>
                        </div>
                        <div className='deposit'>
                            <h4>Deposit</h4>

                            <div className='deposit_wrapper'>
                                <div className='deposit_faucet'>
                                    <h6>{isFaucet?100:0}ETH</h6>
                                    <div className='btn' onClick={()=>faucetBtn()}><h6>Faucet</h6></div>
                                </div>
                                <div className='account_address'>
                                    <div className='account'><h6>{account}</h6></div>
                                    <div className='btn' onClick={()=>faucetBtn()}><h6>Copy</h6></div>
                                </div>
                            </div>
                        </div>
    </div>
    )
}
export default Order