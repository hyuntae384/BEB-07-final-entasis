import Chart from "../components/Chart/Chart"
import LimitOrderBook from '../components/LimitOrderBook'
import Order from '../components/Order'
import OrderList from "../components/OrderList"
import Assets
from "../components/Assets"
import Footer from "../components/Footer"
import Navigator from "../components/Navigator"
import Header from "../components/Header"
import { useEffect, useState, useRef } from "react"
import Historys from "../components/Historys"
import Welcome from "./WelcomePage"
import { useWeb3React } from "@web3-react/core"
import axios from "axios"

// import {FaucetWallet} from '../apis/user'
const MainPage =()=>{
    const [isLoading, setIsLoading] = useState(true);
    const [isEnroll,setIsEnroll] =useState({});
    const [userPosition,setUserPosition] = useState();
    const [copy, setCopy] = useState('');
    const {chainId, account, active, activate, deactivate} = useWeb3React();
    const copyHandler = (e) => {
        copy = e;
    }


    // URL
    const origin = "http://localhost:5050/";
    const getUserURL = origin + "user/"; 
    const enroll = getUserURL + "enroll/?wallet="
    const position = getUserURL + "position/?wallet="
    const chart = origin + "chart/data"

    // API Request
    const getChart = async({ offset, limit, unit, st_name}) => {
        if(st_name===null || st_name ===undefined)return new Error('Invalid Request!')
        const resultSTChart =  axios.get(chart + `/${offset} + ${limit} + ${unit} + ${st_name}`)
        .then(res=>res)
        .then(err=>err)
        return  resultSTChart
    }
    // const getRTD = async({/*st_name*/}) => {
    //     // if(st_name===null || st_name ===undefined)return new Error('Invalid Request!')
    //     const resultRDT = await axios.get('http://localhost:5051/chart')
    //     .then(res=>res)
    //     .then(err=>err)
    //     console.log(resultRDT)  
    // }
    // getRTD()


    const setChartRTD=(async () => 
        {try {
            const resultRTD = await axios.get('http://localhost:5050/rtd')
            return resultRTD
        } catch (e) {
        console.log(e) // caught
        }
    })


    const Position = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultPosition = await axios.get(position + wallet)
        .then(res=>res.data)
        .then(err=>err)
        setUserPosition(resultPosition)
        return  resultPosition
    }
    const EnrollWallet = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultEnrollWallet =  await axios.post(enroll + wallet)
        .then(res=>res.data)
        .then(err=>err)
        return  setIsEnroll(resultEnrollWallet)
    }
    useEffect(()=>{
        Position(account)
        EnrollWallet(account)
    },[account]);

    setInterval(() => {
        setChartRTD()
    }, 1000);
        const onMouseEnterHandler = () => {
            document.body.style.overflow = 'unset';
        }

    return(
    <div className="main_page" onMouseEnter={onMouseEnterHandler}>
        {/* <Welcome
            account={account}
            tutorialCnt={isEnroll.cnt}
            isLoading={isLoading}
        /> */}
        <Header isLoading={isLoading} onMouseEnter={onMouseEnterHandler}/>
        <Navigator/>
        <div className="main_head">
            <Chart/>
            <LimitOrderBook
                powerOfMarket={0}
                ST_CurrentPrice={0} 
            />
            <Order/>
        </div>
        <div className="main_bottom">
            <Historys/>
            <Assets
                ST_CurrentPrice={0} 
            />
        </div>
        <Footer/>
    </div>
    )
}
export default MainPage