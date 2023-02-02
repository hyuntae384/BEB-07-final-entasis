import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import dataToArray from "../../functions/data_to_array";
import SelectBox from "../Select";
import Chart from "./Chart";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const ChartWrapper =({currentPrice})=>{
    const [defaultLimit, setdefaultLimit] = useState(1000);
    const [dataLength, setDataLength] = useState(330);
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
        setdefaultLimit(chartOriginArr.length)
        setChartArr(chartOriginArr
            ?.slice(dataLength, defaultLimit))
            console.log(dataLength)
    },[chartOriginArr,dataLength,chartArr])


    return(
    <div className="chart_wrapper"
        onWheel={() => {
            window.onwheel = function (e) {
                // let set = chartArr.length*0.05
            e.deltaY > 0
                ? setDataLength(dataLength < 5 ? dataLength + 0 : dataLength - 8)
                : setDataLength(dataLength > defaultLimit-20 ? dataLength + 0  : dataLength + 8);
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