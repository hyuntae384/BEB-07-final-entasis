import {scaleLinear} from 'd3-scale'
import { useEffect, useState, useRef } from "react"
import dataToArray from '../../../functions/data_to_array'
import PublicDisclosure from '../../PublicDisclosure';

const Volume =({ width, height, defaultLimit, dataLength, name,})=>{
    const [stv, setStv] = useState(0);
    const [incomeRatio, setIncomeRatio] = useState(0);
    const [his, setHis] = useState([1,[]]);
    const [formatLengthHis, setFormatLengthHis] = useState([]);
    const [formatHis, setFormatHis] = useState([])

    const stv_ref = useRef(1);
    const incomeRatio_ref = useRef(0.05);
    useEffect(() => {
        const loop = setInterval(() => {
            stv_ref.current = Math.random()*(6);
            setStv(stv_ref.current);
        if (stv_ref.current === 10) clearInterval(loop);
        }, 50);
    }, []);
    useEffect(() => {
        const loop = setInterval(() => {
            incomeRatio_ref.current = Math.random()*(115);
            setIncomeRatio(incomeRatio_ref.current);
        if (incomeRatio_ref.current === 10) clearInterval(loop);
        }, 500);
    }, []);
    let ST_CurrentVolume = his[0] * (1 + stv)*(1+incomeRatio)
    let totalHisFrom = 0;
    let totalHisTo = 0;

    his[1].forEach(element => {totalHisTo+=element});
    let data = [
        0,
        his[0],
        totalHisTo,
        totalHisFrom
    ]
    let CV_his =(e)=>{
        his[1].push(e)
        if(his[1].length >= 120 ){
            formatHis.push(data);
            totalHisTo=0
            his[1].splice(0,his[1].length-1);
        }
        // return totalHisTo;
    }
    const date = dataToArray(formatHis,0)
    const open = dataToArray(formatHis,1)
    const his_to = dataToArray(formatHis,2)

    let SVG_VOLUME_WIDTH =  typeof width === "number" ? width * 1 : 0;
    let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 0.3 : 0;

    const xForPrice = 75;
    const xAxisLength = SVG_VOLUME_WIDTH - xForPrice;
    const yAxisLength = SVG_VOLUME_HEIGHT;
    const x0 = 0;
    const y0 = 0;
    let dataArray=[]
    for (let i = 0; i < date.length; i++) {
        dataArray.push([
            date[i],
            open[i],
            his_to[i],
            his_to[i-1]
        ]
        );
    }
    const dataYMax = dataArray.reduce(
        (max, [_, open, his_to, his_from]) => Math.max(his_to, totalHisTo, max),
        -Infinity
    );

    const dataYMin = 0
    const dataYRange = dataYMax;
    const numYTicks = 7;
    const barPlothWidth = xAxisLength / (dataArray.length+1.2);
    dataArray[dataArray.length] = data;
    return(
    <div className="volume">
        {CV_his(ST_CurrentVolume)}
        <svg width={SVG_VOLUME_WIDTH} height={SVG_VOLUME_HEIGHT}>
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
                    <text x={SVG_VOLUME_WIDTH - 60} y={y + 10} fontSize="10" stroke='#ffffff' >
                        {typeof yValue === 'number'?yValue.toLocaleString():0} 
                    </text>
                    </g>
                );
                })}
                {dataArray.map(
                (
                    [
                    date,
                    open,
                    his_to,
                    his_from,
                    ],
                    index
                ) => {
                    // 캔들 & 이동평균선
                    const x = x0 + index * barPlothWidth;
                    const sidePadding = xAxisLength * 0.0015;
                    {/* const max = Math.max(his_from, his_to);
                    const min = Math.min(his_from, his_to); */}
                    // ** 여기도 나중에 real data가 오면 필요 없음
                    // const bolGap =
                    //********
                    let yRatio = 0;
                    const yRatioGenerator = () => {
                        yRatio = (his_to - dataYMin) / dataYMax;
                        if (yRatio > 0) {
                        return yRatio;
                        } else return (yRatio = his_to / dataYRange / 2);
                    };

                    const y = y0 + (1 - yRatioGenerator()) * yAxisLength;
                    const fill = his_to < his_from ? "#E33F64" :"#00A4D8" ;
                    return (
                    <g key={index}>
                        <rect
                        {...{ fill }}
                        x={x}
                        y={y}
                        width={barPlothWidth - sidePadding}
                        height={height}
                        ></rect>
                        {/* <line
                        className="lineLight"
                        x1={xAxisLength}
                        x2={x0}
                        y1={yAxisLength - scaleY(ST_CurrentVolume)}
                        y2={yAxisLength - scaleY(ST_CurrentVolume)}
                        stroke={open > his_to ? "#E33F64" : "#4AFA9A"}
                        ></line>
                        <text x={SVG_VOLUME_WIDTH - 60} y={typeof scaleY(ST_CurrentVolume)==='number'?yAxisLength - scaleY(ST_CurrentVolume):0} fontSize="10" stroke=
                        {open > his_to ? "#E33F64" : "#4AFA9A"}
                        >
                        {typeof scaleY(ST_CurrentVolume)==='number'?ST_CurrentVolume.toLocaleString():0}
                        </text> */}
                        {/* {dataArray[dataArray.length]?
                        <div> */}


                        {/* </div>
                        :<></>} */}
                    </g>
                    );
                }
                )}
            <line></line>
            <text></text>
        </svg>
    </div>
    )
}
export default Volume