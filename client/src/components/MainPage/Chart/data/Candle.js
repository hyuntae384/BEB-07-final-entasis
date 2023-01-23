import {scaleLinear} from 'd3-scale'
import { getSTChart } from '../../../../apis/chart';
import Volume from './Volume';
import { useEffect, useState, useRef } from "react"
import PublicDisclosure from '../../PublicDisclosure';

const Candle =({ width, height, defaultLimit, dataLength, name,})=>{
    const [stv, setStv] = useState(0);
    const [incomeRatio, setIncomeRatio] = useState(0);
    const [his, setHis] = useState([1.2]);
    const [formatLengthHis, setFormatLengthHis] = useState([]);
    const [formatHis, setFormatHis] = useState([])
    const [format, setFormat] = useState()

    const stv_ref = useRef(1);
    const incomeRatio_ref = useRef(0.05);
    useEffect(() => {
        const loop = setInterval(() => {
            stv_ref.current = Math.random()*(0.0003-(-0.0003))-0.0003;
            setStv(stv_ref.current);
        if (stv_ref.current === 10) clearInterval(loop);
        }, 500);
    }, []);
    useEffect(() => {
        const loop = setInterval(() => {
            incomeRatio_ref.current = Math.random()*(0.0009-(-0.0009))-0.0009;
            setIncomeRatio(incomeRatio_ref.current);
        if (incomeRatio_ref.current === 10) clearInterval(loop);
        }, 5000);
    }, []);
    let ST_Corporation_Assets = 20000;
    let ST_CurrentPrice = his[his.length-1] * (1 + stv)*(1+incomeRatio)
    let Short_Term_Volatility = stv;
    let IncomeRatio = incomeRatio;
    
    let data = [
        new Date().getHours()+ ':'+new Date().getMinutes()+ ':'+ new Date().getSeconds(),
        his[0],
        his[his.length-1],
        his.reduce((acc,cur)=>{
                if(acc<cur) return cur 
                else if(acc>=cur) return acc
            }),
        his.reduce((acc,cur)=>{
            if(acc>cur) return cur 
            else if(acc<=cur) return acc
        })
    ]

    let CP_his =(e)=>{
        his.push(e)
        if(his.length >= 120 ){
            formatHis.push(data);
            his.splice(0,his.length-1);
        }
        return e
    }
    formatHis
    ?.slice(dataLength, formatHis.length)
    .forEach((item) => formatLengthHis.push(item));
    // const readingData = async () => {
    //     return !isLoading ? coinDataArray.push(data.Data.Data) : null;
    // };
    // readingData()
    const dataToArray = (formatHis,order) => {
        const resultArray =[]
        formatHis
            .map((item) => item[order])
            .forEach((item) => 
                resultArray.push(item));
            return resultArray;
        };
    const date = dataToArray(formatHis,0)
    const open = dataToArray(formatHis,1)
    const close = dataToArray(formatHis,2)
    const high = dataToArray(formatHis,3)
    const low =dataToArray(formatHis,4)

    let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
    let SVG_CHART_HEIGHT = typeof height === "number" ? height * 0.8 : 0;

    const xForPrice = 75;
    const xAxisLength = SVG_CHART_WIDTH - xForPrice;
    const yAxisLength = SVG_CHART_HEIGHT;
    const x0 = 0;
    const y0 = 0;
        const dataArray = [];

    for (let i = 0; i < date.length; i++) {
        dataArray.push([
            date[i],
            open[i],
            close[i],
            high[i],
            low[i],
        ]);
    }
    const dataYMax = dataArray.reduce(
        (max, [_, open, close, high, low]) => (Math.max(max, high, ST_CurrentPrice)+0.0005),
        -Infinity
    );
    const dataYMin = dataArray.reduce(
        (min, [_, open, close, high, low]) => (Math.min(min, low, ST_CurrentPrice)-0.0005),
        +Infinity
    );
    const dataYRange = dataYMax - dataYMin;
    const numYTicks = 7;
    const barPlothWidth = xAxisLength / (dataArray.length+1.2);
    const numXTicks = dataArray.length;

    const xValue= [];
    const generateDate = () => {
        for (let i = 0; i < 12; i++) {
          xValue.push(date[Math.round(date.length / 12) * i]);
        }
        return xValue;
        };
        generateDate();
        dataArray[dataArray.length] = data;
        // console.log(dataArray)
        
    return(
    <div className="candle">
        {/* ST_Corporation_Assets {ST_Corporation_Assets} ETH<br/>
        Short_Term_Volatility {Short_Term_Volatility}<br/>
        IncomeRatio {IncomeRatio}<br/>
        ST_Price  */}
        <h1>
        {CP_his(ST_CurrentPrice)}
        </h1><br/>

        <div>
            <svg width={SVG_CHART_WIDTH} height={SVG_CHART_HEIGHT+20}>
                <line
                x1={x0}
                y1={yAxisLength}
                x2={xAxisLength}
                y2={yAxisLength}
                stroke="gray"
                />
                <line
                x1={xAxisLength}
                y1={y0}
                x2={xAxisLength}
                y2={yAxisLength}
                stroke="gray"
                />
                <text
                x={x0 + 15}
                y={y0 + yAxisLength * 0.06}
                fontSize={
                    SVG_CHART_WIDTH > 700
                    ? SVG_CHART_WIDTH * 0.01
                    : SVG_CHART_WIDTH * 0.02
                }
                stroke='#ffffff'
                >
                {name}
                </text>
                {/* 세로선 작성 */}
                {Array.from({ length: numXTicks }).map((_, index) => {
                const x = x0 + index * (xAxisLength / numXTicks);
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={x}
                        x2={x}
                        y1={yAxisLength}
                        y2={y0}
                        stroke='#404040'
                    ></line>
                    <text
                        x={x}
                        y={SVG_CHART_HEIGHT+10}
                        textAnchor="right"
                        stroke='#ffffff'
                        fontSize={SVG_CHART_WIDTH < 800 ? 8 : 10}

                    >
                        {xValue[index]}
                    </text>
                    </g>
                );
                })}

                {/* 가로선 작성(css name => lineLight) */}
                {Array.from({ length: numYTicks }).map((_, index) => {
                const y = y0 + index * (yAxisLength / numYTicks);
                const yValue = (
                    dataYMax - index * (dataYRange / numYTicks)
                );
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={xAxisLength}
                        x2={x0}
                        y1={y}
                        y2={y}
                        stroke='#474747'
                    ></line>
                    <text x={SVG_CHART_WIDTH - 60} y={y + 10} fontSize="10" stroke='#ffffff' >
                        {typeof yValue === 'number'?yValue.toLocaleString():0} ETH
                    </text>
                    </g>
                );
                })}
                {/* 캔들 구현 */}
                {dataArray.map(
                (
                    [
                    date,
                    open,
                    close,
                    high,
                    low,
                    ],
                    index
                ) => {
                    // 캔들 & 이동평균선
                    const x = x0 + index * barPlothWidth;
                    const xX = x0 + (index + 1) * barPlothWidth;
                    const sidePadding = xAxisLength * 0.0015;
                    const max = Math.max(open, close);
                    const min = Math.min(open, close);
                    // ** 여기도 나중에 real data가 오면 필요 없음
                    // const bolGap =
                    //********
                    const scaleY = scaleLinear()
                    .domain([dataYMin, dataYMax])
                    .range([y0, yAxisLength]);
                    const fill = close > open ? "#4AFA9A" : "#E33F64";
                    return (
                    <g key={index}>
                        <line
                        x1={x + (barPlothWidth - sidePadding) / 2}
                        x2={x + (barPlothWidth - sidePadding) / 2}
                        y1={yAxisLength - scaleY(low)}
                        y2={yAxisLength - scaleY(high)}
                        stroke={open > close ? "#E33F64" : "#4AFA9A"}
                        />

                        <rect
                        {...{ fill }}
                        x={x}
                        width={barPlothWidth - sidePadding}
                        y={typeof scaleY(max)==='number'?yAxisLength - scaleY(max):0}
                        // 시가 종가 최대 최소값의 차
                        height={scaleY(max) - scaleY(min)}
                        ></rect>

                        <line
                        className="lineLight"
                        x1={xAxisLength}
                        x2={x0}
                        y1={yAxisLength - scaleY(ST_CurrentPrice)}
                        y2={yAxisLength - scaleY(ST_CurrentPrice)}
                        stroke={open > close ? "#E33F64" : "#4AFA9A"}
                        ></line>
                        <text x={SVG_CHART_WIDTH - 60} y={typeof scaleY(ST_CurrentPrice)==='number'?yAxisLength - scaleY(ST_CurrentPrice):0} fontSize="10" stroke=
                        {open > close ? "#E33F64" : "#4AFA9A"}
                        >
                        {typeof scaleY(ST_CurrentPrice)==='number'?ST_CurrentPrice.toLocaleString():0} ETH
                        </text>
                        {/* {dataArray[dataArray.length]?
                        <div> */}


                        {/* </div>
                        :<></>} */}
                    </g>
                    );
                }
                )}
            </svg>
        </div>

    </div>
    )
}
export default Candle