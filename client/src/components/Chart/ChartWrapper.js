import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import dataToArray from "../../functions/data_to_array";
import SelectBox from "../Select";
import Chart from "./Chart";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const ChartWrapper =({currentPrice})=>{
    const [defaultLimit, setDefaultLimit] = useState(0);
    const [dataLength, setDataLength] = useState(0);
    const [isChartTotal, setIsChartTotal] = useState(true);
    const [chartToggle,setChartToggle] = useState(false)
    const [chartOriginArr,setChartOriginArr] = useState([]);
    const [chartArr, setChartArr]  = useState([]);



    useEffect(()=>{
        const setChartTotal=(async() => 
        {try {
            const resultTotal = await axios.get('http://localhost:5050/chart/total')
            setIsChartTotal(resultTotal.data)
        } catch (e) {
        console.log(e) 
        }
    })
        setChartTotal()
    },[])

    let limitChartArr=[];
    if(!chartToggle&&typeof isChartTotal === 'object'){
        (isChartTotal.map(e=>limitChartArr.push(Object.values(e))))
        setChartOriginArr(limitChartArr)
        setChartToggle(true)
    }
    useEffect(()=>{
        setDefaultLimit(chartOriginArr.length)
        setChartArr(chartOriginArr
            ?.slice(dataLength, defaultLimit))
            // console.log(chartArr)

    },[chartOriginArr,dataLength,defaultLimit])
    useEffect(() => {
        const loop = setInterval(() => {
            if(`${new Date().getSeconds()}`===`0`){
                let index = chartArr[chartArr.length-1]!==undefined?chartArr[chartArr.length-1][0]+1:undefined
                let createdAtB= currentPrice.createdAt;
                let openB= typeof chartArr[chartArr.length-1]==='object'&&!isNaN(chartArr[chartArr.length-1][3]) ?chartArr[chartArr.length-1][3]:currentPrice.open;
                let closeB= currentPrice.close;
                let highB= currentPrice.high;
                let lowB= currentPrice.low;
                let totalVolToB= currentPrice.totalVolTo;
                let totalVolFromB= currentPrice.totalVolFrom;
                chartArr.push([
                    index,
                    createdAtB,
                    openB,
                    closeB,
                    highB,
                    lowB,
                    totalVolToB,
                    totalVolFromB,
                ]);
            }  
        clearInterval(loop);
        }, 1000);
    }, [new Date().getSeconds(),chartArr]);
return(
    <div className="chart_wrapper"
        onWheel={() => {
            window.onwheel = function (e) {
                let set = defaultLimit*0.01
                e.deltaY > 0  
                ? setDataLength(dataLength < 1 ? dataLength + 0 : dataLength - set)
                : setDataLength(dataLength > defaultLimit*0.95 ? dataLength + 0  : dataLength + set)
            };
        }} 
        >
        <Chart
        chartArr = {chartArr}
        currentPrice={currentPrice}
        dataLength={dataLength}
        defaultLimit={defaultLimit}
        />
    </div>
    )
}
export default ChartWrapper