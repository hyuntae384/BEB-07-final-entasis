
import axios from 'axios';

// Test URL
const origin = "http://localhost:3000";
const getUserURL = origin + "/user/"; 

const ST_Chart = origin + "stchart/"
const enroll = origin + "enroll/?address="
const score = origin + "score/?address="
const position = origin + "position/?address="
const mypage = origin + "mypage/?address="

// Test API Request
export const getSTChart = async({st_name, limit, C_or_V}) => {
    if(st_name===null || st_name ===undefined)return new Error('Invalid Request!')
    const resultSTChart =  axios.get(ST_Chart + `/${st_name} + ${limit} + ${C_or_V}`)
    .then(res=>res)
    .then(err=>err)
    return  resultSTChart
}