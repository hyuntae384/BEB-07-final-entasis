import axios from 'axios';

// Test URL
const origin = "http://localhost:3000";
const getUserURL = origin + "/user/"; 

const faucet = origin + "faucet/"
const enroll = origin + "enroll/?address="
const score = origin + "score/?address="
const position = origin + "position/?address="
const mypage = origin + "mypage/?address="

// Test API Request
export const postWallet = async(wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultPostWallet =  axios.post(faucet + wallet)
    .then(res=>res)
    .then(err=>err)
    return  resultPostWallet
}