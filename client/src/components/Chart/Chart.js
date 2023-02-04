import React, { useState, useEffect } from "react";
import dataToArray from "../../functions/data_to_array";
import SelectBox from "../Select";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const Chart =({currentPrice, chartArr,defaultLimit,dataLength,term,setTerm})=>{
    const [name, setName] = useState("BEBE");

    let date = dataToArray(chartArr,1)
    let open = dataToArray(chartArr,2)
    let close = dataToArray(chartArr,3)
    let high = dataToArray(chartArr,4)
    let low = dataToArray(chartArr,5)
    let volTo = dataToArray(chartArr,6)
    let volFrom = dataToArray(chartArr,7)

    // const onClickListener = () => {
    //     setName("CECE");
    // };
    // const loadDataHandler = () => {
    //     // setdefaultLimit(defaultLimit + 500);
    // };
    
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
            width: window.innerWidth*0.65,
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



    return(
    <div className="chart" 
        onMouseEnter ={onMouseEnterHandler}
        onMouseLeave = {onMouseLeaveHandler}
        >
        <div className="chart_select">
        <SelectBox
            set={term}
            value={setTerm}
        ></SelectBox>
        <SelectBox 
            set = {term}
            value={setTerm}
        ></SelectBox>

        {/* <h6 className="chart_cp">{name} {ST_CurrentPrice.toLocaleString()}</h6> */}
        </div>        <Candle
            term={term}
            setTerm={setTerm}
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