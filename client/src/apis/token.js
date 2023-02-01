import axios from 'axios';

// Test URL
const origin = "http://localhost:5050";
const getUserURL = origin + "/token/"; 

const buy = getUserURL + "buy/"
const sell = getUserURL + "sell/"

// Test API Request
export const BuyToken = async(name,price,amount,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultBuyToken= await axios.post(buy, {"name":name,"price":price,"amount":amount,"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return  resultBuyToken
}
export const SellToken = async(name,price,amount,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultSellToken =  axios.post(sell, {"name":name,"price":price,"amount":amount,"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return  resultSellToken
}
