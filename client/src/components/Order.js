import { useWeb3React } from "@web3-react/core";
import React from "react"
import {useState, useEffect} from 'react';
import {FaucetWallet, EnrollWallet, ChName, Tutorial, Score, Position, Account} from '../apis/user'
const Order =()=>{
    const [priceAmount, setPriceAmount] = useState({price : "", amount : ""});
    const [isFaucet, setIsFaucet] = useState(false)
    const {chainId, account, active, activate, deactivate} = useWeb3React();
    const countNumber=(e)=>{
        return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    }

    async function priceChange(e){
        priceAmount.price = e.target.value;
        setPriceAmount(priceAmount)
    }

    async function amountChange(e){
        priceAmount.amount = e.target.value;
        setPriceAmount(priceAmount)
    }

    async function ableChange(e){
        
    }
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
            <input type="text" className="order_price" onChange={e => priceChange(e)} placeholder='Price'></input><h6 className="order_price_eth">ETH</h6>
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