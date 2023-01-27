import axios from 'axios';

// Test URL
const origin = "http://localhost:3000";
const getUserURL = origin + "/user/"; 

const faucet = origin + "faucet/"
const enroll = origin + "enroll/?wallet="
const chname = origin + "chname/?wallet="
const tutorial = origin + "score/?wallet="
const score = origin + "score/?wallet="
const position = origin + "position/?wallet="
const mypage = origin + "mypage/?wallet="

// Test API Request
export const postWallet = async(wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultPostWallet =  axios.post(faucet + wallet)
    .then(res=>res)
    .then(err=>err)
    return  resultPostWallet
}