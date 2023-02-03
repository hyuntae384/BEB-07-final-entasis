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
    const [isLoading, setIsLoading] = useState(false);

    let limitChartArr=[];
    if(!chartToggle&&typeof isChartTotal === 'object'){
        setIsLoading(true)
        setTimeout(()=>{
            (isChartTotal.map(e=>limitChartArr.push(Object.values(e))))
            setChartOriginArr(limitChartArr)
            setIsLoading(false)
        },1000)
        setChartToggle(true)
    }

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
        setChartArr(chartOriginArr
        .slice(dataLength, defaultLimit))
        setDefaultLimit(chartOriginArr.length)

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
                setChartOriginArr([...chartOriginArr,[
                    index,
                    createdAtB,
                    openB,
                    closeB,
                    highB,
                    lowB,
                    totalVolToB,
                    totalVolFromB,
                ]]);
            }  
        clearInterval(loop);
        }, 1000);
    }, [new Date().getSeconds(),chartArr,chartOriginArr]);

return(
    <div className="chart_wrapper"
        onWheel={() => {
            window.onwheel = function (e) {
                // let set = defaultLimit*0.05
                console.log(document.body.style.overflow)
                if(document.body.style.overflow === 'hidden'){
                e.deltaY> 0
                ? setDataLength(dataLength < 1 ? dataLength + 0 : dataLength - 8)
                : setDataLength(dataLength > defaultLimit*0.95 ? dataLength + 0  : dataLength + 8)
            }
            };
        }} 
        >
        {isLoading?<img className="loading" src={require('../../assets/images/Infinity.gif')} alt='loading'/>:
        <Chart
        chartArr = {chartArr}
        currentPrice={currentPrice}
        dataLength={dataLength}
        defaultLimit={defaultLimit}
        />
        }
    </div>
    )
}
export default ChartWrapper