import { useEffect, useState, useRef } from "react"

const Server =(dataType,dataLength, limit, offset)=>{
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
    let ST_CurrentPrice = candleHis[candleHis.length-1] * (1 + candleStv)*(1+candleIncomeRatio)
    let ST_CurrentVolume = volumeHis[0] * (1 + volumeStv)*(1+volumeIncomeRatio)
    console.log(ST_CurrentPrice)

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
            volumeHis[1].forEach(element => {totalHisTo+=element});        
            volumeHis[1].push(e)
            if(volumeHis[0].length >= 120 ){
                volumeFormatHis.push(volumeData);
                totalHisTo=0
                volumeHis[1].splice(0,volumeHis[1].length-1);
            }}
    if(dataType==='candle_array'){
        CP_his(ST_CurrentPrice)
        return candleFormatHis
    };
    if(dataType==='candle_CP') return ST_CurrentPrice;
    if(dataType==='candle_data') return candleData;
    if(dataType==='volume_array'){
        CV_his(ST_CurrentVolume)
        return volumeFormatHis
        }
    if(dataType==='volume_CV') return ST_CurrentVolume
    if(dataType==='volume_data') return volumeData;
}
export default Server

