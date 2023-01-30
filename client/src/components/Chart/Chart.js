import React, { useState, useEffect } from "react";
import SelectBox from "../Select";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const Chart =({ 
    candleFormatHis,
    ST_CurrentPrice,
    candleData,
    volumeFormatHis,
    volumeData,
    })=>{
    const [name, setName] = useState("BEBE");
    const [dataLength, setDataLength] = useState(2);
    const dataDefaultMinusLength = 18;

    const onClickListener = () => {
        setName("CECE");
    };
    const loadDataHandler = () => {
        // setdefaultLimit(defaultLimit + 500);
    };
    
    const onMouseEnterHandler = () => {
        document.body.style.overflow = 'hidden';
    }
    const defaultLimit  = volumeFormatHis.length;

    const dataWheelHandler = () => {

        window.onwheel = function (e) {
        e.deltaY > 0
            ? setDataLength(dataLength < 5 ? dataLength + 0 : dataLength - volumeFormatHis.length*0.05)
            : setDataLength(dataLength > defaultLimit - 5 ? dataLength + 0 : dataLength + volumeFormatHis.length*0.05);
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
        <h6 className="chart_cp">{name} {ST_CurrentPrice.toLocaleString()}</h6></div>
        <Candle
            candleFormatHis={candleFormatHis}
            ST_CurrentPrice={ST_CurrentPrice} 
            candleData={candleData}
            width={size.width}
            height={size.height}
            defaultLimit={defaultLimit}
            dataLength={dataLength}
            name={name}
        />
        <Volume
            volumeFormatHis={volumeFormatHis}
            volumeData={volumeData}
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