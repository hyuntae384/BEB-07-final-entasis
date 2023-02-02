import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import dataToArray from "../../functions/data_to_array";
import SelectBox from "../Select";
import Chart from "./Chart";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const ChartWrapper =({currentPrice})=>{
    const [isChartTotal, setIsChartTotal] = useState(true);
    const [chartToggle,setChartToggle] = useState(false)
    const [chartOriginArr,setChartOriginArr] = useState([]);



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



    return(
    <div className="chart_wrapper">
        <Chart
        chartOriginArr = {chartOriginArr}
        currentPrice={currentPrice}
        />
    </div>
    )
}
export default ChartWrapper