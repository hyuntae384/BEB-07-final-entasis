import {useWeb3React} from "@web3-react/core";
import React from "react"
import {useState, useEffect} from 'react';
import {FaucetWallet, EnrollWallet, ChName, Tutorial, Score, Position, Account} from '../apis/user';
import {BuyToken, SellToken} from '../apis/token';
import Web3 from "web3";
import TokenABI from "../ABIs/ERC1400.json"
import SelectBox from "./Select";

const Order =({ST_CurrentPrice,userEth,userEntaToken,userBebToken,userLeoToken,tokenName,totalCurrentPrices,refresh,setRefresh,ST_Name,setTokenName,amount,price,web3,userAccount,serverAddress,token,tokenContract,setAmount,curPrice,isFaucet,faucetBtn,account,stName,setStName,

})=>{



    // 구매
    async function SendETH(){
        const totalValue = amount * price * 1.0004;
        web3.eth.sendTransaction({
            from: userAccount,
            to: serverAddress,
            value: web3.utils.toWei(String(totalValue), 'ether')
        }).then(function(receipt){
            console.log(receipt)
            console.log(token)
            BuyToken(token, String(price), String(amount), userAccount, receipt.transactionHash)
        });
        setRefresh(!refresh)
    }
    // 판매
    async function SendToken(){
        const data = await tokenContract.methods.transfer(serverAddress, web3.utils.toWei(amount)).encodeABI()
        const tx = {
            from: userAccount,
            to: tokenContract._address,
            data: data,
            gas: 210000,
            gasPrice: 100000000
        }

        await web3.eth.sendTransaction(tx).then(function(receipt){
            console.log(receipt)
            console.log(token)
            SellToken(token, String(price), String(amount), userAccount, receipt.transactionHash)
        })
        setRefresh(!refresh)
    }


    const ST_1 = {
        name:'ENTA',price:(totalCurrentPrices.enta * userEntaToken).toFixed(4) ,amount: userEntaToken
    };
    const ST_2 = {
        name:'BEB',price:(totalCurrentPrices.beb * userBebToken).toFixed(4) ,amount: userBebToken
    };
    const ST_3 = {
        name:'LEO',price:(totalCurrentPrices.leo * userLeoToken).toFixed(4) ,amount: userLeoToken
    };

    function amountChange(e){
        let curamount = e.target.value;
        
        let buyMaxST_1 = Math.floor(Number(userEth)/Number(totalCurrentPrices.enta))
        let sellMaxST_1 = ST_1.amount
        let buyMaxST_2 = Math.floor(userEth/totalCurrentPrices.beb)
        let sellMaxST_2 = ST_2.amount
        let buyMaxST_3 = Math.floor(userEth/totalCurrentPrices.leo)
        let sellMaxST_3 = ST_3.amount
        let amountMax = (buyMax,sellMax)=>{return Math.max(buyMax,sellMax)}
        if((token === 'enta')&&(amountMax(buyMaxST_1,sellMaxST_1)<curamount)){
            setAmount(amountMax(buyMaxST_1,sellMaxST_1))
            e.target.value=amountMax(buyMaxST_1,sellMaxST_1)
        }
        else if((token === 'beb')&&(amountMax(buyMaxST_2,sellMaxST_2)<curamount)){
            setAmount(amountMax(buyMaxST_2,sellMaxST_2))
            e.target.value=amountMax(buyMaxST_2,sellMaxST_2)
            console.log(e.target.value)
        }
        else if((token === 'leo')&&(amountMax(buyMaxST_3,sellMaxST_3)<curamount)){
            setAmount(amountMax(buyMaxST_3,sellMaxST_3))
            e.target.value=amountMax(buyMaxST_3,sellMaxST_3)
        } else setAmount(curamount)
    }


    return(
    <div className="order">
        <div className="order_mode">
            {/* <h3>Limit</h3> */}
            <h3>Market Order</h3>
            <div className="order_select">
                <SelectBox
                    set={ST_Name}
                    termValue={stName}
                    value={setStName}
                ></SelectBox>
            </div>
        </div>
        <form>
            <h6 className="order_available">Available Eth : {userEth}</h6>
            <div>
            <input type="text" className="order_price" /* onChange={e => priceChange(e)} */ placeholder={curPrice} readOnly></input>
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
            <div className="total_assets">
                <h4>Assets</h4><h6>{(ST_1.amount*ST_1.price+ST_2.amount*ST_2.price+ST_3.amount*ST_3.price).toFixed(4)}ETH</h6>
            </div>      
            <div className='assets_wraper'>
                <h6>{ST_1.name+" ("+ST_1.amount+")"+" "+ST_1.price+"ETH"}</h6>
                <h6>{ST_2.name+" ("+ST_2.amount+")"+" "+ST_2.price+"ETH"}</h6>
                <h6>{ST_3.name+" ("+ST_3.amount+")"+" "+ST_3.price+"ETH"}</h6>
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