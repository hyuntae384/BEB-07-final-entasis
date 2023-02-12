import axios from 'axios';
import { useState } from 'react';

// Test API Request
export const BuyToken = async(token,price,amount,wallet,txin) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultBuyToken= await axios.post("http://52.78.173.200:5050/"+token+"/buy", {"price":price,"amount":amount,"wallet":wallet, "txin":txin})
    .then(res=>res)
    .then(err=>err)
    return resultBuyToken
}

export const SellToken = async(token,price,amount,wallet,txin) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultSellToken = await axios.post("http://52.78.173.200:5050/"+token+"/sell", {"price":price,"amount":amount,"wallet":wallet, "txin":txin})
    .then(res=>res)
    .then(err=>err)
    return resultSellToken
}

export const Staking = async(token,price,amount,wallet,txin) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultStaking = await axios.post("http://52.78.173.200:5050/"+token+"/staking", {"price":price,"amount":amount,"wallet":wallet, "txin":txin})
    .then(res=>res)
    .then(err=>err)
    return resultStaking
}

export const Reward= async(token,price,amount,wallet,txout) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultReward = await axios.post("http://52.78.173.200:5050/"+token+"/reward", {"price":price,"amount":amount,"wallet":wallet, "txout":txout})
    .then(res=>res)
    .then(err=>err)
    return resultReward
}
