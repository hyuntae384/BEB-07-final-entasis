import axios from "axios";
import React, { useState, useEffect} from "react";
import dataToArray from "../../functions/data_to_array";
import Chart from "./Chart";

const ChartWrapper =({currentPrice,tokenName,setTokenName,ST_Name,setTotalChartData,dataLength,setDataLength,defaultLimit,isLoading,setTermValue,term,termValue,chartTermArr,stName,setStName,
})=>{

return(
    <div className="chart_wrapper"
        onWheel={() => {
            window.onwheel = function (e) {
                let set = dataLength*0.02
                if(document.body.style.overflow === 'hidden'){
                e.deltaY> 0
                ? setDataLength(dataLength < 1 ? dataLength + 0 : dataLength - set)
                : setDataLength(dataLength > defaultLimit-50 ? dataLength + 0  : dataLength + set)
            }
            };
        }} 
        >
        {isLoading?<img className="loading" src={require('../../assets/images/Infinity.gif')} alt='loading'/>:
        <Chart
        stName={stName}
        setStName={setStName}
        tokenName = {tokenName} 
        setTokenName = {setTokenName} 
        ST_Name={ST_Name}
        termValue={termValue}
        term={term}
        setTermValue={setTermValue}
        chartTermArr = {chartTermArr}
        currentPrice={currentPrice}
        dataLength={dataLength}
        defaultLimit={defaultLimit}
        isLoading={isLoading}
        />
        }
    </div>
    )
}
export default ChartWrapper