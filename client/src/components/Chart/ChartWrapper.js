import axios from "axios";
import React, { useState, useEffect} from "react";
import dataToArray from "../../functions/data_to_array";
import Chart from "./Chart";

const ChartWrapper =({currentPrice})=>{
    const [defaultLimit, setDefaultLimit] = useState(0);
    const [dataLength, setDataLength] = useState(0);
    const [isChartTotal, setIsChartTotal] = useState([]);
    const [chartToggle,setChartToggle] = useState(false)
    const [chartOriginArr,setChartOriginArr] = useState([]);
    const [chartArr, setChartArr]  = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [termValue, setTerm] = useState(1)
    const ST_Name = [
        { value: "BEBE", name: "BEBE" },
        { value: "DEDE", name: "DEDE" },
        { value: "CECE", name: "CECE" },
        ];
    const term = [
        { value: "1", name: "1 minutes" },
        { value: "15", name: "15 minutes" },
        { value: "60", name: "1 hours" },
        { value: "240", name: "4 hours" },
        { value: "1440", name: "1 day" },
        { value: "10080", name: "1 week" },
        ]



    let limitChartArr=[];
    if(!chartToggle){
        const setChartTotal=(async() => 
        {try {
            const resultTotal = await axios.get('http://localhost:5050/chart/total')
            setIsLoading(true)
            setTimeout(()=>{
                (resultTotal.data.map(e=>limitChartArr.push(Object.values(e))))
                setIsChartTotal(limitChartArr)
                setIsLoading(false)
                setChartToggle(true)
                
            },1000)
        } catch (e) {
        console.log(e) 
        }
    })
    setChartTotal()
    }
    useEffect(()=>{
        setChartOriginArr(isChartTotal)
    })
    useEffect(()=>{

        setChartArr(chartOriginArr
        .slice(dataLength>chartOriginArr.length*0.3?dataLength:chartOriginArr.length*0.3, defaultLimit>chartOriginArr.length*0.3?defaultLimit:chartOriginArr.length*0.3))
        // console.log(dataLength,defaultLimit)
        setDefaultLimit(chartOriginArr.length)

    },[chartOriginArr,dataLength,defaultLimit])
    let setByTime = []
    let setByTimeNewArr = []

    useEffect(()=>{
        let cnt = 0
        let time = 15;
        let termNum = 0;
        // console.log(`${termNum}`,`${termValue}`)

        const arrSum = arr => arr.reduce((a,b) => a + b, 0)
        if(`${termNum}`!==`${termValue}`){
            for(let i = 0 ; i<chartOriginArr.length; i++){
                setByTime.push(chartOriginArr[i])
                // console.log(i%termValue)
                if(i%Number(termValue)=== 0){
                    cnt++
                    let setByTimeArr = [
                        cnt,
                        dataToArray(setByTime,1)[0],
                        Number(dataToArray(setByTime,2)[0]),
                        Number(dataToArray(setByTime,3)[setByTime.length-1]),
                        Number(Math.max(...dataToArray(setByTime,4))),
                        Number(Math.min(...dataToArray(setByTime,5))),
                        Number(arrSum(dataToArray(setByTime,6))),
                        Number(arrSum(dataToArray(setByTime,7))),
                    ]
                setByTimeNewArr.push(setByTimeArr)
                setByTime=[]
            }
            setChartArr(setByTimeNewArr)
            }
            termNum=termValue
            // console.log(termNum,termValue)
            // console.log(setByTimeNewArr)
        }    
    },[termValue])

    useEffect(() => {
        const loop = setInterval(() => {
            if(`${new Date().getSeconds()}`===`0`){
                let index = chartArr[chartArr.length-1]!==undefined?chartArr[chartArr.length-1][0]+1:undefined
                let createdAtB = currentPrice.createdAt;
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

    // let posX = 0;
    // let posY = 0;
    
    // let originalX = 0;
    // let originalY = 0;
    // const dragStartHandler = e => {
    //     // const img = new Image();
    //     // e.dataTransfer.setDragImage(img, 0, 0);
    //     posX = e.clientX;
    //     posY = e.clientY;
        
    //     originalX = e.target.offsetLeft;
    //     originalY = e.target.offsetTop;
    //     console.log(e.clientX);
    //     console.log(e.clientY);
        
    //     console.log(e.target.offsetLeft);
    //     console.log(e.target.offsetTop);
    //     };
    // const dragHandler = e => {
    //     e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    //     e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    //     posX = e.clientX;
    //     posY = e.clientY;
    //     e.target.style.left = `${originalX}px`;
    //     e.target.style.top = `${originalY}px`;
    //     };
    // const dragEndHandler = e => {
    //     e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    //     e.target.style.top = `${e.target.offsetLeft + e.clientY - posY}px`;
    //     };    

return(
    <div className="chart_wrapper"
        // onMouseDown={()=>{
        //     window.onmousedown = e =>
        //     console.log(e.clientX)

        // }}
        // onMouseUp={()=>{
        //     window.onmouseup = e =>
        //     console.log(e.clientX)

        // }}

        // onDrag={dragStartHandler}
        onWheel={() => {
            window.onwheel = function (e) {
                let set = chartOriginArr.length*0.01
                if(document.body.style.overflow === 'hidden'){
                e.deltaY> 0
                ? setDataLength(dataLength < chartOriginArr.length*0.3 ? dataLength + 0 : dataLength - set)
                : setDataLength(dataLength > defaultLimit*0.99 ? dataLength + 0  : dataLength + set)
            }
            };
        }} 
        >
        {isLoading?<img className="loading" src={require('../../assets/images/Infinity.gif')} alt='loading'/>:
        <Chart
        term={term}
        setTerm={setTerm}
        chartArr = {chartArr}
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