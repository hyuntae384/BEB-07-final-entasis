import axios from 'axios';
import { useState } from 'react';

// Test URL
const State = async(token) => {
    const [userToken, setUserToken] = useState('enta')
    
}
const origin = "http://localhost:5050";
/* const getUserURL = origin + "/" + "/" 

const buy = getUserURL + "buy/"
const sell = getUserURL + "sell/" */

// Test API Request
export const BuyToken = async(token,price,amount,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultBuyToken= await axios.post(`${origin}/${token}/buy`, {"price":price,"amount":amount,"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return resultBuyToken
}
export const SellToken = async(token,price,amount,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultSellToken = await axios.post(origin, {"price":price,"amount":amount,"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return  resultSellToken
}
/* export const BuyBebToken = async(price,amount,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultBuyBebToken= await axios.post(buy, {"price":price,"amount":amount,"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return  resultBuyBebToken
}
export const SellBebToken = async(price,amount,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultSellBebToken = await axios.post(sell, {"price":price,"amount":amount,"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return  resultSellBebToken
}
export const BuyLeoToken = async(price,amount,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultBuyLeoToken= await axios.post(buy, {"price":price,"amount":amount,"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return  resultBuyLeoToken
}
export const SellLeoToken = async(price,amount,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultSellLeoToken = await axios.post(sell, {"price":price,"amount":amount,"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return  resultSellLeoToken
} */
