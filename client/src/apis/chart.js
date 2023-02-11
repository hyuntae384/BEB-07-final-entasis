
import axios from 'axios';

// URL
const origin = "52.78.173.200/";
const chart = origin + "chart/data"
const enroll = origin + "enroll/?address="
const score = origin + "score/?address="
const position = origin + "position/?address="
const mypage = origin + "mypage/?address="
const getUserURL = origin + "/user/"; 
// API Request
export const getChart = async({ offset, limit, unit, st_name}) => {
    if(st_name===null || st_name ===undefined)return new Error('Invalid Request!')
    const resultSTChart =  axios.get(chart + `/${offset} + ${limit} + ${unit} + ${st_name}`)
    .then(res=>res)
    .then(err=>err)
    return  resultSTChart
}
export const getRTD = async({st_name}) => {
    if(st_name===null || st_name ===undefined)return new Error('Invalid Request!')
    const resultSTChart =  axios.get(chart + `/${st_name}`)
    .then(res=>res)
    .then(err=>err)
    return  resultSTChart
}