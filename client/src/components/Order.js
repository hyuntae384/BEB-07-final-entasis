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
    const pubName = 'exchange';
    const web3 = new Web3(
        window.ethereum || "http://18.182.9.156:8545"
    );
    const StABI = TokenABI.abi
    const tokenContract = new web3.eth.Contract(StABI, '0x526d736D99c08A4c14Ff13a92Ad8FFa3649F7Cce');
    
    const userAccount = useWeb3React().account;
    function priceChange(e){
        let curprice = e.target.value;
        setPrice(curprice)
    }

    function amountChange(e){
        let curamount = e.target.value;
        setAmount(curamount)
    }
    // 구매
    async function SendETH(){
        const totalValue = amount * price * 1.0004;
        web3.eth.sendTransaction({
            from: userAccount,
            to: '0x48c02B8aFddD9563cEF6703df4DCE1DB78A6b2Eb',
            value: web3.utils.toWei(String(totalValue), 'ether')
        });
        BuyToken(pubName, String(price), String(amount), userAccount)
    }
    // 판매
    async function SendToken(){
        const data = await tokenContract.methods.transfer('0x48c02B8aFddD9563cEF6703df4DCE1DB78A6b2Eb', web3.utils.toWei(amount)).encodeABI()
        const tx = {
            from: userAccount,
            to: tokenContract._address,
            data: data,
            gas: 210000,
            gasPrice: 100000000
        }

        await web3.eth.sendTransaction(tx)
        SellToken(pubName, String(price), String(amount), userAccount)
    }
    // 판매 구매 조건실행 구현 필요
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
                <button type="button" className="order_buy" onClick={SendETH}>
                    <h5>Buy</h5>
                    <h5>Max Open {} ETH</h5>
                </button>
                <button type="button" className="order_sell" onClick={SendToken}>
                    <h5>Sell</h5>
                    <h5>Max Open {} ST</h5>
                </button>
            </div>
        </form>
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