import {useWeb3React} from "@web3-react/core";
import React from "react"
import {useState, useEffect} from 'react';
import {FaucetWallet, EnrollWallet, ChName, Tutorial, Score, Position, Account} from '../apis/user';
import {BuyToken, SellToken} from '../apis/token';
import Web3 from "web3";
import TokenABI from "../ABIs/ERC1400.json"
import SelectBox from "./Select";
import { useTranslation } from "react-i18next";

const Order =({ST_CurrentPrice,userEth,userEntaToken,userBebToken,userLeoToken,tokenName,totalCurrentPrices,refresh,setRefresh,ST_Name,setTokenName,amount,price,web3,userAccount,serverAddress,token,tokenContract,setAmount,curPrice,isFaucet,faucetBtn,account,stName,setStName,myPage,setStaking

})=>{
    const { t } = useTranslation();

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

    function changeStaking() {
        setStaking(true)
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
    let buyMaxST_1 = Math.floor(Number(userEth)/Number(totalCurrentPrices.enta))
    let sellMaxST_1 = ST_1.amount
    let buyMaxST_2 = Math.floor(userEth/totalCurrentPrices.beb)
    let sellMaxST_2 = ST_2.amount
    let buyMaxST_3 = Math.floor(userEth/totalCurrentPrices.leo)
    let sellMaxST_3 = ST_3.amount
    let amountMax = (buyMax,sellMax)=>{return Math.max(buyMax,sellMax)}
    function amountChange(e){
        let curamount = e.target.value;
        
        if((stName === 'ENTAToken')&&(amountMax(buyMaxST_1,sellMaxST_1)<curamount)){
            setAmount(amountMax(buyMaxST_1,sellMaxST_1))
            e.target.value=amountMax(buyMaxST_1,sellMaxST_1)
        }
        else if((stName === 'BEBToken')&&(amountMax(buyMaxST_2,sellMaxST_2)<curamount)){
            setAmount(amountMax(buyMaxST_2,sellMaxST_2))
            e.target.value=amountMax(buyMaxST_2,sellMaxST_2)
            console.log(e.target.value)
        }
        else if((stName === 'LEOToken')&&(amountMax(buyMaxST_3,sellMaxST_3)<curamount)){
            setAmount(amountMax(buyMaxST_3,sellMaxST_3))
            e.target.value=amountMax(buyMaxST_3,sellMaxST_3)
        } else setAmount(curamount)
    }
    if(stName === 'ENTAToken') setTokenName('enta')
    if(stName === 'BEBToken') setTokenName('beb')
    if(stName === 'LEOToken') setTokenName('leo')
    // console.log(buyMaxST_1)


    return(
    <div className="order">
        <div className="order_mode">
            {/* <h3>Limit</h3> */}
            <h3>{t("Market Order")}</h3>
            <div className="order_select">
                <SelectBox
                    set={ST_Name}
                    termValue={stName}
                    value={setStName}
                ></SelectBox>
            </div>
        </div>
        <form>
            <h6 className="order_available">{t("Available Eth")} : {userEth}</h6>
            <input type="text" className="order_price" /* onChange={e => priceChange(e)} */ placeholder={curPrice} readOnly></input>
            {/* <h6 className="order_price_eth">ETH</h6> */}
            <input type="text" className="order_amount" onChange={e => amountChange(e)} placeholder={t("Amount")}></input>
            <div className="make_order">
                <button type="button" className="order_buy" onClick={SendETH}>
                    <h5>{t("Buy")}</h5>
                    <h5>{t("Max Open")} {stName === 'ENTAToken'? buyMaxST_1:
                        stName === 'BEBToken'?buyMaxST_2:
                        stName === 'LEOToken'?buyMaxST_3:0} ETH</h5>
                </button>


                <button type="button" className="order_sell" onClick={SendToken}>
                    <h5>{t("Sell")}</h5>
                    <h5>{t("Max Open")} {stName === 'ENTAToken'? sellMaxST_1:
                        stName === 'BEBToken'?sellMaxST_2:
                        stName === 'LEOToken'?sellMaxST_3:0} {stName.slice(0,stName.length-5)}</h5>
                </button>
            </div>
        </form>
        <div className='assets'>
            <div className="total_assets">
                <h4>{t("Assets")}</h4><h6>{(Number(ST_1.price)+Number(ST_2.price)+Number(ST_3.price)).toFixed(4)}ETH</h6>
            </div>      
            <div className='assets_wraper'>
                <h6>{ST_1.name+" ("+ST_1.amount+")"+" "+ST_1.price+"ETH"}</h6>
                <h6>{ST_2.name+" ("+ST_2.amount+")"+" "+ST_2.price+"ETH"}</h6>
                <h6>{ST_3.name+" ("+ST_3.amount+")"+" "+ST_3.price+"ETH"}</h6>
            </div>
        </div>
        <div className='deposit'>
            <h4>{t("Deposit")}</h4>
            <div className='deposit_wrapper'>
                <div className='deposit_faucet'>
                    <h5>{isFaucet?50:0}ETH</h5>
                    <div className='btn' onClick={()=>faucetBtn()}><h5>{t("Faucet")}</h5></div>
                </div>
                <div className='account_address'>
                    <div className='account'><h5>{account}</h5></div>
                    <div className='btn' onClick={()=>faucetBtn()}><h5>{t("Copy")}</h5></div>
                </div>

            </div>
            <h4>Stake</h4>
                <div className='deposit_wrapper'>
                    <button onClick={changeStaking}>Stake</button>
                </div>
        </div>
    </div>
    )
}
export default Order