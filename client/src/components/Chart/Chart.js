import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import dataToArray from "../../functions/data_to_array";
import SelectBox from "../Select";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const Chart =({currentPrice, chartOriginArr})=>{
    const [name, setName] = useState("BEBE");
    const [defaultLimit, setdefaultLimit] = useState(100);
    const [dataLength, setDataLength] = useState(10);
    const [isChartTotal, setIsChartTotal] = useState(true);
    const [chartToggle,setChartToggle] = useState(false)
    const [chartArr,setChartArr]=useState([]);
    const currentPrice_ref = useRef({});
    const chartDataLimit=[]

    useEffect(() => {
        const loop = setInterval(() => {
            if(`${new Date().getSeconds()}`===`0`){
                let index = chartArr[chartArr.length-1]!==undefined?chartArr[chartArr.length-1][0]:undefined
                let createdAtB= currentPrice.createdAt;
                let openB= currentPrice.open;
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
    }, [new Date().getSeconds()]);
    // console.log(chartOriginArr)

useEffect(()=>{
    chartOriginArr
    ?.slice(dataLength, 1000)
    .forEach((item) => chartArr.push(item)); 

},[chartOriginArr,dataLength,chartArr])
 
        //페이지 진입 시 초기 차트 길이 세팅

        //전체 데이터 1 회 받음
        //렌더링 되지 않음
        //


    const dataWheelHandler = () => {
        window.onwheel = function (e) {
            // let set = chartArr.length*0.05
        e.deltaY > 0
            ? setDataLength(dataLength < 5 ? dataLength + 0 : dataLength - 8)
            : setDataLength(dataLength > defaultLimit ? dataLength + 0  : dataLength + 8);
        };
    };

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



    const onMouseLeaveHandler = () => {
        document.body.style.overflow = 'unset';
    }

    function useWindowSize(){
        const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
        });
        useEffect (() => {
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
            currentPrice={currentPrice}
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
            currentPrice={currentPrice}
            open = {open}
            close = {close}
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