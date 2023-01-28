import axios from 'axios';

// Test URL
const origin = "http://localhost:5050";
const getCompanyURL = origin + "/company/"; 

const vote = getCompanyURL + "vote/"
const pdisclosure = getCompanyURL + "pdisclosure/?cdp="

// Test API Request
export const Vote = async(st_name,st_amount,ratio,wallet) => {
    if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
    const resultVote=  axios.post(vote + `{${st_name},${st_amount},${ratio},${wallet}}`)
    .then(res=>res)
    .then(err=>err)
    return  resultVote
}
export const CPD = async(name) => {
    if(name===null || name ===undefined)return new Error('Invalid Request!')
    const resultCPD =  axios.get(pdisclosure + name)
    .then(res=>res)
    .then(err=>err)
    return  resultCPD
}