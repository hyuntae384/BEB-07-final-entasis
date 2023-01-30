import axios from 'axios';

// Test URL
const origin = "http://localhost:5050/";
const getUserURL = origin + "user/"; 

const faucet = getUserURL + "faucet/?wallet="
const enroll = getUserURL + "enroll/?wallet="
const chname = getUserURL + "chname/?wallet="
const tutorial = getUserURL + "tutorial/?wallet="
const score = getUserURL + "score/?wallet="
const position = getUserURL + "position/?wallet="
const account = getUserURL + "mypage/?wallet="

// Test API Request
export const FaucetWallet = async(wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const faucetJSON = {'wallet':wallet}
    const resultFaucetWallet = await axios.put(faucet + wallet,faucetJSON)
    .then(res=>res.data.status)
    // .then(err=>err)
    .catch((error)=>{
        return error.response.data.message
    })
    return resultFaucetWallet
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
    const newName = {"name":name}
    const resultChName =  axios.put(chname + wallet, newName )
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
export const Score = async(wallet) => {
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