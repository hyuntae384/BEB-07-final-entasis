import React, { useState, useEffect } from "react";
import Candle from "./data/Candle"
import Volume from "./data/Volume"

const Chart =({ width, height })=>{
    const [name, setName] = useState("BEBE");
    const [defaultLimit, setdefaultLimit] = useState(1000);
    const [dataLength, setDataLength] = useState(900);
    const dataDefaultMinusLength = 18;

    const dataWheelHandler = () => {
        window.onwheel = function (e) {
        e.deltaY > 0
            ? setDataLength(dataLength < 18 ? dataLength + 0 : dataLength - 8)
            : setDataLength(
                dataLength > defaultLimit ? dataLength + 0 : dataLength + 8
            );
        };
    };
    const onClickListener = () => {
        setName("CECE");
    };
    const loadDataHandler = () => {
        setdefaultLimit(defaultLimit + 500);
    };
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
            width: window.innerWidth * 0.65,
            height: window.innerHeight * 0.5,
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
    
    const size = useWindowSize();

    return(
    <div className="chart">
    <div onWheel={dataWheelHandler}>
        <Candle
            width={size.width}
            height={size.height}
            defaultLimit={defaultLimit}
            dataLength={dataLength}
            name={name}
        />
        <Volume
            width={size.width} 
            height={size.height}
            defaultLimit={defaultLimit}
            dataLength={dataLength}
            name={name}
        />
    </div>
    </div>
    )
}
export default Chart