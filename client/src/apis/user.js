import axios from 'axios';

// Test URL
const origin = "http://localhost:5050";
const getUserURL = origin + "/user/"; 

const faucet = origin + "faucet/"
const enroll = origin + "enroll/?wallet="
const chname = origin + "chname/?wallet="
const tutorial = origin + "tutorial/?wallet="
const score = origin + "score/?wallet="
const position = origin + "position/?wallet="
const account = origin + "account/?wallet="

// Test API Request
export const FaucetWallet = async(wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultFaucetWallet=  axios.put(faucet + {"wallet":wallet})
    .then(res=>res)
    .then(err=>err)
    return  resultFaucetWallet
}
export const EnrollWallet = async(wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultEnrollWallet =  axios.post(enroll + wallet)
    .then(res=>res)
    .then(err=>err)
    return  resultEnrollWallet
}
export const ChName = async(wallet, name) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultChName =  axios.put(chname + wallet + {"name":name})
    .then(res=>res)
    .then(err=>err)
    return  resultChName
}
export const Tutorial = async(wallet, cnt) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultTutorial =  axios.put(tutorial + wallet + "&cnt=" + cnt)
    .then(res=>res)
    .then(err=>err)
    return  resultTutorial
}
export const Score = async(wallet, cnt) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultScore =  axios.get(score + wallet)
    .then(res=>res)
    .then(err=>err)
    return  resultScore
}
export const Position = async(wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultPosition =  axios.get(position + wallet)
    .then(res=>res)
    .then(err=>err)
    return  resultPosition
}
export const Account = async(wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultAccount =  axios.get(account + wallet)
    .then(res=>res)
    .then(err=>err)
    return  resultAccount
}