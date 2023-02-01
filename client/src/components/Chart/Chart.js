import axios from "axios";
import React, { useState, useEffect } from "react";
import dataToArray from "../../functions/data_to_array";
import SelectBox from "../Select";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const Chart =()=>{
    const [name, setName] = useState("BEBE");
    const [dataLength, setDataLength] = useState(2);
    const [isChartTotal, setIsChartTotal] = useState(true);

    const dataDefaultMinusLength = 18;

    const setChartTotal=(async () => 
    {try {
        const resultTotal = await axios.get('http://localhost:5050/chart/total')
        setIsChartTotal(resultTotal.data)
    } catch (e) {
    console.log(e) // caught
    }
})
const chartArr = [];
    typeof isChartTotal === 'object'?(isChartTotal.map(e=>chartArr.push(Object.values(e)))):console.log(typeof isChartTotal)

let date = dataToArray(chartArr,1)
let open = dataToArray(chartArr,2)
let close = dataToArray(chartArr,3)
let high = dataToArray(chartArr,4)
let low = dataToArray(chartArr,5)
let volTo = dataToArray(chartArr,6)
let volFrom = dataToArray(chartArr,7)
    const onClickListener = () => {
        setName("CECE");
    };
    const loadDataHandler = () => {
        // setdefaultLimit(defaultLimit + 500);
    };
    
    const onMouseEnterHandler = () => {
        document.body.style.overflow = 'hidden';
    }

    //페이지 진입 시 초기 차트 길이 세팅
    const defaultLimit  = 20;

    const dataWheelHandler = () => {

        window.onwheel = function (e) {
        e.deltaY > 0
            ? setDataLength(dataLength < 5.5 ? dataLength + 0 : dataLength - isChartTotal.length*0.05)
            : setDataLength(dataLength > defaultLimit - 5.5 ? dataLength + 0 : dataLength + isChartTotal.length*0.05);
    };
    };
    const onMouseLeaveHandler = () => {
        document.body.style.overflow = 'unset';
    }

    function useWindowSize(){
        const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
        });
        useEffect (() => {
            setChartTotal()
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
            width: window.innerWidth*0.64,
            height: 440,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
    
        return windowSize;
    }
    // console.log(document.body.querySelector(".chart").style)
    const size = useWindowSize();


    const OPTIONS = [
        { value: "BEBE", name: "BEBE" },
        { value: "DEDE", name: "DEDE" },
        { value: "CECE", name: "CECE" },
        ];


    return(
    <div className="chart" 
        onWheel={dataWheelHandler} 
        onMouseEnter ={onMouseEnterHandler}
        onMouseLeave = {onMouseLeaveHandler}
        >
        <div className="chart_select">
        <SelectBox options={OPTIONS}></SelectBox>
        {/* <h6 className="chart_cp">{name} {ST_CurrentPrice.toLocaleString()}</h6> */}
        </div>
        <Candle
            date = {date}
            open = {open}
            close = {close}
            high = {high}
            low = {low}
            width={size.width}
            height={size.height}
            defaultLimit={defaultLimit}
            dataLength={dataLength}
            name={name}
        />
        <Volume
            volTo={volTo}
            volFrom={volFrom}
            width={size.width} 
            height={size.height}
            defaultLimit={defaultLimit}
            dataLength={dataLength}
            name={name}
        />
    </div>
    )
}
export default Chart