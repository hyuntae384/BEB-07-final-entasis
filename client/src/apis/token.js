import axios from 'axios';
import { useState } from 'react';

// Test API Request
export const BuyToken = async(token,price,amount,wallet,txin) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultBuyToken= await axios.post("52.78.173.200/"+token+"/buy", {"price":price,"amount":amount,"wallet":wallet, "txin":txin})
    .then(res=>res)
    .then(err=>err)
    return resultBuyToken
}

export const SellToken = async(token,price,amount,wallet,txin) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultSellToken = await axios.post("52.78.173.200/"+token+"/sell", {"price":price,"amount":amount,"wallet":wallet, "txin":txin})
    .then(res=>res)
    .then(err=>err)
    return resultSellToken
}
