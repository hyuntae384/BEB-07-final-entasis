import Chart from "../components/Chart/Chart"
import LimitOrderBook from '../components/LimitOrderBook'
import Order from '../components/Order'
import OrderList from "../components/OrderList"
import Position from "../components/Positions"
import Footer from "../components/Footer"
import Navigator from "../components/Navigator"
import Header from "../components/Header"
import { useEffect, useState, useRef } from "react"

const MainPage =()=>{
    const [candleStv, setCandleStv] = useState(0);
    const [candleIncomeRatio, setCandleIncomeRatio] = useState(0);
    const [volumeStv, setVolumeStv] = useState(0);
    const [volumeIncomeRatio, setVolumeIncomeRatio] = useState(0);
    const [candleHis, setCandleHis] = useState([1.2]);
    const [volumeHis, setVolumeHis] = useState([1,[]]);
    const [candleFormatHis, setCandleFormatHis] = useState([])
    const [volumeFormatHis, setVolumeFormatHis] = useState([])
    const [formatLengthHis, setFormatLengthHis] = useState([]);
    const candle_stv_ref = useRef(1);
    const candle_incomeRatio_ref = useRef(0.05);
    const volume_stv_ref = useRef(1);
    const volume_incomeRatio_ref = useRef(0.05);
    useEffect(() => {
        const loop = setInterval(() => {
            candle_stv_ref.current = Math.random()*(0.0003-(-0.0003))-0.0003;
            setCandleStv(candle_stv_ref.current);
            volume_stv_ref.current = Math.random()*(6);
            setVolumeStv(volume_stv_ref.current);
        if (candle_stv_ref.current === 10||
            volume_stv_ref.current === 10) clearInterval(loop);
        }, 50);
    }, []);
    useEffect(() => {
        const loop = setInterval(() => {
            candle_incomeRatio_ref.current = Math.random()*(0.0009-(-0.0009))-0.0009;
            setCandleIncomeRatio(candle_incomeRatio_ref.current);
            volume_incomeRatio_ref.current = Math.random()*(115);
            setVolumeIncomeRatio(volume_incomeRatio_ref.current);
        if (candle_incomeRatio_ref.current === 10||
            volume_incomeRatio_ref.current === 10) clearInterval(loop);
        }, 500);
    }, []);
    useEffect(()=>{},[volumeFormatHis])
    let ST_CurrentPrice = candleHis[candleHis.length-1] * (1 + candleStv)*(1+candleIncomeRatio)
    let ST_CurrentVolume = volumeHis[0] * (1 + volumeStv)*(1+volumeIncomeRatio)
    // console.log(ST_CurrentVolume)

    // candleFormatHis
    // ?.slice(dataLength, candleFormatHis.length)
    // .forEach((item) => formatLengthHis.push(item));
    // volumeFormatHis
    // ?.slice(dataLength, volumeFormatHis.length)
    // .forEach((item) => formatLengthHis.push(item));
        let candleData = [
        new Date().getHours()+ ':'+new Date().getMinutes()+ ':'+ new Date().getSeconds(),
        candleHis[0],
        candleHis[candleHis.length-1],
        candleHis.reduce((acc,cur)=>{
                if(acc<cur) return cur 
                else if(acc>=cur) return acc
            }),
        candleHis.reduce((acc,cur)=>{
            if(acc>cur) return cur 
            else if(acc<=cur) return acc
        })]
        let totalHisFrom = 0;
        let totalHisTo = 0;
        volumeHis[1].forEach(element => {totalHisTo+=element});        

        let volumeData = [
            0,
            volumeHis[0],
            totalHisTo,
            totalHisFrom
        ]    


        let CP_his =(e)=>{
            candleHis.push(e)
            if(candleHis.length >= 120 ){
                candleFormatHis.push(candleData);
                candleHis.splice(0,candleHis.length-1);
            }}
        let CV_his =(e)=>{
            volumeHis[1].push(e)

            if(volumeHis[1].length >= 120 ){
                volumeFormatHis.push(volumeData);
                totalHisTo=0
                volumeHis[1].splice(0,volumeHis[1].length-1);
            }}

        CP_his(ST_CurrentPrice)

        CV_his(ST_CurrentVolume)
    return(
    <div className="main_page">
        <Header/>
        <Navigator/>
        <div className="main_head">
            <Chart 
            candleFormatHis={candleFormatHis}
            ST_CurrentPrice={ST_CurrentPrice} 
            candleData={candleData}
            volumeFormatHis={volumeFormatHis}
            volumeData={volumeData}

            />
            <LimitOrderBook
                ST_CurrentPrice={ST_CurrentPrice} 
            />
            <Order/>
        </div>
        <Position/>
        <Footer/>
    </div>
    )
}
export default MainPage